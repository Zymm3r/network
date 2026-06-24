# Handoff Report: Milestone 2 - Data Purge & Pipeline Development

## 1. Observation
- **Schema (`products` & others)**: Checked `supabase/migrations/` and `src/types/`. There are no migration files establishing the base schema for `products`, `documents`, `faqs`, `troubleshooting_guides`, `training_courses`, or `training_lessons`.
- **`import-products.ts`**: The script already implements parsing `url` from `src/app/data/products.json` into `source_url`. It also successfully maps the string `category` to `category_id` by querying the `categories` table and applying heuristics (`fallbackCategoryId` used if no match).
- **Mock Data Generation**: The scripts `src/import/import-documents.ts`, `import-faqs.ts`, `import-training.ts`, and `import-troubleshooting.ts` all currently fetch existing products and use a `.flatMap()` to generate mock data arrays (e.g. `title: \`คู่มือการใช้งาน ${p.name}\``) and then bulk upsert them.

## 2. Logic Chain
- **Scope 1 (Products schema fix)**: Since the base migration isn't tracked locally, the safest way to ensure `category_id` and `source_url` exist is to create a new incremental migration file using `ALTER TABLE public.products ADD COLUMN IF NOT EXISTS...`. 
- **Scope 2 (Purging mock data)**: The easiest and most thorough way to remove mock data from the specified tables is a `TRUNCATE` SQL statement. This ensures all auto-incrementing counters or cascades are cleanly reset.
- **Scope 3 (`import-products.ts`)**: Because `import-products.ts` already has the mapping logic written, the only reason it would fail is if the database is missing the required columns. Applying the SQL from Scope 1 satisfies the requirement.
- **Scope 4 (Disable mock generation)**: To stop mock generation and process 0 items, the `.flatMap()` logic in the other `import-*.ts` scripts needs to be removed. It should be replaced with a check that looks for a real data JSON file (e.g., `fs.existsSync()`); if absent, the script logs "No real data" and exits gracefully with code 0.

## 3. Caveats
- `training_lessons` is mentioned in the scope but only a `lessons` table exists in `20260518000001_create_missing_tables.sql` and `import-training.ts` only inserts into `training_courses`. Assumed the `TRUNCATE` script should include `training_lessons` just in case it exists.
- Assumed the `categories` table exists with an `id` UUID column as referenced by `import-products.ts`.
- No implementations were made as per the Read-only constraint.

## 4. Conclusion & Concrete Strategy
1. **Schema Update**: Create a new migration script `supabase/migrations/20260608000000_add_category_source_to_products.sql` with:
   ```sql
   ALTER TABLE public.products 
   ADD COLUMN IF NOT EXISTS category_id UUID REFERENCES public.categories(id),
   ADD COLUMN IF NOT EXISTS source_url TEXT;
   ```
2. **Purge Strategy**: Create `src/import/purge.ts` or a SQL script:
   ```sql
   TRUNCATE TABLE public.documents, public.faqs, public.troubleshooting_guides, public.training_courses, public.training_lessons CASCADE;
   ```
3. **Products Import**: No changes strictly needed in `src/import/import-products.ts` for mapping logic, it is already implemented correctly.
4. **Disable Mocks**: In `import-documents.ts`, `import-faqs.ts`, `import-training.ts`, and `import-troubleshooting.ts`, replace the `flatMap` data generation with:
   ```typescript
   import fs from 'fs';
   import path from 'path';
   
   const dataPath = path.resolve(process.cwd(), "src/app/data/documents.json"); // change per script
   if (!fs.existsSync(dataPath)) {
     console.log("No real data file found. Exiting gracefully.");
     return;
   }
   // ... parse JSON and upsert ...
   ```

## 5. Verification Method
- **Verify Schema**: Apply the SQL migration and run `supabase db psql -c "\d public.products"` to confirm `category_id` and `source_url` exist.
- **Verify Import**: Run `npx tsx src/import/import-products.ts`. It should process the 1200+ products and upsert them to Supabase without "column does not exist" errors.
- **Verify Graceful Exit**: Run `npx tsx src/import/import-documents.ts`. It should output "No real data file found. Exiting gracefully." and exit with code 0, without inserting any mock data into Supabase.
