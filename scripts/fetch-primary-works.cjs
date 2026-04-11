const fs = require('fs');
const path = require('path');

const csvUrl = "https://docs.google.com/spreadsheets/d/1jUrmnNCLpAey4NtzOX88VUKssONcrsr3hRUfuolgzC0/export?format=csv";

async function run() {
  try {
    const res = await fetch(csvUrl);
    const data = await res.text();
    
    // Quick regex to split csv handling quotes
    // Not perfect but handles basic cases: 
    // a,b,"c,d",e -> ['a', 'b', '"c,d"', 'e']
    const parseCSVLine = (text) => {
        const re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\s\S][^'\\]*)*)'|"([^"\\]*(?:\\[\s\S][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
        let a = [];
        text.replace(re_value, function(m0, m1, m2, m3) {
            if (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
            else if (m3 !== undefined) a.push(m3);
            return '';
        });
        if (/,\s*$/.test(text)) a.push('');
        return a;
    };

    const lines = data.split('\n').map(l => l.trim().replace(/\r/g, ''));
    
    const results = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line || line.startsWith(',')) continue; 
      
      if (line.startsWith('Physical Pieces') || line.startsWith('Installations') || line.startsWith('Bones In The Sky') || line.startsWith('Soul Scroll')) {
        continue;
      }
      
      // We will just do a standard split because the data doesn't seem to have embedded commas except maybe in quotes
      // The parseCSVLine regex sometimes fails, let's just use naive split with basic quote awareness.
      let cols = [];
      let inQuote = false;
      let curr = '';
      for (let j=0; j<line.length; j++) {
        const ch = line[j];
        if (ch === '"') inQuote = !inQuote;
        else if (ch === ',' && !inQuote) {
            cols.push(curr);
            curr = '';
        } else {
            curr += ch;
        }
      }
      cols.push(curr);

      if (cols.length < 9) continue;
      
      const clean = (str) => {
        let s = (str||'').trim();
        if (s.startsWith('"') && s.endsWith('"')) {
            s = s.substring(1, s.length - 1);
        }
        return s;
      };

      const market = clean(cols[0]);
      const series = clean(cols[1]);
      const title = clean(cols[2]);
      const date = clean(cols[3]);
      const type = clean(cols[4]);
      const editions = clean(cols[5]);
      const available = clean(cols[6]);
      const chain = clean(cols[7]);
      const location = clean(cols[8]);
      
      if (market && title && location && location.startsWith('http')) {
        results.push({ market, series, title, date, type, editions, available, chain, location });
      }
    }
    
    const dir = path.join(__dirname, '..', 'src', 'data');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    
    // Cross-check with local nfts.json if available to extract images
    try {
        const nftsPath = path.join(dir, 'nfts.json');
        if (fs.existsSync(nftsPath)) {
            const nftsData = JSON.parse(fs.readFileSync(nftsPath, 'utf8'));
            const allNfts = [];
            for (const collection in nftsData) {
                allNfts.push(...nftsData[collection].nfts);
            }
            let matched = 0;
            for (const work of results) {
                const match = allNfts.find(n => n.name === work.title || (n.name && n.name.includes(work.title)));
                if (match) {
                    work.image = match.display_image_url || match.image_url;
                    matched++;
                }
            }
            console.log(`Matched ${matched} works with images from nfts.json cache.`);
        }
    } catch(e) {
        console.error('Error matching cached images:', e.message);
    }

    const outPath = path.join(dir, 'primary-works.json');
    fs.writeFileSync(outPath, JSON.stringify(results, null, 2));
    console.log(`Successfully parsed ${results.length} works into src/data/primary-works.json`);
  } catch (err) {
    console.log("Error fetching CSV: " + err);
  }
}

run();
