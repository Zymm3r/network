import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://netvfzmdewatfnmejcrz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldHZmem1kZXdhdGZubWVqY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTMwNjcsImV4cCI6MjA5MTcyOTA2N30.3SzgLigbKlbUxrgDyYcrkp65soRIBFfeQnQFRmZmE3U';

// Header: {"alg":"HS256","typ":"JWT"} -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
// Payload: {"exp": 2524608000, "sub": "00000000-0000-0000-0000-000000000000", "role": "authenticated"}
const header = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
const payload = Buffer.from(JSON.stringify({
  exp: Math.floor(Date.now() / 1000) + 3600,
  sub: '00000000-0000-0000-0000-000000000000',
  role: 'authenticated'
})).toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
const fakeJwt = `${header}.${payload}.fake_signature`;

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

async function run() {
  console.log("Setting session with fake JWT...");
  const { data: setSessionData, error: setSessionError } = await supabase.auth.setSession({
    access_token: fakeJwt,
    refresh_token: 'fake'
  });

  if (setSessionError) {
    console.error("setSession error:", setSessionError);
  } else {
    console.log("Session set successfully:", setSessionData);
  }

  console.log("Querying lessons table...");
  const { data, error } = await supabase.from('lessons').select('id, title_en').limit(2);
  if (error) {
    console.error("Query failed:", error);
  } else {
    console.log("Query succeeded:", data);
  }
}

run();
