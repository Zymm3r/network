import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase URL or anon key');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkLessons() {
  console.log('Checking lessons table...');
  const { data, error } = await supabase
    .from('lessons')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error fetching lessons:', error);
  } else {
    console.log('Successfully fetched lessons:', data);
  }
}

checkLessons();
