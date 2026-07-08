import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const sqlPath = path.resolve(process.cwd(), 'supabase', 'migrations', 'data_migration.sql');
  const sql = fs.readFileSync(sqlPath, 'utf8');

  console.log('Parsing SQL file...');
  
  // The SQL file is formatted as:
  // INSERT INTO public.product_translations (product_id, language, content)
  // VALUES ('<id>', '<lang>', '<content>')
  // ON CONFLICT ...
  
  const blocks = sql.split('INSERT INTO public.product_translations (product_id, language, content)\nVALUES (');
  
  const records = [];
  
  for (let i = 1; i < blocks.length; i++) {
    const block = blocks[i];
    // Block starts with: '<id>', '<lang>', '<content>')\nON CONFLICT...
    // We need to parse the values.
    
    // Find the first comma
    const idEnd = block.indexOf("', '");
    const productId = block.substring(1, idEnd);
    
    // Find the second comma
    const langStart = idEnd + 4;
    const langEnd = block.indexOf("', '", langStart);
    const language = block.substring(langStart, langEnd);
    
    // Find the end of the VALUES tuple
    // It ends with: ')\nON CONFLICT
    const contentStart = langEnd + 4;
    const contentEnd = block.lastIndexOf("')\nON CONFLICT");
    
    let content = block.substring(contentStart, contentEnd);
    // Unescape single quotes
    content = content.replace(/''/g, "'");
    
    records.push({ product_id: productId, language, content });
  }

  console.log(`Parsed ${records.length} records. Upserting to Supabase...`);
  
  // Batch upsert (max 100 per request)
  for (let i = 0; i < records.length; i += 100) {
    const batch = records.slice(i, i + 100);
    console.log(`Upserting batch ${i} to ${i + batch.length}...`);
    
    const { error } = await supabase
      .from('product_translations')
      .upsert(batch, { onConflict: 'product_id, language' });
      
    if (error) {
      console.error('Error upserting batch:', error);
    }
  }
  
  console.log('Done!');
}

main();
