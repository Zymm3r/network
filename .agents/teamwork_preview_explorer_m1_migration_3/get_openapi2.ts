import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

async function run() {
  const response = await fetch(`${url}/rest/v1/`, {
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`
    }
  });
  
  if (response.ok) {
    const json = await response.json();
    const props = json.definitions?.training_lessons?.properties;
    console.log("training_lessons properties:", props);
  } else {
    console.error("Root GET failed:", response.status, response.statusText);
  }
}

run().catch(console.error);
