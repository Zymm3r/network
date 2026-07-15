import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://netvfzmdewatfnmejcrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldHZmem1kZXdhdGZubWVqY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTMwNjcsImV4cCI6MjA5MTcyOTA2N30.3SzgLigbKlbUxrgDyYcrkp65soRIBFfeQnQFRmZmE3U';

const supabase = createClient(supabaseUrl, supabaseKey);

async function extract() {
  const { data, error } = await supabase
    .from('lessons')
    .select('id, title_en, title_th, content_en')
    .order('id');
    
  if (error) {
    console.error('Error fetching lessons:', error);
    process.exit(1);
  }
  
  console.log(`Successfully fetched ${data.length} lessons.`);
  fs.writeFileSync(path.join(__dirname, 'lessons_extracted.json'), JSON.stringify(data, null, 2));
}

extract();
