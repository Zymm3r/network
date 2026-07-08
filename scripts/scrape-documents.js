import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import axios from 'axios';
import * as cheerio from 'cheerio';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const ALLOWED_EXTENSIONS = ['.pdf', '.xls', '.xlsx', '.csv', '.ods'];

function getExtension(url) {
  const urlWithoutParams = url.split('?')[0].split('#')[0];
  const parts = urlWithoutParams.split('.');
  if (parts.length > 1) {
    const ext = '.' + parts[parts.length - 1].toLowerCase();
    if (ALLOWED_EXTENSIONS.includes(ext)) {
      return ext;
    }
  }
  return null;
}

function classifyDocumentType(title) {
  const t = title.toLowerCase();
  if (t.includes('manual') || t.includes('คู่มือ')) return 'User Manual';
  if (t.includes('install') || t.includes('ติดตั้ง')) return 'Installation Guide';
  if (t.includes('quick start') || t.includes('เริ่มต้น')) return 'Quick Start Guide';
  if (t.includes('spec') || t.includes('สเปค')) return 'Specification';
  if (t.includes('firmware') || t.includes('release notes')) return 'Firmware Release Notes';
  if (t.includes('brochure') || t.includes('โบรชัวร์')) return 'Brochure';
  return 'Datasheet'; // default
}

function getMimeType(ext) {
  switch(ext) {
    case '.pdf': return 'application/pdf';
    case '.xls': return 'application/vnd.ms-excel';
    case '.xlsx': return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case '.csv': return 'text/csv';
    case '.ods': return 'application/vnd.oasis.opendocument.spreadsheet';
    default: return 'application/octet-stream';
  }
}

async function checkUrlValid(url) {
  const headers = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' };
  try {
    const response = await axios.head(url, { timeout: 5000, headers });
    return response.status === 200;
  } catch (err) {
    // Some servers don't support HEAD, fallback to GET with stream
    try {
       const getResp = await axios.get(url, { responseType: 'stream', timeout: 5000, headers });
       getResp.data.destroy(); // Abort downloading
       return getResp.status === 200;
    } catch(e) {
       return false;
    }
  }
}

async function run() {
  console.log('Fetching all products from Supabase...');
  const { data: products, error } = await supabase
    .from('products')
    .select('id, name, source_url')
    .not('source_url', 'is', null)
    .not('source_url', 'eq', '');
    
  if (error) {
    console.error('Error fetching products:', error);
    process.exit(1);
  }
  
  console.log(`Found ${products.length} products with source_url.`);
  
  let totalScanned = 0;
  let pdfsFound = 0;
  let sheetsFound = 0;
  let failedUrls = 0;
  
  const documentsToInsert = [];

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    console.log(`[${i+1}/${products.length}] Scanning ${p.name} (${p.source_url})...`);
    
    try {
      const response = await axios.get(p.source_url, { 
        timeout: 10000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5'
        }
      });
      const html = response.data;
      const $ = cheerio.load(html);
      
      const links = $('a');
      const foundUrls = new Set();
      
      for (let j = 0; j < links.length; j++) {
        const a = links[j];
        let href = $(a).attr('href');
        
        if (!href) continue;
        
        // Handle relative URLs
        if (href.startsWith('/')) {
          const urlObj = new URL(p.source_url);
          href = `${urlObj.protocol}//${urlObj.host}${href}`;
        } else if (!href.startsWith('http')) {
          continue;
        }
        
        const ext = getExtension(href);
        if (ext) {
          if (foundUrls.has(href)) continue; // Prevent duplicates
          foundUrls.add(href);
          
          const linkText = $(a).text().trim() || p.name + ' Document';
          
          // Validate URL
          const isValid = await checkUrlValid(href);
          if (!isValid) {
            console.log(`  ❌ Failed URL: ${href}`);
            failedUrls++;
            continue;
          }
          
          if (ext === '.pdf') pdfsFound++;
          else sheetsFound++;
          
          documentsToInsert.push({
            product_id: p.id,
            title: linkText,
            document_type: classifyDocumentType(linkText),
            file_url: href,
            mime_type: getMimeType(ext),
            extension: ext.replace('.', ''),
            language: p.source_url.includes('/th/') ? 'th' : 'en',
            markdown_content: '' // Required by previous schema but we don't need it
          });
          
          console.log(`  ✅ Found valid document: ${linkText} (${ext})`);
        }
      }
      
      totalScanned++;
    } catch (err) {
      console.log(`  ⚠️ Failed to scrape ${p.source_url}: ${err.message}`);
    }
  }
  
  console.log('--- SCAN COMPLETE ---');
  console.log(`Products Scanned: ${totalScanned}`);
  console.log(`PDFs Found: ${pdfsFound}`);
  console.log(`Spreadsheets Found: ${sheetsFound}`);
  console.log(`Failed URLs: ${failedUrls}`);
  console.log(`Total Documents to Insert: ${documentsToInsert.length}`);
  
  if (documentsToInsert.length > 0) {
    console.log('Inserting into Supabase...');
    // We must grant public insert permissions for this script if RLS is enabled on documents
    // Or just run it. We assume RLS is open or we have to run MCP.
    const chunkSize = 50;
    for (let i = 0; i < documentsToInsert.length; i += chunkSize) {
      const chunk = documentsToInsert.slice(i, i + chunkSize);
      const { error: insErr } = await supabase.from('documents').insert(chunk);
      if (insErr) {
        console.error('Failed to insert chunk:', insErr);
      }
    }
    console.log('Insertion complete.');
  }
}

run();
