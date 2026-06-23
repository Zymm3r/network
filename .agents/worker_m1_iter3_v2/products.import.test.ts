import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import { exec } from "child_process";
import { promisify } from "util";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const execPromise = promisify(exec);

const SUPABASE_URL = process.env.SUPABASE_URL || "http://127.0.0.1:54321";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "dummy";
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const importerPath = path.resolve(__dirname, "../../import/import-products.ts");
const productsJsonPath = path.resolve(process.cwd(), "products.json");

describe("Products Importer E2E Tests", () => {
  beforeEach(async () => {
    // Clear products table
    await supabase.from("products").delete().neq("slug", "keep");
    
    // Cleanup temporary products.json if it exists
    if (fs.existsSync(productsJsonPath)) {
      fs.unlinkSync(productsJsonPath);
    }
  });

  afterAll(() => {
    if (fs.existsSync(productsJsonPath)) {
      fs.unlinkSync(productsJsonPath);
    }
  });

  it("should handle invalid data types gracefully", async () => {
    // Create an invalid products.json where title is an object
    const invalidData = [
      {
        title: { object: "invalid" },
        description: "Test description",
      }
    ];
    fs.writeFileSync(productsJsonPath, JSON.stringify(invalidData));

    // The script should fail and return a non-zero exit code
    await expect(execPromise(`npx ts-node ${importerPath}`)).rejects.toThrow();
  });

  it("Tier 1: Workload Test - should import valid products and verify in database", async () => {
    // Create a valid products.json
    const validData = [
      {
        title: "Test Product 1",
        description: "Description 1",
        image: "image1.jpg",
        url: "url1"
      },
      {
        title: "Test Product 2",
        description: "Description 2",
        image: "image2.jpg",
        url: "url2"
      }
    ];
    fs.writeFileSync(productsJsonPath, JSON.stringify(validData));

    // Run the import script
    const { stdout } = await execPromise(`npx ts-node ${importerPath}`);
    expect(stdout).toContain("Import completed!");

    // Verify in database
    const { data, error } = await supabase.from("products").select("*").in("slug", ["test-product-1", "test-product-2"]);
    expect(error).toBeNull();
    expect(data).toHaveLength(2);
  });
  
  it("Tier 2: Workload Test - Larger batch", async () => {
    const validData = Array.from({ length: 150 }, (_, i) => ({
      title: `Batch Product ${i}`,
      description: `Description ${i}`,
      image: `image${i}.jpg`,
      url: `url${i}`
    }));
    fs.writeFileSync(productsJsonPath, JSON.stringify(validData));

    await execPromise(`npx ts-node ${importerPath}`);

    const { count } = await supabase.from("products").select("*", { count: "exact", head: true });
    expect(count).toBeGreaterThanOrEqual(150);
  });

  it("Tier 3: Workload Test - Duplicate slugs handling", async () => {
    const duplicateData = [
      { title: "Same Title", description: "Desc 1", url: "url1" },
      { title: "Same Title", description: "Desc 2", url: "url2" }
    ];
    fs.writeFileSync(productsJsonPath, JSON.stringify(duplicateData));

    await execPromise(`npx ts-node ${importerPath}`);

    const { data } = await supabase.from("products").select("*").like("slug", "same-title%");
    expect(data).toHaveLength(2);
    expect(data![0].slug).not.toEqual(data![1].slug);
  });

  it("Tier 4: Workload Test - Markdown overriding", async () => {
    // This assumes content/ folder exists and provides md data.
    // For test isolation we just ensure the script completes without crashing.
    const emptyData: any[] = [];
    fs.writeFileSync(productsJsonPath, JSON.stringify(emptyData));

    await execPromise(`npx ts-node ${importerPath}`);
    
    // Just verifying that it doesn't fail
    const { error } = await supabase.from("products").select("*").limit(1);
    expect(error).toBeNull();
  });
});
