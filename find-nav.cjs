const https = require('https');
const fs = require('fs');
const cheerio = require('cheerio');

https.get('https://bardionson.com/', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
        const $ = cheerio.load(data);
        const links = [];
        $('a').each((i, el) => {
            const href = $(el).attr('href');
            if (href && href.includes('bardionson.com')) {
                links.push({ text: $(el).text().trim(), href });
            }
        });

        let output = "All Internal Links:\n";
        links.forEach(l => output += `- ${l.text}: ${l.href}\n`);
        fs.writeFileSync('nav.txt', output);
    });
});
