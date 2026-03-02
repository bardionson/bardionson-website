import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import dotenv from 'dotenv';
// Load environment variables from .env.local
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

// Assuming this script is run via npx tsx
import { getBardIonsonArt } from '../src/lib/opensea';

const OUTPUT_JSON = path.join(process.cwd(), 'src', 'data', 'nfts.json');
const OUTPUT_IMG_DIR = path.join(process.cwd(), 'public', 'images', 'nfts');

if (!process.env.OPENSEA_API_KEY) {
    console.error("❌ Missing OPENSEA_API_KEY in .env.local");
    console.error("Please add it to .env.local (this file is ignored by git).");
    process.exit(1);
}

function downloadFile(url: string, destPath: string): Promise<void> {
    return new Promise((resolve, reject) => {
        // Some OpenSea URLs don't have a protocol
        if (url.startsWith('//')) url = 'https:' + url;
        if (url.startsWith('ipfs://')) {
            url = url.replace('ipfs://', 'https://ipfs.io/ipfs/');
        }

        const mod = url.startsWith('https') ? https : http;
        const req = mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                req.destroy();
                return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
            }
            const ws = fs.createWriteStream(destPath);
            res.pipe(ws);
            ws.on('finish', () => { ws.close(); resolve(); });
            ws.on('error', reject);
        }).on('error', reject);
        // Timeout handle
        req.setTimeout(15000, () => {
            req.destroy();
            reject(new Error(`Timeout downloading ${url}`));
        });
    });
}

function getFilename(url: string, fallback: string) {
    try {
        const parsed = new URL(url);
        let name = path.basename(parsed.pathname);
        if (!name || name === '/') return fallback;
        return name;
    } catch (e) {
        return fallback;
    }
}

async function main() {
    if (!fs.existsSync(OUTPUT_IMG_DIR)) {
        fs.mkdirSync(OUTPUT_IMG_DIR, { recursive: true });
    }

    console.log("🚀 Fetching NFT metadata from OpenSea API...");
    const gallery = await getBardIonsonArt();

    let totalNfts = 0;
    let totalImagesDownloaded = 0;

    for (const slug in gallery) {
        const collection = gallery[slug];
        console.log(`\n--- Processing collection: ${collection.name} ---`);
        for (const nft of collection.nfts) {
            totalNfts++;

            // 1. Download image_url
            if (nft.image_url) {
                const filename = getFilename(nft.image_url, `${nft.contract}-${nft.identifier}.png`);
                const destPath = path.join(OUTPUT_IMG_DIR, filename);
                if (!fs.existsSync(destPath)) {
                    try {
                        await downloadFile(nft.image_url, destPath);
                        console.log(`  ✓ Downloaded ${filename}`);
                        totalImagesDownloaded++;
                    } catch (e: any) {
                        console.error(`  ✗ Failed to download ${filename}: ${e.message}`);
                    }
                } else {
                    console.log(`  - Skip ${filename} (exists)`);
                }
                // Rewrite URL for local usage
                nft.image_url = `/images/nfts/${filename}`;
            }

            // 2. Download display_image_url if different
            if (nft.display_image_url && nft.display_image_url !== nft.image_url) {
                const displayFilename = `display-${getFilename(nft.display_image_url, `${nft.contract}-${nft.identifier}-disp.png`)}`;
                const destPath = path.join(OUTPUT_IMG_DIR, displayFilename);
                if (!fs.existsSync(destPath)) {
                    try {
                        await downloadFile(nft.display_image_url, destPath);
                        totalImagesDownloaded++;
                    } catch (e: any) {
                        // Fail silently for secondary display image
                    }
                }
                nft.display_image_url = `/images/nfts/${displayFilename}`;
            }
        }
    }

    // Ensure src/data directory exists
    const dataDir = path.dirname(OUTPUT_JSON);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }

    // Save the full transformed metadata
    fs.writeFileSync(OUTPUT_JSON, JSON.stringify(gallery, null, 2));
    console.log(`\n🎉 Done! Processed ${totalNfts} NFTs.`);
    console.log(`Saved ${totalImagesDownloaded} new images to public/images/nfts/`);
    console.log(`Saved metadata to src/data/nfts.json`);
}

main().catch(console.error);
