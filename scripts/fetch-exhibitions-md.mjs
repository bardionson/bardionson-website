import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import * as cheerio from 'cheerio';
import TurndownService from 'turndown';
import matter from 'gray-matter';
import { put } from '@vercel/blob';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const OUTPUT_DIR = path.join(process.cwd(), 'src', 'content', 'exhibitions');
const IMAGE_DIR = path.join(process.cwd(), 'public', 'images', 'exhibitions');
const BLOB_MAP_FILE = path.join(process.cwd(), 'src', 'data', 'blob-url-map.json');

let blobMap = {};
if (fs.existsSync(BLOB_MAP_FILE)) {
    blobMap = JSON.parse(fs.readFileSync(BLOB_MAP_FILE, 'utf-8'));
}

function saveBlobMap() {
    fs.writeFileSync(BLOB_MAP_FILE, JSON.stringify(blobMap, null, 2));
}

function fetchPage(url) {
    return new Promise((resolve, reject) => {
        const mod = url.startsWith('https') ? https : http;
        mod.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchPage(res.headers.location).then(resolve).catch(reject);
            }
            if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} at ${url}`));
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

function downloadImage(url, dest) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(dest)) {
            return resolve(dest); // skip
        }
        const file = fs.createWriteStream(dest);
        const mod = url.startsWith('https') ? https : http;
        mod.get(url, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                file.close();
                return downloadImage(response.headers.location, dest).then(resolve).catch(reject);
            }
            if (response.statusCode !== 200) {
                file.close();
                fs.unlink(dest, () => { });
                return reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
}

async function uploadToBlob(localPath, filename) {
    if (blobMap[filename]) return blobMap[filename];

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.warn('No BLOB_READ_WRITE_TOKEN, skipping upload for', filename);
        return null; // fallback to local if needed, or caller handles
    }

    try {
        console.log(`Uploading ${filename} to Vercel Blob...`);
        const fileBuffer = fs.readFileSync(localPath);
        const blob = await put(`exhibitions/${filename}`, fileBuffer, {
            access: 'public',
            token: process.env.BLOB_READ_WRITE_TOKEN
        });
        blobMap[filename] = blob.url;
        saveBlobMap();
        return blob.url;
    } catch (err) {
        console.error(`Failed to upload ${filename}:`, err);
        return null;
    }
}

function cleanSlug(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function main() {
    if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    if (!fs.existsSync(IMAGE_DIR)) fs.mkdirSync(IMAGE_DIR, { recursive: true });

    console.log("Fetching https://bardionson.com/exhibitions/ ...");
    const html = await fetchPage('https://bardionson.com/exhibitions/');
    const $ = cheerio.load(html);

    let currentYear = "2024";
    let exhibitions = [];
    let currentExhibition = null;
    const elements = $('.entry-content').contents();

    for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        if (el.type !== 'tag') continue;

        const $el = $(el);
        const tagName = el.name.toLowerCase();
        const text = $el.text().trim();

        if (tagName === 'hr' || $el.hasClass('wp-block-separator')) {
            if (currentExhibition) { exhibitions.push(currentExhibition); currentExhibition = null; }
            continue;
        }

        if ((tagName === 'h2' || tagName === 'h3' || tagName === 'h4') && /^20[0-9]{2}$/.test(text)) {
            currentYear = text;
            if (currentExhibition) { exhibitions.push(currentExhibition); currentExhibition = null; }
            continue;
        }

        if ($el.hasClass('wp-block-columns')) {
            if (currentExhibition) exhibitions.push(currentExhibition);

            const titleEl = $el.find('h2, h3, h4').first();
            let title = titleEl.text().trim() || "Exhibition " + currentYear + " " + i;
            if (/^20[0-9]{2}$/.test(title)) {
                currentYear = title;
                title = "Exhibition in " + currentYear;
            }
            const link = titleEl.find('a').attr('href') || $el.find('a').attr('href');

            currentExhibition = {
                title: title,
                year: currentYear,
                htmlContent: $.html(el),
                link: link || ''
            };
            exhibitions.push(currentExhibition);
            currentExhibition = null;
            continue;
        }

        if (tagName === 'h2' || tagName === 'h3') {
            if (currentExhibition) exhibitions.push(currentExhibition);
            currentExhibition = {
                title: text || `Historic Exhibition ${currentYear}`,
                year: currentYear,
                htmlContent: $.html(el),
                link: $el.find('a').attr('href') || ''
            };
        } else if (currentExhibition) {
            currentExhibition.htmlContent += $.html(el);
            if (!currentExhibition.link) currentExhibition.link = $el.find('a').attr('href') || '';
        } else {
            if (tagName === 'p' && (text.length > 50 || $el.find('img').length > 0)) {
                currentExhibition = {
                    title: `Exhibition ${currentYear}`,
                    year: currentYear,
                    htmlContent: $.html(el),
                    link: $el.find('a').attr('href') || ''
                };
            }
        }
    }
    if (currentExhibition) exhibitions.push(currentExhibition);

    const turndownService = new TurndownService({
        headingStyle: 'atx',
        codeBlockStyle: 'fenced'
    });

    console.log(`Processing ${exhibitions.length} exhibitions...`);

    let slugCounts = {};

    for (let i = 0; i < exhibitions.length; i++) {
        const ex = exhibitions[i];
        let baseSlug = cleanSlug(ex.title);
        if (!baseSlug || baseSlug === 'exhibition-') baseSlug = `exhibition-${i}`;

        if (slugCounts[baseSlug]) {
            slugCounts[baseSlug]++;
            baseSlug = `${baseSlug}-${slugCounts[baseSlug]}`;
        } else {
            slugCounts[baseSlug] = 1;
        }

        const slug = baseSlug;

        // Try extracting year from title or text
        let calculatedYear = ex.year;
        const yearMatch = (ex.title + " " + ex.htmlContent).match(/\b(199[0-9]|20[0-2][0-9])\b/);
        if (yearMatch) {
            calculatedYear = yearMatch[1];
        }

        let frontmatterImage = '';

        const $ex = cheerio.load(ex.htmlContent);
        const images = $ex('img');

        for (let j = 0; j < images.length; j++) {
            const img = images[j];
            const $img = $ex(img);

            let src = $img.attr('data-orig-file') || $img.attr('data-large-file') || $img.attr('src');
            if (src && src.startsWith('http')) {
                try {
                    const parsedUrl = new URL(src);
                    let filename = path.basename(parsedUrl.pathname);
                    if (!filename) filename = `image-${j}.jpg`;
                    filename = filename.replace(/%[0-9A-Fa-f]{2}/g, '').replace(/[^a-zA-Z0-9.-]/g, '_');

                    const localPath = path.join(IMAGE_DIR, filename);

                    if (!fs.existsSync(localPath)) {
                        console.log(`Downloading ${src} to ${filename}`);
                        await downloadImage(src, localPath);
                    }

                    // Upload to Blob
                    const blobUrl = await uploadToBlob(localPath, filename);
                    if (blobUrl) {
                        $img.attr('src', blobUrl);
                        $img.removeAttr('srcset');
                        $img.removeAttr('sizes');
                        if (j === 0) frontmatterImage = blobUrl; // use first image as frontmatter image
                    } else {
                        // fallback to local path if blob fails
                        $img.attr('src', `/images/exhibitions/${filename}`);
                        if (j === 0) frontmatterImage = `/images/exhibitions/${filename}`;
                    }
                } catch (e) {
                    console.error(`Error processing image ${src}:`, e.message);
                }
            }
        }

        const updatedHtml = $ex.html();
        const markdown = turndownService.turndown(updatedHtml);

        const frontmatter = {
            title: ex.title,
            year: calculatedYear,
            ...(frontmatterImage && { image: frontmatterImage }),
            ...(ex.link && { link: ex.link })
        };

        const mdContent = matter.stringify(markdown, frontmatter);
        const mdPath = path.join(OUTPUT_DIR, `${slug}.md`);

        fs.writeFileSync(mdPath, mdContent);
        console.log(`Saved ${mdPath}`);
    }
}

main().catch(console.error);
