/**
 * Scrape and download all images from blog post pages on bardionson.com
 * Usage: node scrape-article-images.mjs
 */
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const ARTICLES_JSON = path.join('c:', 'projects', 'bardionson-website', 'src', 'data', 'articles.json');
const OUTPUT_DIR = path.join('c:', 'projects', 'bardionson-website', 'public', 'images', 'articles');

// Read articles
const articles = JSON.parse(fs.readFileSync(ARTICLES_JSON, 'utf-8'));

function slugFromUrl(url) {
    const parts = url.replace(/\/$/, '').split('/');
    return parts[parts.length - 1] || 'unknown';
}

function fetchPage(url) {
    return new Promise((resolve, reject) => {
        const mod = url.startsWith('https') ? https : http;
        mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchPage(res.headers.location).then(resolve).catch(reject);
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function extractImageUrls(html) {
    const urls = new Set();
    // Match img src attributes
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let match;
    while ((match = imgRegex.exec(html)) !== null) {
        let src = match[1];
        // Skip tiny icons, logos, tracking pixels, gravatar, etc.
        if (src.includes('gravatar') || src.includes('s.w.org') || src.includes('wp-includes')
            || src.includes('favicon') || src.includes('pixel') || src.includes('data:image')
            || src.includes('themeisle') || src.includes('wordpress.org')
            || src.endsWith('.svg')) continue;
        // Resolve relative URLs
        if (src.startsWith('//')) src = 'https:' + src;
        else if (src.startsWith('/')) src = 'https://bardionson.com' + src;
        urls.add(src);
    }

    // Also match srcset for higher-res versions
    const srcsetRegex = /srcset=["']([^"']+)["']/gi;
    while ((match = srcsetRegex.exec(html)) !== null) {
        const entries = match[1].split(',');
        for (const entry of entries) {
            let imgUrl = entry.trim().split(/\s+/)[0];
            if (imgUrl.includes('gravatar') || imgUrl.includes('s.w.org') || imgUrl.includes('wp-includes')
                || imgUrl.endsWith('.svg')) continue;
            if (imgUrl.startsWith('//')) imgUrl = 'https:' + imgUrl;
            else if (imgUrl.startsWith('/')) imgUrl = 'https://bardionson.com' + imgUrl;
            urls.add(imgUrl);
        }
    }

    return [...urls];
}

function downloadFile(url, destPath) {
    return new Promise((resolve, reject) => {
        const mod = url.startsWith('https') ? https : http;
        mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) {
                return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
            }
            const ws = fs.createWriteStream(destPath);
            res.pipe(ws);
            ws.on('finish', () => { ws.close(); resolve(); });
            ws.on('error', reject);
        }).on('error', reject);
    });
}

function getFilename(url) {
    const parsed = new URL(url);
    let name = path.basename(parsed.pathname);
    // Clean query params from name
    name = name.split('?')[0];
    if (!name || name === '/') name = 'image.jpg';
    return name;
}

// Pick the highest-res version from a set of URLs with the same base name
function dedupeByHighestRes(urls) {
    const map = new Map();
    for (const url of urls) {
        // Strip resolution suffixes like -1024x1024, -600x338 etc to find base
        const filename = getFilename(url);
        const base = filename.replace(/-\d+x\d+/, '');
        const existing = map.get(base);
        if (!existing) {
            map.set(base, url);
        } else {
            // Prefer larger dimensions
            const existingMatch = getFilename(existing).match(/(\d+)x(\d+)/);
            const newMatch = filename.match(/(\d+)x(\d+)/);
            if (newMatch && existingMatch) {
                const existingArea = parseInt(existingMatch[1]) * parseInt(existingMatch[2]);
                const newArea = parseInt(newMatch[1]) * parseInt(newMatch[2]);
                if (newArea > existingArea) map.set(base, url);
            } else if (newMatch && !existingMatch) {
                // New has dimensions, old doesn't — prefer the one with higher res indicator
            }
        }
    }
    return [...map.values()];
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function main() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    let totalImages = 0;
    let totalArticles = 0;

    for (const article of articles) {
        const slug = slugFromUrl(article.url);
        const articleDir = path.join(OUTPUT_DIR, slug);

        // Skip if already downloaded
        if (fs.existsSync(articleDir) && fs.readdirSync(articleDir).length > 0) {
            console.log(`SKIP ${slug} (already has images)`);
            continue;
        }

        console.log(`\n--- Fetching: ${slug} ---`);
        try {
            const html = await fetchPage(article.url);
            const allUrls = extractImageUrls(html);
            const urls = dedupeByHighestRes(allUrls);

            if (urls.length === 0) {
                console.log(`  No images found.`);
                continue;
            }

            if (!fs.existsSync(articleDir)) {
                fs.mkdirSync(articleDir, { recursive: true });
            }

            console.log(`  Found ${urls.length} images (from ${allUrls.length} total incl. srcset)`);
            for (const url of urls) {
                const filename = getFilename(url);
                const dest = path.join(articleDir, filename);
                try {
                    await downloadFile(url, dest);
                    const size = fs.statSync(dest).size;
                    console.log(`  ✓ ${filename} (${(size / 1024).toFixed(0)}KB)`);
                    totalImages++;
                } catch (err) {
                    console.log(`  ✗ ${filename}: ${err.message}`);
                }
            }
            totalArticles++;
        } catch (err) {
            console.log(`  ERROR: ${err.message}`);
        }

        // Rate limit
        await sleep(300);
    }

    console.log(`\n=== Done! Downloaded ${totalImages} images from ${totalArticles} articles ===`);
}

main().catch(console.error);
