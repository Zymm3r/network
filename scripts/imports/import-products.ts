import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import slugify from "slugify";
import matter from "gray-matter";

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

interface ProductRecord {
  name: string;
  slug: string;
  category: string;
  description: string;
  content: string;
  image_url: string;
  source_url: string;
}

const productsMap = new Map<string, ProductRecord>();

function generateSlug(text: string): string {
  return slugify(text, { lower: true, strict: true, locale: 'th' });
}

function processJson() {
  const jsonPath = path.resolve(process.cwd(), "src/app/data/products.json");
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
      content: "",
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
  const contentDir = path.resolve(process.cwd(), "src/content");
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
      content: parsed.content,
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
      if (!existing.content && record.content) existing.content = record.content;
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
  
  // Dedup slugs deterministically using Set
  const usedSlugs = new Set<string>();
  for (const record of records) {
    let baseSlug = record.slug || "product";
    let slug = baseSlug;
    let counter = 1;
    while (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    usedSlugs.add(slug);
    record.slug = slug;
  }

  console.log(`Total products to upsert: ${records.length}`);
  

  
  console.log("Fetching categories...");
  const { data: categories, error: catError } = await supabase.from('categories').select('id, name');
  if (catError) throw new Error(`Failed to fetch categories: ${catError.message}`);
  
  const categoryMap = new Map<string, string>();
  categories?.forEach(c => {
    // Map both exact name and lowercase name
    categoryMap.set(c.name, c.id);
    categoryMap.set(c.name.toLowerCase(), c.id);
  });
  
  // Default fallback category if "products" or similar isn't found
  const fallbackCategoryId = categories?.[0]?.id || null;

  console.log("Upserting to Supabase...");
  // Bulk upsert in batches
  const BATCH_SIZE = 100;
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = records.slice(i, i + BATCH_SIZE).map(record => {
      let catId = categoryMap.get(record.category) || categoryMap.get(record.category.toLowerCase());
      
      // Attempt heuristic matching for specific categories based on name
      if (!catId) {
        const title = record.name.toLowerCase();
        if (title.includes('camera') || title.includes('cctv') || title.includes('nvr') || title.includes('ds-')) catId = categoryMap.get('Surveillance') || categoryMap.get('surveillance');
        else if (title.includes('access point') || title.includes('switch') || title.includes('wi-fi')) catId = categoryMap.get('Networking') || categoryMap.get('networking');
        else if (title.includes('door') || title.includes('access control') || title.includes('hip') || title.includes('barrier') || title.includes('reader')) catId = categoryMap.get('Access Control') || categoryMap.get('access control');
        else if (title.includes('printer') || title.includes('pos')) catId = categoryMap.get('POS') || categoryMap.get('pos');
        else if (title.includes('hdd') || title.includes('seagate')) catId = categoryMap.get('Storage') || categoryMap.get('storage');
        else catId = categoryMap.get('Accessories') || categoryMap.get('accessories');
      }
      
      const { category, ...rest } = record;
      return {
        ...rest,
        category_id: catId || fallbackCategoryId,
        source_url: record.source_url || null
      };
    });
    
    const { data, error } = await supabase
      .from('products')
      .upsert(batch, { onConflict: 'slug' });
      
    if (error) {
      console.error(`Supabase insertion failed at batch ${i}:`, error.message);
      throw error;
    } else {
      console.log(`Upserted batch ${i} to ${i + batch.length}`);
    }
  }
  
  console.log("Import completed!");
}

run().catch((err) => {
  console.error("Fatal error during import:", err);
  process.exit(1);
});
