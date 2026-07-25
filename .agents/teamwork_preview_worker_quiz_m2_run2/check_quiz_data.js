import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://netvfzmdewatfnmejcrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldHZmem1kZXdhdGZubWVqY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTMwNjcsImV4cCI6MjA5MTcyOTA2N30.3SzgLigbKlbUxrgDyYcrkp65soRIBFfeQnQFRmZmE3U';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Querying lessons table...');
  const { data, error } = await supabase
    .from('lessons')
    .select('id, title_en, quiz_data')
    .limit(10);
    
  if (error) {
    console.error('Error querying database:', error);
  } else {
    console.log('Successfully fetched lessons sample:');
    data.forEach(l => {
      console.log(`- ${l.id} (${l.title_en}): quiz_data exists = ${!!l.quiz_data}, value =`, l.quiz_data ? JSON.stringify(l.quiz_data).substring(0, 100) + '...' : 'null');
    });
  }
}

run();
