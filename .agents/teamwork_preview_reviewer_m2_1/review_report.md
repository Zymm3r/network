# Quality & Adversarial Review Report - Milestone 2

## Review Summary

**Verdict**: REQUEST_CHANGES

The worker successfully completed the core requirements of database migration, types definitions, and fallback translations for products, documents, FAQs, and guides. However, critical column name mismatch bugs remain in `useGlobalSearch.ts` which cause database errors and break search functionality for courses and resources. Furthermore, the local JSON fallback mechanism in `useProducts.ts` lacks validation, causing runtime crashes if the local JSON contains invalid data format.

---

## Findings

### Critical Finding 1: Column name mismatch on `courses` table search

- **What**: In `useGlobalSearch.ts`, the search query against the `courses` table selects and queries `title_th` and `title_en` instead of `name_th` and `name_en`.
- **Where**: `src/app/hooks/useGlobalSearch.ts` (lines 81–97)
- **Why**: The database schema defines the `courses` table with `name_th` and `name_en` columns (not `title_th` or `title_en`). Querying non-existent columns causes Postgres to throw a `42703 (undefined_column)` error, breaking the global search functionality.
- **Suggestion**: Change the `courses` query in `useGlobalSearch.ts` to query `name_th` and `name_en` and filter by language similarly to `learning_paths`:
  ```typescript
  const searchField = language === 'th' ? 'name_th' : 'name_en';
  const { data: courses, error: coursesError } = await supabase
    .from('courses')
    .select('id, name_th, name_en')
    .ilike(searchField, `%${normalized}%`)
    .limit(10);
  ```

### Critical Finding 2: Column name mismatch on `resources` table search

- **What**: In `useGlobalSearch.ts`, the search query against the `resources` table selects and queries `title` instead of `name_th` and `name_en`.
- **Where**: `src/app/hooks/useGlobalSearch.ts` (lines 62–78)
- **Why**: The database schema defines the `resources` table with `name_th` and `name_en` columns (not `title`). Querying a non-existent column causes the query to throw a Postgres database error, failing the search.
- **Suggestion**: Change the `resources` query in `useGlobalSearch.ts` to select `id, name_th, name_en` and search the appropriate field based on language.

### Major Finding 3: Missing runtime validation on fallback `products.json`

- **What**: `useProducts.ts` lacks runtime type safety when parsing the fallback static JSON file `products.json`.
- **Where**: `src/features/equipment/hooks/useProducts.ts` (lines 51–66)
- **Why**: If the database query fails, the code falls back to `productsData`. If `productsData` is malformed (e.g. `p.title` is an object instead of a string, as in `{"title":{"object":"invalid"}}`), `slugify(name)` is called with an object argument. This causes a crash with `TypeError: slugify: string is expected` which prevents the catalog from rendering at all.
- **Suggestion**: Validate that `p.title` is a string before calling `slugify` or fallback to a default string identifier.

---

## Verified Claims

- **Migration is idempotent** → Verified via `supabase/migrations/20260623000000_add_bilingual_equipment_columns.sql` inspection → **PASS**
- **Types include bilingual fields** → Verified via `src/features/equipment/types/product.ts` inspection → **PASS**
- **`useI18n()` language switcher fallback logic for product details** → Verified via `useProductDetail.ts` code trace (correct fallback handling for null/empty values using falsy coalescing) → **PASS**
- **Search query bug resolved for `learning_paths`** → Verified via `useGlobalSearch.ts` (queries `name_th` or `name_en` depending on language) → **PASS**

---

## Coverage Gaps

- **E2E Test Coverage of Global Search** — risk level: **Medium** — The E2E tests do not cover global search scenarios, allowing critical query bugs to go unnoticed. Recommendation: Introduce basic E2E coverage for global search in the next milestone.

---

## Challenge Summary

**Overall risk assessment**: HIGH

---

## Challenges

### High Challenge 1: Fallback JSON parsing vulnerability

- **Assumption challenged**: The static JSON `products.json` is always correctly formatted and has strings for titles.
- **Attack scenario**: A test or a bad deployment contains a malformed JSON file where `title` is an object.
- **Blast radius**: The catalog hook `useProducts` fails at runtime and crashes the UI, showing a blank page or unhandled react crash instead of failing gracefully.
- **Mitigation**: Add a sanity check: `typeof name === 'string' ? slugify(name, ...) : 'unknown'`.

### High Challenge 2: Test environment mocking mismatch

- **Assumption challenged**: The mock routing in tests matches the implementation structure.
- **Attack scenario**: Tests navigate to `/equipment/1` and mock `**/rest/v1/equipment*`. However, the app queries `**/rest/v1/products*` and checks slugs against `products.json`.
- **Blast radius**: Almost all Playwright E2E tests fail and timeout because they trigger the "Product not found" error page, which doesn't contain the tabs and simulator elements the test expects.
- **Mitigation**: Align test mocks to intercept `**/rest/v1/products*` and use real product slugs from the catalog.

---

## Stress Test Results

- **Malformed JSON input** → Run app catalog in local fallback mode with invalid title object → `TypeError` thrown, app crashes → **FAIL**
- **English Search Input** → Perform search for English words in Thai lessons → Query matches only `title_th`, returns zero results → **FAIL**
