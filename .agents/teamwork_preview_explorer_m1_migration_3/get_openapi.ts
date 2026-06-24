import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const url = process.env.VITE_SUPABASE_URL;
const key = process.env.VITE_SUPABASE_ANON_KEY;

async function run() {
  // OPTIONS /rest/v1/training_lessons
  const response = await fetch(`${url}/rest/v1/training_lessons`, {
    method: 'OPTIONS',
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`
    }
  });
  
  if (response.ok) {
    const text = await response.text();
    // PostgREST OPTIONS returns OpenAPI JSON
    try {
      const swagger = JSON.parse(text);
      const props = swagger.definitions?.training_lessons?.properties;
      console.log("training_lessons properties:", props);
    } catch (e) {
      console.log("Failed to parse JSON:", text.substring(0, 500));
    }
  } else {
    console.error("OPTIONS request failed:", response.status, response.statusText);
  }
}

run().catch(console.error);
