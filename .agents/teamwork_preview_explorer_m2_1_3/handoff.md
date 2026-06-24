# Handoff Report: Milestone 2, Explorer 3

## 1. Observation
- `src/import/import-products.ts` correctly reads `src/app/data/products.json`, parsing `url` as `source_url`. It iterates over products, matches `category` with the `categories` table via a heuristic approach, maps to a UUID, and expects `category_id` and `source_url` to exist in the `products` table.
- A search of local `.sql` files (`supabase/migrations`, `recreate_schema_and_policies.sql`, `src/app/data/seed.sql`) shows NO local `CREATE TABLE` statement for `products` or `categories`—these tables likely exist in the remote database but haven't been tracked locally.
- The mock data import scripts (`src/import/import-documents.ts`, `import-faqs.ts`, `import-training.ts`, `import-troubleshooting.ts`) generate UUIDs and insert mock items for every product. `training_lessons` is presumably mocked too (not fully checked but tables match). 

## 2. Logic Chain
- To safely execute `import-products.ts` without Supabase throwing errors, `category_id` (UUID, nullable) and `source_url` (TEXT) must be added to the `products` table.
- To purge existing mock data, the most straightforward and reliable approach is a SQL script executing a `TRUNCATE TABLE` on all mock tables, or creating a new `src/import/purge.ts` script that deletes all records using `.neq('id', 'some-dummy-uuid')`.
- To prevent future mock generation, the `import-*.ts` mock scripts should be modified to exit early (e.g. `return;`) with a graceful log message indicating that no real data exists.

## 3. Caveats
- Since the `products` and `categories` tables are not in the local migration files, the implementer will need to create a new SQL migration to alter the table structure. 
- `training_lessons` table wasn't directly found in the import scripts inspected but is known to exist based on the prompt. Purging it should follow the same pattern.
- If the `categories` table is entirely missing from Supabase, `import-products.ts` will throw an error on `select('id, name')`, which is outside this scope to fix unless `categories` is also created.

## 4. Conclusion
**Concrete Strategy:**
1. **Schema Fix**: Create a new migration file `supabase/migrations/20260608000000_add_product_fields.sql` with:
   ```sql
   ALTER TABLE IF EXISTS public.products 
   ADD COLUMN IF NOT EXISTS category_id UUID,
   ADD COLUMN IF NOT EXISTS source_url TEXT;
   ```
2. **Purge Mock Data**: Create `src/import/purge.ts` that initializes Supabase client and runs `.delete().neq('id', '00000000-0000-0000-0000-000000000000')` for tables `['documents', 'faqs', 'troubleshooting_guides', 'training_courses', 'training_lessons']`.
3. **Disable Mock Generation**: Update `import-documents.ts`, `import-faqs.ts`, `import-training.ts`, and `import-troubleshooting.ts` by removing mock data creation loops and simply returning at the start: `console.log("Mock data generation disabled."); return;`.
4. **Execution**: The pipeline would run `purge.ts`, followed by `import-products.ts`. `import-products.ts` is already correctly mapping `category_id` and `source_url`.

## 5. Verification Method
- **Schema**: Run the new migration against a local/remote Supabase instance and confirm `products` table has `category_id` and `source_url`.
- **Purge & Import**: Run `npx ts-node src/import/purge.ts` and `npx ts-node src/import/import-products.ts` and ensure neither script throws an error.
- **Disable Scripts**: Run `npx ts-node src/import/import-documents.ts` (and others) to verify they exit gracefully with exit code 0 and process 0 items.
