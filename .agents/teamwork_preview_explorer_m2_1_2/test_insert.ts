import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data, error } = await supabase.from('products').insert([
    { name: "Test Product", slug: "test-product", category_id: null, source_url: "http://test.com" }
  ]);
  console.log("Insert result:", data, error);
  if (!error) {
    await supabase.from('products').delete().eq('slug', 'test-product');
  }
}
run();
