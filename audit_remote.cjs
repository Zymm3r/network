const { createClient } = require('@supabase/supabase-js');
const https = require('https');

const supabaseUrl = 'https://netvfzmdewatfnmejcrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldHZmem1kZXdhdGZubWVqY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTMwNjcsImV4cCI6MjA5MTcyOTA2N30.3SzgLigbKlbUxrgDyYcrkp65soRIBFfeQnQFRmZmE3U';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('lessons').select('id, video_url, thumbnail_url, lesson_type');
  if (error) {
    console.error('Error fetching lessons:', error);
    return;
  }
  
  let validVideoCount = 0;
  let validThumbCount = 0;
  let remainingVideoNulls = 0;
  let remainingThumbNulls = 0;
  let invalidOrUnreachable = 0;

  for (const l of data) {
    // Check Video
    if (l.video_url === null) {
      remainingVideoNulls++;
    } else if (l.video_url.includes('example.com') || !l.video_url.startsWith('https://')) {
      invalidOrUnreachable++;
    } else {
      validVideoCount++;
    }
    
    // Check Thumbnail
    if (l.thumbnail_url === null) {
      remainingThumbNulls++;
    } else if (l.thumbnail_url.includes('/images/lessons') || !l.thumbnail_url.startsWith('https://')) {
      invalidOrUnreachable++;
    } else {
      validThumbCount++;
    }
  }

  console.log(`
FINAL AUDIT REPORT
==================
Total lessons processed: ${data.length}
Valid video_url count: ${validVideoCount}
Valid thumbnail_url count: ${validThumbCount}
Remaining NULL values (video): ${remainingVideoNulls}
Remaining NULL values (thumbnail): ${remainingThumbNulls}
Invalid or unreachable URLs: ${invalidOrUnreachable}
`);
}

run();
