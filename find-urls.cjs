const https = require('https');
https.get('https://bardionson.com/', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
        const matches = data.match(/href="([^"]+)"/g) || [];
        const links = [...new Set(matches.map(m => m.replace(/href="|"/g, '')))];

        console.log('Project links:', links.filter(l => l.includes('project')));
        console.log('Exhibition links:', links.filter(l => l.toLowerCase().includes('exhibition')));
    });
});
