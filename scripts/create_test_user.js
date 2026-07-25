import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function main() {
  const email = `test_${Date.now()}@example.com`;
  const password = 'testpassword123';
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Signup error:', error.message);
  } else {
    console.log('Signup success!');
    console.log(JSON.stringify({ email, password, session: data.session }));
  }
}

main();
