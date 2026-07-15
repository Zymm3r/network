import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://netvfzmdewatfnmejcrz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldHZmem1kZXdhdGZubWVqY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTMwNjcsImV4cCI6MjA5MTcyOTA2N30.3SzgLigbKlbUxrgDyYcrkp65soRIBFfeQnQFRmZmE3U';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  console.log("Querying all products from remote DB...");
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error("Query failed:", error);
  } else {
    console.log("Products in database:");
    data.forEach(p => {
      console.log(`- ID: ${p.id}, Slug: ${p.slug}, Name TH: ${p.name_th}, Name EN: ${p.name_en}`);
    });
  }
}

run();
