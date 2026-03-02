/**
 * Fetch secondary gallery NFT data from OpenSea and download images locally.
 * Usage: node scripts/fetch-secondary-gallery.mjs
 */
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ---- Load .env.local manually (no dotenv dependency needed) ----
const envPath = path.join(ROOT, '.env.local');
if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx === -1) continue;
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) process.env[key] = val;
    }
}

const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY;
if (!OPENSEA_API_KEY) {
    console.error('❌ Missing OPENSEA_API_KEY in .env.local');
    process.exit(1);
}

const BASE_URL = 'https://api.opensea.io/api/v2';
const OUTPUT_JSON = path.join(ROOT, 'src', 'data', 'nfts.json');
const OUTPUT_IMG_DIR = path.join(ROOT, 'public', 'images', 'nfts');

// ---- Import targets inline (avoid TS import issues) ----
const targetsPath = path.join(ROOT, 'src', 'config', 'targets.ts');
const targetsRaw = fs.readFileSync(targetsPath, 'utf-8');
// Quick-and-dirty parse: extract the array literal
const arrMatch = targetsRaw.match(/\[[\s\S]*\]/);
if (!arrMatch) { console.error('Could not parse targets.ts'); process.exit(1); }
// Strip comments, replace single quotes with double, handle trailing commas
const jsonStr = arrMatch[0]
    .replace(/\/\/.*$/gm, '')          // remove // comments
    .replace(/\/\*[\s\S]*?\*\//g, '')  // remove /* */ comments
    .replace(/'/g, '"')
    .replace(/,\s*\]/g, ']')
    .replace(/,\s*}/g, '}')
    .replace(/(\w+)\s*:/g, '"$1":');
