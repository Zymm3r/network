const fs = require('fs');
const https = require('https');
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://netvfzmdewatfnmejcrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldHZmem1kZXdhdGZubWVqY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTMwNjcsImV4cCI6MjA5MTcyOTA2N30.3SzgLigbKlbUxrgDyYcrkp65soRIBFfeQnQFRmZmE3U';
const supabase = createClient(supabaseUrl, supabaseKey);

function fetchDuration(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        const match = data.match(/"lengthSeconds":"(\d+)"/);
        if (match) {
          resolve(Math.ceil(parseInt(match[1]) / 60));
        } else {
          resolve(null);
        }
      });
      res.on('error', () => resolve(null));
    }).on('error', () => resolve(null));
  });
}

async function run() {
  // 1. Fetch remote video lessons
  const { data } = await supabase
    .from('lessons')
    .select('id, video_url')
    .not('video_url', 'is', null);
    
  console.log(`Found ${data.length} video lessons.`);

  let sqlMigration = `-- Migration: Update duration_minutes based on actual YouTube length\n\n`;
  const durationMap = new Map();

  // Process in chunks to avoid overwhelming YouTube
  for (let i = 0; i < data.length; i++) {
    const lesson = data[i];
    if (lesson.video_url && lesson.video_url.includes('youtube.com')) {
      const minutes = await fetchDuration(lesson.video_url);
      if (minutes !== null) {
        // Update to at least 1 minute if it was somehow 0
        const finalMinutes = Math.max(1, minutes);
        sqlMigration += `UPDATE public.lessons SET duration_minutes = ${finalMinutes} WHERE id = '${lesson.id}';\n`;
        durationMap.set(lesson.id, finalMinutes);
        console.log(`Processed ${lesson.id} -> ${finalMinutes} mins`);
      } else {
        console.log(`Failed to fetch duration for ${lesson.id} (${lesson.video_url})`);
      }
    }
  }

  const migrationFile = 'supabase/migrations/20260604000006_update_real_durations.sql';
  fs.writeFileSync(migrationFile, sqlMigration);
  console.log(`Migration written to ${migrationFile}`);

  // 2. Update seed.sql to maintain local consistency
  let seedSql = fs.readFileSync('src/app/data/seed.sql', 'utf8');

  const tupleRegex = /\('lesson-[^']+',[\s\S]*?\)(?=,|;)/g;

  seedSql = seedSql.replace(tupleRegex, (tupleMatch) => {
      const idMatch = tupleMatch.match(/\('([^']+)'/);
      if (!idMatch) return tupleMatch;
      const lessonId = idMatch[1];
      
      const newDuration = durationMap.get(lessonId);
      if (newDuration === undefined) return tupleMatch;

      // The schema is:
      // id, course_id, title_th, title_en, content_th, content_en, lesson_type, duration_minutes, order_index, video_url, thumbnail_url, created_at, updated_at
      // Let's parse columns safely
      let cols = tupleMatch.split(/,\s*(?=(?:[^']*'[^']*')*[^']*$)/);
      if (cols.length >= 11) {
          // duration_minutes is the 8th column (index 7)
          cols[7] = ` ${newDuration}`; 
          return cols.join(',');
      }
      return tupleMatch;
  });

  fs.writeFileSync('src/app/data/seed.sql', seedSql);
  console.log('Updated seed.sql');
}

run();
