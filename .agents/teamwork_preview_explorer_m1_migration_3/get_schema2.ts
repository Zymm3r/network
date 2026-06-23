import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error("Missing URL or KEY");
  process.exit(1);
}

const supabase = createClient(url, key);

async function run() {
  const { data, error } = await supabase.rpc('exec_sql', { query: "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'training_lessons';" });
  if (error) {
    console.error("RPC error:", error.message);
    // Let's try inserting a dummy to see the error
    const { error: insErr } = await supabase.from('training_lessons').insert({ id: 'dummy' });
    console.log("Insert error:", insErr?.message);
    
    // Also try another approach: fetch with returning error?
  } else {
    console.log("Schema from RPC:", data);
  }
}

run().catch(console.error);