const TARGETS = JSON.parse(jsonStr);

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ---- HTTP helpers ----
function httpGet(url, headers = {}) {
    return new Promise((resolve, reject) => {
        const mod = url.startsWith('https') ? https : http;
        const req = mod.get(url, { headers }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return httpGet(res.headers.location, headers).then(resolve).catch(reject);
            }
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}: ${data.slice(0, 200)}`));
                resolve(JSON.parse(data));
            });
        });
        req.on('error', reject);
        req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
    });
}

function downloadFile(url, destPath) {
    return new Promise((resolve, reject) => {
        if (url.startsWith('//')) url = 'https:' + url;
        if (url.startsWith('ipfs://')) url = url.replace('ipfs://', 'https://ipfs.io/ipfs/');
        const mod = url.startsWith('https') ? https : http;
        const req = mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) { req.destroy(); return reject(new Error(`HTTP ${res.statusCode}`)); }
            const ws = fs.createWriteStream(destPath);
            res.pipe(ws);
            ws.on('finish', () => { ws.close(); resolve(); });
            ws.on('error', reject);
        });
        req.on('error', reject);
        req.setTimeout(15000, () => { req.destroy(); reject(new Error('Timeout')); });
    });
}

// ---- OpenSea fetch functions ----
async function fetchCollectionNFTs(slug) {
    let allNFTs = [];
    let next = '';
    const MAX_PAGES = 5;
    let count = 0;
    console.log(`Fetching collection: ${slug}...`);
    try {
        do {
            const url = next
                ? `${BASE_URL}/collection/${slug}/nfts?limit=50&next=${next}`
                : `${BASE_URL}/collection/${slug}/nfts?limit=50`;
            const data = await httpGet(url, { 'x-api-key': OPENSEA_API_KEY, 'accept': 'application/json' });
            const nfts = (data.nfts || []).map(item => ({
                identifier: item.identifier, collection: slug, contract: item.contract,
                token_standard: item.token_standard, name: item.name, description: item.description,
                image_url: item.image_url, display_image_url: item.display_image_url,
                opensea_url: item.opensea_url, updated_at: item.updated_at, price: null
            }));
            allNFTs = [...allNFTs, ...nfts];
            next = data.next || '';
            count++;
            await sleep(250);
        } while (next && count < MAX_PAGES);
    } catch (e) { console.error(`  Error fetching ${slug}: ${e.message}`); }
    console.log(`  Found ${allNFTs.length} NFTs in ${slug}`);
    return allNFTs;
}

async function fetchSingleNFT(chain, contract, tokenId) {
    const url = `${BASE_URL}/chain/${chain}/contract/${contract}/nfts/${tokenId}`;
    try {
        const data = await httpGet(url, { 'x-api-key': OPENSEA_API_KEY, 'accept': 'application/json' });
        const nft = data.nft;
        if (nft) return [{
            identifier: nft.identifier, collection: nft.collection, contract: nft.contract,
            token_standard: nft.token_standard, name: nft.name, description: nft.description,
            image_url: nft.image_url, display_image_url: nft.display_image_url,
            opensea_url: nft.opensea_url, updated_at: nft.updated_at, price: null
        }];
    } catch (e) { console.error(`  Error fetching ${contract}/${tokenId}: ${e.message}`); }
    return [];
}

function getFilename(url, fallback) {
    try { let n = path.basename(new URL(url).pathname); return (n && n !== '/') ? n : fallback; }
    catch { return fallback; }
}

// ---- Main ----
async function main() {
    fs.mkdirSync(OUTPUT_IMG_DIR, { recursive: true });
    console.log('🚀 Fetching NFT metadata from OpenSea API...\n');

    let allNFTs = [];
    for (const target of TARGETS) {
        if (target.type === 'collection') {
            allNFTs = [...allNFTs, ...await fetchCollectionNFTs(target.slug)];
        } else if (target.type === 'item') {
            allNFTs = [...allNFTs, ...await fetchSingleNFT(target.chain, target.contract, target.tokenId)];
        }
        await sleep(200);
    }

    // Deduplicate
    const seen = new Set();
    const uniqueNFTs = allNFTs.filter(n => {
        const id = `${n.contract}-${n.identifier}`;
        if (seen.has(id)) return false;
        seen.add(id); return true;
    });

    console.log(`\n📦 Total unique NFTs: ${uniqueNFTs.length}`);

    // Group by collection
    const grouped = {};
    uniqueNFTs.forEach(nft => {
        const slug = nft.collection;
        if (!grouped[slug]) grouped[slug] = { name: slug, slug, nfts: [] };
        grouped[slug].nfts.push(nft);
    });

    // Download images
    let downloaded = 0;
    for (const slug in grouped) {
        console.log(`\n--- Downloading images for: ${slug} ---`);
        for (const nft of grouped[slug].nfts) {
            if (nft.image_url) {
                const filename = getFilename(nft.image_url, `${nft.contract}-${nft.identifier}.png`);
                const dest = path.join(OUTPUT_IMG_DIR, filename);
                if (!fs.existsSync(dest)) {
                    try { await downloadFile(nft.image_url, dest); console.log(`  ✓ ${filename}`); downloaded++; }
                    catch (e) { console.error(`  ✗ ${filename}: ${e.message}`); }
                }
                nft.image_url = `/images/nfts/${filename}`;
            }
            if (nft.display_image_url && nft.display_image_url !== nft.image_url) {
                const df = `display-${getFilename(nft.display_image_url, `${nft.contract}-${nft.identifier}-disp.png`)}`;
                const dest = path.join(OUTPUT_IMG_DIR, df);
                if (!fs.existsSync(dest)) {
                    try { await downloadFile(nft.display_image_url, dest); downloaded++; } catch { }
                }
                nft.display_image_url = `/images/nfts/${df}`;
            }
        }
    }

    // Save metadata
    fs.mkdirSync(path.dirname(OUTPUT_JSON), { recursive: true });
    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(grouped, null, 2));
    console.log(`\n🎉 Done! ${uniqueNFTs.length} NFTs processed, ${downloaded} new images downloaded.`);
    console.log(`   Metadata: ${OUTPUT_JSON}`);
    console.log(`   Images:   ${OUTPUT_IMG_DIR}`);
}

main().catch(console.error);
