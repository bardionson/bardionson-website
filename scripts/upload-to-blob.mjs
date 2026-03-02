/**
 * Upload all NFT images from public/images/nfts/ to Vercel Blob Storage.
 * Also uploads article images from public/images/articles/ and art images from public/images/art/.
 * Updates nfts.json with the new Blob CDN URLs.
 *
 * Usage: node scripts/upload-to-blob.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { put } from '@vercel/blob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ---- Load .env.local manually ----
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

const BLOB_TOKEN = process.env.BLOB_READ_WRITE_TOKEN;
if (!BLOB_TOKEN) {
    console.error('❌ Missing BLOB_READ_WRITE_TOKEN in .env.local');
    process.exit(1);
}

const NFTS_JSON = path.join(ROOT, 'src', 'data', 'nfts.json');
const URL_MAP_FILE = path.join(ROOT, 'src', 'data', 'blob-url-map.json');
const CONCURRENCY = 5;   // upload 5 files at a time
const RETRY_LIMIT = 3;

// ---- Helpers ----
async function uploadFile(localPath, blobPath) {
    const fileBuffer = fs.readFileSync(localPath);
    for (let attempt = 0; attempt < RETRY_LIMIT; attempt++) {
        try {
            const blob = await put(blobPath, fileBuffer, {
                access: 'public',
                token: BLOB_TOKEN,
                addRandomSuffix: false,  // keep deterministic paths
            });
            return blob.url;
        } catch (err) {
            if (attempt < RETRY_LIMIT - 1) {
                console.warn(`  ⚠ Retry ${attempt + 1} for ${blobPath}: ${err.message}`);
                await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
            } else {
                throw err;
            }
        }
    }
}

async function uploadBatch(tasks) {
    const results = [];
    for (let i = 0; i < tasks.length; i += CONCURRENCY) {
        const batch = tasks.slice(i, i + CONCURRENCY);
        const batchResults = await Promise.allSettled(
            batch.map(t => uploadFile(t.localPath, t.blobPath).then(url => ({ ...t, url })))
        );
        for (const r of batchResults) {
            if (r.status === 'fulfilled') {
                results.push(r.value);
                console.log(`  ✓ ${r.value.blobPath}`);
            } else {
                console.error(`  ✗ Failed: ${r.reason.message}`);
            }
        }
    }
    return results;
}

function getAllFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    let files = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files = [...files, ...getAllFiles(fullPath)];
        } else {
            files.push(fullPath);
        }
    }
    return files;
}

// ---- Main ----
async function main() {
    console.log('🚀 Uploading images to Vercel Blob Storage...\n');

    // Collect all image directories to upload
    const imageDirs = [
        { dir: path.join(ROOT, 'public', 'images', 'nfts'), prefix: 'images/nfts' },
        { dir: path.join(ROOT, 'public', 'images', 'art'), prefix: 'images/art' },
        { dir: path.join(ROOT, 'public', 'images', 'articles'), prefix: 'images/articles' },
    ];

    const urlMap = {};  // local relative path -> blob URL
    let totalUploaded = 0;

    // Load existing URL map if it exists (to skip already-uploaded files)
    if (fs.existsSync(URL_MAP_FILE)) {
        const existing = JSON.parse(fs.readFileSync(URL_MAP_FILE, 'utf-8'));
        Object.assign(urlMap, existing);
        console.log(`📋 Loaded ${Object.keys(urlMap).length} existing mappings (will skip these)\n`);
    }

    for (const { dir, prefix } of imageDirs) {
        if (!fs.existsSync(dir)) {
            console.log(`Skipping ${prefix} (directory not found)`);
            continue;
        }

        const files = getAllFiles(dir);
        console.log(`\n--- ${prefix}: ${files.length} files ---`);

        const tasks = [];
        for (const filePath of files) {
            const relativePath = '/' + prefix + '/' + path.relative(dir, filePath).replace(/\\/g, '/');
            const blobPath = prefix + '/' + path.relative(dir, filePath).replace(/\\/g, '/');

            // Skip if already uploaded
            if (urlMap[relativePath]) continue;

            tasks.push({ localPath: filePath, blobPath, relativePath });
        }

        if (tasks.length === 0) {
            console.log('  All files already uploaded, skipping.');
            continue;
        }

        console.log(`  Uploading ${tasks.length} new files...`);
        const results = await uploadBatch(tasks);

        for (const r of results) {
            urlMap[r.relativePath] = r.url;
            totalUploaded++;
        }

        // Save URL map after each directory (checkpoint)
        fs.mkdirSync(path.dirname(URL_MAP_FILE), { recursive: true });
        fs.writeFileSync(URL_MAP_FILE, JSON.stringify(urlMap, null, 2));
    }

    // ---- Update nfts.json with Blob URLs ----
    if (fs.existsSync(NFTS_JSON)) {
        console.log('\n📝 Updating nfts.json with Blob URLs...');
        const nftsData = JSON.parse(fs.readFileSync(NFTS_JSON, 'utf-8'));
        let replaced = 0;

        for (const slug in nftsData) {
            for (const nft of nftsData[slug].nfts) {
                if (nft.image_url && urlMap[nft.image_url]) {
                    nft.image_url = urlMap[nft.image_url];
                    replaced++;
                }
                if (nft.display_image_url && urlMap[nft.display_image_url]) {
                    nft.display_image_url = urlMap[nft.display_image_url];
                    replaced++;
                }
            }
        }

        fs.writeFileSync(NFTS_JSON, JSON.stringify(nftsData, null, 2));
        console.log(`  Updated ${replaced} URLs in nfts.json`);
    }

    console.log(`\n🎉 Done! Uploaded ${totalUploaded} files to Vercel Blob.`);
    console.log(`   URL map saved to: ${URL_MAP_FILE}`);
}

main().catch(console.error);
