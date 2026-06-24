import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  const { count, error } = await supabase.from('products').select('*', { count: 'exact', head: true });
  console.log("Products count:", count);
  console.log("Products error:", error);
  
  const { count: dCount } = await supabase.from('documents').select('*', { count: 'exact', head: true });
  console.log("documents count:", dCount);
  
  const { count: fCount } = await supabase.from('faqs').select('*', { count: 'exact', head: true });
  console.log("faqs count:", fCount);
}
run();
