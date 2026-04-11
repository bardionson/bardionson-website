/**
 * Scrapes 11 legacy "Projects" from bardionson.com
 * Saves images to public/images/projects/ and markdown to src/content/projects/
 * Usage: node scripts/fetch-projects.mjs
 */
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import matter from 'gray-matter';
import { put } from '@vercel/blob';

const OUTPUT_DIR = path.join(process.cwd(), 'src', 'content', 'projects');
const IMAGE_DIR = path.join(process.cwd(), 'public', 'images', 'projects');
const BLOB_MAP_FILE = path.join(process.cwd(), 'src', 'data', 'blob-url-map.json');
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const PROJECT_URLS = [
    'https://bardionson.com/artist-portfolio/',
    'https://bardionson.com/sky-bones/',
    'https://bardionson.com/painting-with-fire/',
    'https://bardionson.com/we-are-anarchy-on-chains/',
    'https://bardionson.com/soul-scroll-tech/',
    'https://bardionson.com/scan/',
    'https://bardionson.com/home/',
    'https://bardionson.com/soundwords/',
    'https://bardionson.com/sage-anomaly/',
    'https://bardionson.com/8-2/',
    'https://bardionson.com/colormagic/',
    'https://bardionson.com/bards-freaky-faces/',
    'https://sky-bones.bardionson.com/marketplace'
];

let blobMap = {};
if (fs.existsSync(BLOB_MAP_FILE)) {
    blobMap = JSON.parse(fs.readFileSync(BLOB_MAP_FILE, 'utf-8'));
}

function fetchPage(url) {
    return new Promise((resolve, reject) => {
        const mod = url.startsWith('https') ? https : http;
        mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchPage(res.headers.location).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        if (!url.startsWith('http')) return reject(new Error("Invalid URL"));
        const mod = url.startsWith('https') ? https : http;
        const file = fs.createWriteStream(dest);
        mod.get(url, response => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', err => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
}

function cleanSlug(url) {
    let slug = url.replace(/\/$/, '').split('/').pop();
    if (slug === '8-2') slug = 'eight';
    if (slug === 'colormagic') slug = 'color-magic';
    if (slug === 'bards-freaky-faces') slug = 'freaky-faces';
    return slug;
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const turndownService = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
turndownService.remove(['script', 'style', 'noscript', 'iframe', '.sharedaddy', '.jp-relatedposts']);

async function main() {
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });

    let successCount = 0;

    for (const url of PROJECT_URLS) {
        if (!url.includes('bardionson.com')) continue;
        const slug = cleanSlug(url);
        const mdPath = path.join(OUTPUT_DIR, `${slug}.md`);

        console.log(`\n--- Fetching project: ${slug} ---`);
        try {
            const html = await fetchPage(url);
            const $ = cheerio.load(html);

            let title = $('h1.entry-title').first().text().trim();
            if (!title) title = $('title').text().split('-')[0].trim();

            let $content = $('.entry-content');
            if ($content.length === 0) $content = $('main');
            if ($content.length === 0) $content = $('body');

            // Find images, download locally, and upload to Blob
            const imagesFound = $content.find('img');
            for (let i = 0; i < imagesFound.length; i++) {
                const img = imagesFound[i];
                const $img = $(img);
                let src = $img.attr('src');
                if (!src) continue;

                src = src.split('?')[0]; // clean up query params
                const basename = path.basename(src).replace(/-\d+x\d+/, ''); // clean dimensions
                const localFileName = `${slug}-${basename}`;
                const localFilePath = path.join(IMAGE_DIR, localFileName);
                const blobKey = `/images/projects/${slug}/${basename}`;

                // Only download and upload if we don't already have it in tracking map
                let blobUrl = blobMap[blobKey];
                if (!blobUrl && process.env.BLOB_READ_WRITE_TOKEN) {
                    try {
                        console.log(`Downloading image: ${basename}...`);
                        await downloadImage(src, localFilePath);

                        console.log(`Uploading to Vercel Blob...`);
                        const fileBuffer = fs.readFileSync(localFilePath);
                        const blob = await put(blobKey, fileBuffer, {
                            access: 'public',
                            token: process.env.BLOB_READ_WRITE_TOKEN
                        });

                        blobUrl = blob.url;
                        blobMap[blobKey] = blobUrl;
                        fs.writeFileSync(BLOB_MAP_FILE, JSON.stringify(blobMap, null, 2));
                        console.log(`  ✓ Blob uploaded: ${blobUrl}`);
                    } catch (e) {
                        console.error(`  ✗ Image failed: ${e.message}`);
                    }
                }

                // Rewrite HTML to point to Vercel Blob
                if (blobUrl) {
                    $img.attr('src', blobUrl);
                    $img.attr('srcset', '');
                }
            }

            // Extract best image for frontmatter
            const articleBlobKeys = Object.keys(blobMap).filter(k => k.includes(`/images/projects/${slug}/`));
            const heroImage = articleBlobKeys.length > 0 ? blobMap[articleBlobKeys[0]] : null;

            const markdownContent = turndownService.turndown($content.html() || '');

            const fileContent = matter.stringify(markdownContent, {
                title: title,
                date: new Date().toISOString().split('T')[0], // Add a default date since we don't have WordPress metadata
                image: heroImage,
                originalUrl: url
            });

            fs.writeFileSync(mdPath, fileContent);
            console.log(`  ✓ Saved project ${slug}.md`);
            successCount++;
        } catch (err) {
            console.log(`  ✗ Failed parsing ${url}: ${err.message}`);
        }
        await sleep(500);
    }

    console.log(`\n=== Done! Extracted ${successCount} projects ===`);
}

main().catch(console.error);
