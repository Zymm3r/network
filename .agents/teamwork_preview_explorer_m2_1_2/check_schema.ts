import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { data, error } = await supabase.rpc('query_schema', {});
  console.log("RPC query_schema:", data, error);
  
  // Actually, we can just do a select from information_schema via RPC or we might not have access.
  // Wait, service role key doesn't allow information_schema directly from client unless exposed.
  // Let's try selecting 1 row from products to see columns.
  const { data: pData, error: pError } = await supabase.from('products').select('*').limit(1);
  console.log("Products data:", pData);
  console.log("Products error:", pError);
}
run();
