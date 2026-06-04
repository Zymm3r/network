import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

// We need an authenticated user to bypass RLS, so let's log in
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

async function run() {
  const { data: auth, error: authErr } = await supabase.auth.signInWithPassword({
    email: 'test@example.com', // Need a valid user
    password: 'password123'    // Hard to guess
  });
  
  if (authErr) {
    console.log("Auth failed, can't test RLS:", authErr.message);
    return;
  }

  const { data, error } = await supabase.from('user_progress').upsert({
    user_id: auth.user.id,
    lesson_id: '123e4567-e89b-12d3-a456-426614174000',
    status: 'in_progress',
    progress_percentage: 10,
    notes: '[]',
  }, { onConflict: 'user_id,lesson_id' }).select();

  console.log('Upsert result:', data, error);
}

run();
