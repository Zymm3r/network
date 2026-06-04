import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase.rpc('get_schema');
  console.log('rpc error:', error);
  
  // Alternative: just try to insert without lesson_id
  const { data: auth, error: authErr } = await supabase.auth.signUp({
    email: 'test' + Date.now() + '@example.com',
    password: 'password123'
  });
  
  if (authErr) {
    console.log("Auth err:", authErr);
    return;
  }
  
  const { data: up, error: upErr } = await supabase.from('user_progress').insert({
    user_id: auth.user.id,
    status: 'in_progress',
    progress_percentage: 5
  }).select();
  
  console.log("Insert without lesson_id:", up, upErr);
  
  const { data: up2, error: upErr2 } = await supabase.from('user_progress').insert({
    user_id: auth.user.id,
    lesson_id: 'lesson-python-01',
    status: 'in_progress',
    progress_percentage: 10
  }).select();
  
  console.log("Insert with lesson_id text:", upErr2);
  
  const { data: up3, error: upErr3 } = await supabase.from('user_progress').insert({
    user_id: auth.user.id,
    lesson_id: '123e4567-e89b-12d3-a456-426614174000',
    status: 'in_progress',
    progress_percentage: 15
  }).select();
  
  console.log("Insert with lesson_id uuid:", upErr3);
}

run();
