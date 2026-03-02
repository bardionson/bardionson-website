/**
 * Scrapes full article content from bardionson.com and saves as Markdown.
 * Usage: node scripts/fetch-article-content.mjs
 */
import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import matter from 'gray-matter';

const ARTICLES_JSON = path.join(process.cwd(), 'src', 'data', 'articles.json');
const BLOB_MAP = path.join(process.cwd(), 'src', 'data', 'blob-url-map.json');
const OUTPUT_DIR = path.join(process.cwd(), 'src', 'content', 'news');

// Read existing data
const articles = JSON.parse(fs.readFileSync(ARTICLES_JSON, 'utf-8'));
const blobMap = JSON.parse(fs.readFileSync(BLOB_MAP, 'utf-8'));

function slugFromUrl(url) {
    const parts = url.replace(/\/$/, '').split('/');
    return parts[parts.length - 1] || 'unknown';
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

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// Setup Turndown
const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
});

// WordPress specific Turndown rules
turndownService.remove(['script', 'style', 'noscript', 'iframe', '.sharedaddy', '.jp-relatedposts']);

async function main() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    let successCount = 0;

    for (const article of articles) {
        const slug = slugFromUrl(article.url);
        const mdPath = path.join(OUTPUT_DIR, `${slug}.md`);

        console.log(`\n--- Fetching content: ${slug} ---`);

        try {
            const html = await fetchPage(article.url);
            const $ = cheerio.load(html);

            // Find the main WordPress content area
            let $content = $('.entry-content');
            if ($content.length === 0) $content = $('main');
            if ($content.length === 0) $content = $('article');
            if ($content.length === 0) $content = $('body');

            // Find the best featured image in our blob map
            const articleBlobKeys = Object.keys(blobMap).filter(k => k.includes(`/images/articles/${slug}/`));
            const image = articleBlobKeys.length > 0 ? blobMap[articleBlobKeys[0]] : null;

            // Map image sources in HTML to Blob URLs
            $content.find('img').each((_, img) => {
                const $img = $(img);
                let src = $img.attr('src');
                if (!src) return;

                // Strip query params
                src = src.split('?')[0];
                const filename = path.basename(src).replace(/-\d+x\d+/, '');

                // See if we have it in blobMap
                const blobKey = articleBlobKeys.find(k => k.includes(filename));
                if (blobKey) {
                    $img.attr('src', blobMap[blobKey]);
                    $img.attr('srcset', ''); // remove srcset since we only have single blob
                }
            });

            // Convert to Markdown
            const markdownContent = turndownService.turndown($content.html() || '');

            // Create frontmatter
            const fileContent = matter.stringify(markdownContent, {
                title: article.title,
                date: article.date,
                excerpt: article.excerpt,
                image: image
            });

            fs.writeFileSync(mdPath, fileContent);
            console.log(`  ✓ Saved ${slug}.md`);
            successCount++;

        } catch (err) {
            console.log(`  ✗ Failed: ${err.message}`);
        }

        await sleep(500); // Rate limit
    }

    console.log(`\n=== Done! Created ${successCount} markdown articles ===`);
}

main().catch(console.error);
