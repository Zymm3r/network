import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://netvfzmdewatfnmejcrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldHZmem1kZXdhdGZubWVqY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTMwNjcsImV4cCI6MjA5MTcyOTA2N30.3SzgLigbKlbUxrgDyYcrkp65soRIBFfeQnQFRmZmE3U';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Fetching lessons from database...');
  const { data, error } = await supabase
    .from('lessons')
    .select('id, title_en, content_en')
    .order('id');
    
  if (error) {
    console.error('Error fetching lessons:', error);
    process.exit(1);
  }
  
  console.log(`Successfully fetched ${data.length} lessons.`);
  
  const destDir = 'C:\\Users\\UTHtest\\.gemini\\antigravity\\worktrees\\network\\fix-lesson-completion-logic\\.agents\\teamwork_preview_explorer_quiz_m2_2';
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  const destPath = path.join(destDir, 'lessons_db.json');
  fs.writeFileSync(destPath, JSON.stringify(data, null, 2));
  console.log(`Saved lessons to ${destPath}`);
}

run();
