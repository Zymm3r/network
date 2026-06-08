import fs from "fs";
import path from "path";
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
  console.log("Starting FAQs Importer...");
  
  const jsonPath = path.resolve(process.cwd(), "src/app/data/faqs.json");
  if (!fs.existsSync(jsonPath)) {
    console.log(`No real data found at ${jsonPath}. Exiting gracefully.`);
    return;
  }
  
  const rawData = fs.readFileSync(jsonPath, "utf8");
  const data = JSON.parse(rawData);
  if (!data || data.length === 0) {
    console.log(`No real data entries found in ${jsonPath}. Exiting gracefully.`);
    return;
  }
  
  console.log(`Found ${data.length} FAQs. Inserting into Supabase...`);
  const { error } = await supabase.from('faqs').upsert(data);
  if (error) {
    console.error("Error inserting data:", error.message);
    process.exit(1);
  }
  console.log("Successfully imported FAQs.");
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
