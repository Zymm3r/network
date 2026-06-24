# Handoff Report — explorer_m1_2

## 1. Observation
- **Core database bilingual pattern**: In `recreate_schema_and_policies.sql`, core tables use `_th` and `_en` suffixes for multilingual columns. Specifically:
  - Line 16: `name_th TEXT NOT NULL,`
  - Line 17: `name_en TEXT NOT NULL,`
  - Line 18: `description_th TEXT,`
  - Line 19: `description_en TEXT,`
  - Line 85: `title_th TEXT NOT NULL,`
  - Line 86: `title_en TEXT NOT NULL,`
- **Frontend consumption pattern**: Language condition checks are used in components like `src/app/components/course/CourseCard.tsx` (Line 16):
  ```typescript
  const name = language === 'th' ? course.name_th : course.name_en;
  ```
- **Equipment hooks queries**: In `src/features/equipment/hooks/useProductDetail.ts`, Supabase tables are queried using open-ended star selects:
  - Line 52-55:
    ```typescript
    const { data: dbProduct, error: dbProductError } = await supabase
      .from('products')
      .select('*')
      .eq('slug', canonicalSlug)
      .maybeSingle();
    ```
  - Lines 84-87:
    ```typescript
    supabase.from('documents').select('*').eq('product_id', productId),
    supabase.from('faqs').select('*').eq('product_id', productId),
    supabase.from('troubleshooting_guides').select('*').eq('product_id', productId),
    supabase.from('training_courses').select('*, training_lessons(*)').eq('product_id', productId)
    ```
- **RLS policies**: In `supabase/migrations/20260609000000_fix_rls_and_m4_analytics.sql`, policies use `USING (true)` for SELECT queries, e.g. Line 67:
  ```sql
  CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);
  ```
- **TypeScript models**: In `src/features/equipment/types/product.ts`, types are single-language (e.g. `Product` has `name`, `description`, `content`, but no suffix columns).

---

## 2. Logic Chain
1. Core tables (courses, resources, lessons, etc.) in `recreate_schema_and_policies.sql` follow a strict `*_th` / `*_en` suffix naming convention for bilingual fields. The equipment-domain tables should match this pattern for architectural consistency.
2. Custom hooks in `useProductDetail.ts` fetch columns using `select('*')` and nested `select('*, training_lessons(*)')`. Therefore, any newly added columns in the database will automatically be loaded and populated in the hook's query responses without SQL edits.
3. Adding new columns is safe with respect to Row Level Security (RLS) because existing SELECT policies are configured with `USING (true)` and do not bind to specific column values.
4. By querying `useI18n()` inside `useProductDetail.ts`, we can dynamically map the database fields (e.g., `name_th` vs `name_en` with fallback to `name`) into the standard properties (`name`, `description`, etc.) on the returned data. This protects the frontend components from needing changes to their attribute accessors.

---

## 3. Caveats
- `useProducts.ts` loads static product metadata from a local JSON file (`products.json`). While it can map fields using `useI18n()`, it will only reflect bilingual content if the static JSON is updated to include those fields, or if `useProducts.ts` is rewritten to query the Supabase `products` database table.
- Non-text columns (like categories, URLs, difficulty badges) are not translatable and remain unchanged.

---

## 4. Conclusion
We can implement bilingual content support (R2) for the equipment catalog by executing the proposed SQL migration to add `*_th` and `*_en` columns to `products`, `documents`, `faqs`, `troubleshooting_guides`, `training_courses`, and `training_lessons`.
We must update the TypeScript interfaces in `src/features/equipment/types/product.ts` to type the new fields, and modify `src/features/equipment/hooks/useProductDetail.ts` to map columns into standard properties using the active language from `useI18n()`.

---

## 5. Verification Method
- **Database schema validation**: Verify schema addition by checking table columns in Postgres:
  ```sql
  SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'products' AND column_name IN ('name_th', 'name_en');
  ```
- **Component verification**: Inspect `src/features/equipment/hooks/useProductDetail.ts` and ensure it maps `data.product.name` and other text fields dynamically based on the active language.
- **Frontend test**: Run E2E tests or test locally by switching language in the UI header and ensuring product overview, documents, FAQs, troubleshooting guides, and training lessons translate correctly.
