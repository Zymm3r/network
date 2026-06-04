const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://netvfzmdewatfnmejcrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldHZmem1kZXdhdGZubWVqY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTMwNjcsImV4cCI6MjA5MTcyOTA2N30.3SzgLigbKlbUxrgDyYcrkp65soRIBFfeQnQFRmZmE3U';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  // 1. Fetch remote IDs and generate Migration SQL
  const { data } = await supabase.from('lessons').select('id').order('created_at', { ascending: true });
  const ids = data.map(d => d.id);
  
  let sqlMigration = `-- Migration: Convert all thumbnails to use unique tech LoremFlickr seeds\n\n`;
  let counter = 1;
  const idMap = new Map(); // Keep track of the lock number for each ID

  for (const id of ids) {
    const loremUrl = `https://loremflickr.com/600/400/server,technology,network/all?lock=${counter}`;
    sqlMigration += `UPDATE public.lessons SET thumbnail_url = '${loremUrl}' WHERE id = '${id}';\n`;
    idMap.set(id, counter);
    counter++;
  }
  
  const migrationFile = 'supabase/migrations/20260604000005_update_thumbnails_to_loremflickr.sql';
  fs.writeFileSync(migrationFile, sqlMigration);
  console.log(`Migration written to ${migrationFile}`);

  // 2. Update seed.sql to maintain local consistency
  let seedSql = fs.readFileSync('src/app/data/seed.sql', 'utf8');

  // Replace all occurrences of https://picsum.photos/... or anything else in the lessons block
  const tupleRegex = /\('lesson-[^']+',[\s\S]*?\)(?=,|;)/g;

  seedSql = seedSql.replace(tupleRegex, (tupleMatch) => {
      const idMatch = tupleMatch.match(/\('([^']+)'/);
      if (!idMatch) return tupleMatch;
      const lessonId = idMatch[1];
      
      const lockNum = idMap.get(lessonId) || Math.floor(Math.random() * 1000) + 100;
      const loremUrl = `https://loremflickr.com/600/400/server,technology,network/all?lock=${lockNum}`;

      let cols = tupleMatch.split(/,\s*(?=(?:[^']*'[^']*')*[^']*$)/);
      if (cols.length >= 11) {
          cols[cols.length - 3] = `'${loremUrl}'`; // 3rd from end is thumbnail_url
          return cols.join(', ');
      }
      return tupleMatch;
  });

  fs.writeFileSync('src/app/data/seed.sql', seedSql);
  console.log('Updated seed.sql');
}

run();
