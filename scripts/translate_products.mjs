import { createClient } from '@supabase/supabase-js';
import translate from 'translate';
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

// Use Google translate engine
translate.engine = 'google';

async function main() {
  console.log('Fetching products...');
  
  // Fetch all products
  const { data: products, error } = await supabase
    .from('products')
    .select('id, content');

  if (error) {
    console.error('Error fetching products:', error);
    process.exit(1);
  }

  console.log(`Found ${products.length} products. Starting translation...`);
  
  let sql = `-- Migration: Insert translated product content\n`;
  sql += `BEGIN;\n\n`;

  // We will process them sequentially to avoid rate limiting
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    if (!product.content) continue;
    
    console.log(`[${i + 1}/${products.length}] Translating product ${product.id}...`);
    
    try {
      // 1. Convert to pure English
      // Some parts are in Thai, so we translate the whole text from Thai to English
      // But wait, it's mostly English. Translate will just pass through English text and translate Thai to English.
      const contentEn = await translate(product.content, { from: 'th', to: 'en' });
      
      // 2. Convert to pure Thai
      // Translate the whole text to Thai
      const contentTh = await translate(product.content, { to: 'th' });

      // Escape single quotes for SQL
      const escapeSql = (str) => str.replace(/'/g, "''");

      sql += `INSERT INTO public.product_translations (product_id, language, content)\n`;
      sql += `VALUES ('${product.id}', 'en', '${escapeSql(contentEn)}')\n`;
      sql += `ON CONFLICT (product_id, language) DO UPDATE SET content = EXCLUDED.content;\n\n`;

      sql += `INSERT INTO public.product_translations (product_id, language, content)\n`;
      sql += `VALUES ('${product.id}', 'th', '${escapeSql(contentTh)}')\n`;
      sql += `ON CONFLICT (product_id, language) DO UPDATE SET content = EXCLUDED.content;\n\n`;
      
      // Add a small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 1000));
      
    } catch (err) {
      console.error(`Failed to translate product ${product.id}:`, err.message);
    }
  }

  sql += `COMMIT;\n`;
  
  const outputPath = path.resolve(process.cwd(), 'supabase', 'migrations', 'data_migration.sql');
  fs.writeFileSync(outputPath, sql);
  
  console.log(`\nTranslation complete! SQL migration saved to: ${outputPath}`);
}

main();
