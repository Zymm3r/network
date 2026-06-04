import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase.from('user_activity_stats').select('*');
  console.log('user_activity_stats:', data);
  console.log('error:', error);
  
  const { data: up, error: upE } = await supabase.from('user_progress').select('*');
  console.log('user_progress:', up);
}

run();
