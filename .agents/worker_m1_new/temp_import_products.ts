import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import slugify from "slugify";
import matter from "gray-matter";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const supabaseUrlValid = SUPABASE_URL.startsWith("http");

const supabase = supabaseUrlValid 
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  : null;

interface ProductRecord {
  name: string;
  slug: string;
  category: string;
  description: string;
  image_url: string;
  source_url: string;
}

const productsMap = new Map<string, ProductRecord>();

function generateSlug(text: string): string {
  return slugify(text, { lower: true, strict: true, locale: 'th' });
}

function processJson() {
  const jsonPath = path.resolve(process.cwd(), "products.json");
  if (!fs.existsSync(jsonPath)) {
    console.warn("products.json not found at", jsonPath);
    return;
  }
  
  const data = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  for (const item of data) {
    if (!item.title) continue;
    
    let description = item.description || "";
    if (description === "สอบเพิ่มเติม ที่ Line@ ID:@utechphuket") {
      description = "";
    }

    const record: ProductRecord = {
      name: item.title,
      slug: generateSlug(item.title),
      category: "products",
      description: description,
      image_url: item.image || "",
      source_url: item.url || ""
    };
    
    if (record.source_url) {
      productsMap.set(record.source_url, record);
    } else {
      productsMap.set(record.name, record);
    }
  }
}

function walkDir(dir: string, callback: (filepath: string) => void) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walkDir(filepath, callback);
    } else if (file.endsWith(".md")) {
      callback(filepath);
    }
  }
}

function processMarkdown() {
  const contentDir = path.resolve(process.cwd(), "content");
  walkDir(contentDir, (filepath) => {
    const raw = fs.readFileSync(filepath, "utf8");
    const parsed = matter(raw);
    
    const data = parsed.data;
    if (!data.title) return;
    
    // Process only files categorized as products, or located in products dir
    if (data.category !== "products" && !filepath.includes("products")) {
      return;
    }
    
    const source_url = data.url || "";
    
    // Extract first image from markdown
    const imageMatch = parsed.content.match(/!\[.*?\]\((.*?)\)/);
    let image_url = imageMatch ? imageMatch[1] : "";
    
    // Clean image url (remove dimensions query params if present)
    if (image_url && image_url.includes("?")) {
      image_url = image_url.split("?")[0];
    }
    
    // Clean description: grab first informative text paragraph
    let description = "";
    const lines = parsed.content.split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (
        trimmed && 
        !trimmed.startsWith("!") && 
        !trimmed.startsWith("[") && 
        !trimmed.startsWith("#") && 
        !trimmed.startsWith("-") && 
        trimmed !== data.title && 
        !trimmed.includes("สินค้าแนะนำ") && 
        !trimmed.includes("สอบเพิ่มเติม")
      ) {
        description = trimmed;
        break;
      }
    }
    
    const record: ProductRecord = {
      name: data.title,
      slug: generateSlug(data.title),
      category: data.category || "products",
      description: description.slice(0, 500),
      image_url: image_url,
      source_url: source_url
    };
    
    // Merge or overwrite based on source_url or name
    const key = record.source_url || record.name;
    if (productsMap.has(key)) {
      const existing = productsMap.get(key)!;
      // Prefer JSON data but supplement with MD
      if (!existing.image_url && record.image_url) existing.image_url = record.image_url;
      if (!existing.description && record.description) existing.description = record.description;
      if (record.category && record.category !== "products") existing.category = record.category;
    } else {
      productsMap.set(key, record);
    }
  });
}

async function run() {
  console.log("Starting Products Importer...");
  
  processJson();
  console.log(`Loaded ${productsMap.size} products from JSON`);
  
  const sizeBefore = productsMap.size;
  processMarkdown();
  console.log(`Loaded ${productsMap.size - sizeBefore} new products from Markdown`);
  
  // Sort keys to ensure deterministic iteration order
  const sortedKeys = Array.from(productsMap.keys()).sort();
  const records = sortedKeys.map(key => productsMap.get(key)!);
  
  // Dedup slugs deterministically
  const slugCounts = new Map<string, number>();
  for (const record of records) {
    let slug = record.slug;
    if (!slug) {
        slug = "product";
    }
    if (slugCounts.has(slug)) {
      const count = slugCounts.get(slug)! + 1;
      slugCounts.set(slug, count);
      record.slug = `${slug}-${count}`;
    } else {
      slugCounts.set(slug, 1);
      record.slug = slug;
    }
  }

  console.log(`Total products to upsert: ${records.length}`);
  
  if (!supabaseUrlValid || !supabase) {
    console.log("No valid Supabase configuration. Mocking upsert...");
    console.log("Sample records:", records.slice(0, 2));
    console.log("Done!");
    return;
  }
  
  console.log("Upserting to Supabase...");
  // Bulk upsert in batches
  const BATCH_SIZE = 100;
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE);
    
    const { data, error } = await supabase
      .from('products')
      .upsert(batch, { onConflict: 'slug' });
      
    if (error) {
      console.error(`Error upserting batch ${i}:`, error.message);
    } else {
      console.log(`Upserted batch ${i} to ${i + batch.length}`);
    }
  }
  
  console.log("Import completed!");
}

run().catch(console.error);
