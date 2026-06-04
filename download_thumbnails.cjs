const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const MIGRATION_FILE = path.join(__dirname, 'supabase', 'migrations', '20260604000005_update_thumbnails_to_loremflickr.sql');
const OUTPUT_DIR = path.join(__dirname, 'public', 'images', 'thumbnails');
const OUTPUT_SQL = path.join(__dirname, 'supabase', 'migrations', '20260604000008_local_thumbnails.sql');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function downloadImage(urlString, dest) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(urlString);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    client.get(urlString, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        let location = res.headers.location;
        if (location.startsWith('/')) {
            location = parsedUrl.origin + location;
        }
        return downloadImage(location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to get '${urlString}' (${res.statusCode})`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  const content = fs.readFileSync(MIGRATION_FILE, 'utf8');
  const lines = content.split('\n');
  
  const regex = /UPDATE public\.lessons SET thumbnail_url = '([^']+)' WHERE id = '([^']+)';/;
  const mappings = [];
  
  for (const line of lines) {
    const match = line.match(regex);
    if (match) {
      mappings.push({ url: match[1], id: match[2] });
    }
  }
  
  console.log(`Found ${mappings.length} thumbnails to download.`);
  let sql = '-- Migration: Update thumbnails to local paths\n\n';
  
  // Clean start
  // Download sequentially to avoid hitting loremflickr rate limits too hard
  for (let i = 0; i < mappings.length; i++) {
    const { url, id } = mappings[i];
    const fileName = `${id}.jpg`;
    const destPath = path.join(OUTPUT_DIR, fileName);
    
    console.log(`[${i+1}/${mappings.length}] Downloading ${fileName}...`);
    try {
      await downloadImage(url, destPath);
      sql += `UPDATE lessons SET thumbnail_url = '/images/thumbnails/${fileName}' WHERE id = '${id}';\n`;
    } catch (e) {
      console.error(`Error downloading ${fileName}:`, e);
      // Fallback
      sql += `UPDATE lessons SET thumbnail_url = '/images/resources/it-made-easy.png' WHERE id = '${id}';\n`;
    }
    
    await new Promise(r => setTimeout(r, 200));
  }
  
  fs.writeFileSync(OUTPUT_SQL, sql, 'utf8');
  console.log('Successfully generated 20260604000008_local_thumbnails.sql');
}

run();
