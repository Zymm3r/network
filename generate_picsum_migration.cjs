const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://netvfzmdewatfnmejcrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldHZmem1kZXdhdGZubWVqY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTMwNjcsImV4cCI6MjA5MTcyOTA2N30.3SzgLigbKlbUxrgDyYcrkp65soRIBFfeQnQFRmZmE3U';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data } = await supabase.from('lessons').select('id');
  const ids = data.map(d => d.id);
  
  let sqlMigration = `-- Migration: Convert all thumbnails to use unique Picsum seeds\n\n`;
  for (const id of ids) {
    const picsumUrl = `https://picsum.photos/seed/${id}/600/400`;
    sqlMigration += `UPDATE public.lessons SET thumbnail_url = '${picsumUrl}' WHERE id = '${id}';\n`;
  }
  
  const migrationFile = 'supabase/migrations/20260604000004_update_thumbnails_to_picsum.sql';
  fs.writeFileSync(migrationFile, sqlMigration);
  console.log(`Migration written to ${migrationFile}`);
}

run();
