import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || "";

async function run() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/?apikey=${SUPABASE_ANON_KEY}`);
  const spec = await res.json();
  console.log(Object.keys(spec));
  if (spec.definitions) {
    console.log(Object.keys(spec.definitions));
  } else if (spec.components && spec.components.schemas) {
    console.log(Object.keys(spec.components.schemas));
  }
}

run();
