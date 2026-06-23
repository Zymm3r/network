import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(url, key);

async function run() {
  const { error: insErr } = await supabase.from('training_lessons').insert({ id: '00000000-0000-0000-0000-000000000000' });
  console.log("Insert error with just ID:", insErr?.message, insErr?.details);

  const { error: err2 } = await supabase.from('training_lessons').insert({ 
    id: '00000000-0000-0000-0000-000000000000', 
    course_id: '00000000-0000-0000-0000-000000000000' 
  });
  console.log("Insert error with course_id:", err2?.message);
}

run().catch(console.error);
