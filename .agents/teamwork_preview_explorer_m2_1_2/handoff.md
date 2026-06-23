# Handoff Report

## Observation
1. **Schema (`products` table)**: Executed tests against Supabase via `psql`/`tsx` scripts and verified that `products` table **already contains** `category_id` and `source_url` columns. However, the `products` table and its dependencies (`categories`, `documents`, `faqs`, `troubleshooting_guides`, `training_courses`, `training_lessons`) are missing from `supabase/migrations/` (likely created directly in the remote DB).
2. **Data Purge**: Verified the tables (`documents`, `faqs`, etc.) currently have 0 rows. 
3. **Pipeline (`import-products.ts`)**: Running `npx tsx src/import/import-products.ts` fails with a `42501` RLS violation (`new row violates row-level security policy for table "products"`). The script initializes the Supabase client using `VITE_SUPABASE_ANON_KEY` as a fallback for `SUPABASE_SERVICE_ROLE_KEY`. Since anon key has RLS enforced, inserts fail.
4. **Other Import Scripts**: `import-documents.ts`, `import-faqs.ts`, `import-training.ts`, `import-troubleshooting.ts` all generate mock data by calling `products.flatMap(...)` and assign a new `crypto.randomUUID()` to every mock item.

## Logic Chain
1. **Schema**: Since `category_id` and `source_url` already exist in the remote DB, no direct schema alteration via Supabase Dashboard is required. However, the local migrations folder is out-of-sync. 
2. **Pipeline Fix**: The script `import-products.ts` logic already handles `category_id` mapping and `source_url`. It fails purely due to Auth/RLS. The fix is to strictly use `process.env.SUPABASE_SERVICE_ROLE_KEY`. If missing, the script should skip the `createClient` step and fall back to its "Mocking upsert" path.
3. **Disable Mock Data**: The other `import-*.ts` scripts generate mock items with random UUIDs. To disable this, we can remove the mock data logic in `flatMap` and replace it with `[]` (or skip processing) if real data is unavailable.
4. **Data Purge**: The easiest and most robust way to purge mock data is via a new `src/import/purge.ts` script using the service role key to execute `delete().neq('id', '00000000-0000-0000-0000-000000000000')` on the mock tables, or to add a raw SQL migration to `TRUNCATE` them.

## Caveats
- The remote Supabase instance has tables that do not exist in the local `supabase/migrations` folder. I recommend the implementer pulls the schema using `supabase db pull` or at least ignores it since we only need to fix the scripts.
- The `categories` table is also empty locally, so `category_id` will fall back to `null` in `import-products.ts`. This is expected if the DB has no categories.

## Conclusion
- **Scope 1**: The `products` schema is already correct remotely (`category_id` and `source_url` exist). No further migration required for these columns.
- **Scope 2**: Create `src/import/purge.ts` using `@supabase/supabase-js` to `delete()` all rows in `documents`, `faqs`, `troubleshooting_guides`, `training_courses`, `training_lessons`.
- **Scope 3**: Update `src/import/import-products.ts` to remove the fallback to `VITE_SUPABASE_ANON_KEY`. Let it use `SUPABASE_SERVICE_ROLE_KEY` strictly.
- **Scope 4**: Update other `import-*.ts` scripts to empty out their `flatMap` mock generation and process 0 items gracefully.

## Verification Method
- **Pipeline**: Run `npx tsx src/import/import-products.ts`. It should exit gracefully with "No valid Supabase configuration. Mocking upsert..." when no service key is present, avoiding the RLS error.
- **Mock Data Disabled**: Run `npx tsx src/import/import-faqs.ts` (and others). They should print `Upserted FAQs 0 to 0` or exit gracefully.
