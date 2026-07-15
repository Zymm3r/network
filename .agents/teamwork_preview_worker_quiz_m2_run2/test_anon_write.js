import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://netvfzmdewatfnmejcrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldHZmem1kZXdhdGZubWVqY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTMwNjcsImV4cCI6MjA5MTcyOTA2N30.3SzgLigbKlbUxrgDyYcrkp65soRIBFfeQnQFRmZmE3U';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Testing write permission with anon key...');
  const { data, error } = await supabase
    .from('lessons')
    .update({ quiz_data: { test: true } })
    .eq('id', 'devnet-004-lesson-1')
    .select();
    
  if (error) {
    console.error('Error during update:', error);
  } else {
    console.log('Update succeeded! Response:', data);
  }
}

run();
