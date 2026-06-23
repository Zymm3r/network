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
  const { data: courses, error: err1 } = await supabase.from('training_courses').select('*').limit(1);
  console.log("training_courses columns:", courses ? Object.keys(courses[0] || {}) : "No data", err1);
  
  const { data: lessons, error: err2 } = await supabase.from('training_lessons').select('*').limit(1);
  console.log("training_lessons columns:", lessons ? Object.keys(lessons[0] || {}) : "No data", err2);

  // Instead of just relying on data, we can query information_schema if the service role is capable? Or via rpc.
  // We can just try to insert a dummy to get an error?
  // Let's use the REST API `OPTIONS` or `HEAD` ? No, supabase-js doesn't expose it directly easily.
  // If the tables are empty, Object.keys(courses[0]) will throw if it's undefined. Let's fix that.
  
  if (courses && courses.length === 0) {
    console.log("courses is empty");
  }
  if (lessons && lessons.length === 0) {
    console.log("lessons is empty");
  }
}

run().catch(console.error);
