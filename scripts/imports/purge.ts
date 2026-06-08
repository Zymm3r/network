import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabaseUrlValid = SUPABASE_URL.startsWith("http");
const hasServiceKey = SUPABASE_SERVICE_ROLE_KEY.length > 0;

if (!supabaseUrlValid || !hasServiceKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Cannot proceed with DB operations.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  console.log("Starting data purge...");

  const tables = [
    'training_lessons',
    'training_courses',
    'troubleshooting_guides',
    'faqs',
    'documents',
    'products'
  ];

  for (const table of tables) {
    console.log(`Purging table: ${table}`);
    const { error } = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) {
      console.error(`Failed to purge ${table}:`, error.message);
    } else {
      console.log(`Successfully purged ${table}`);
    }
  }
  
  console.log("Purge completed!");
}

run().catch((err) => {
  console.error("Fatal error during purge:", err);
  process.exit(1);
});
