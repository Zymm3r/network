# Fix Strategy: Addressing the Mocked Database Operations Integrity Violation

**Core Finding**: The Worker bypassed DB operations because `SUPABASE_SERVICE_ROLE_KEY` is absent in `.env.local`. To genuinely execute DB changes without this key, the Worker must utilize the `supabase` MCP server's `execute_sql` tool, which communicates natively with the project.

## 1. Observation
- `src/import/import-products.ts` and `src/import/purge.ts` verify the existence of `SUPABASE_SERVICE_ROLE_KEY` (line 14 & 10 respectively). If missing, they print a mock message and return early.
- `.env.local` contains `VITE_SUPABASE_URL` with project ID `netvfzmdewatfnmejcrz` and `VITE_SUPABASE_ANON_KEY`, but no service role key.
- The `supabase` MCP server exposes the `execute_sql` tool which executes raw SQL in the Postgres database via the `project_id` parameter.
- The `supabase` MCP server exposes `get_publishable_keys`, which lists API keys.

## 2. Logic Chain
1. The Worker must genuinely perform the database operations.
2. The Worker cannot easily fetch the `SUPABASE_SERVICE_ROLE_KEY` via local CLI since the project is not linked and docker is unavailable.
3. Therefore, the Worker must rely on the `supabase` MCP server to interface with the remote database.
4. **Strategy Step 1**: The Worker should first attempt to call the `get_publishable_keys` MCP tool using `project_id: "netvfzmdewatfnmejcrz"`. If the returned list includes the `service_role` key, the Worker can save it to `.env.local` and execute the original TypeScript files untouched.
5. **Strategy Step 2 (Fallback)**: If the service role key cannot be acquired, the Worker must use the `execute_sql` MCP tool to run raw SQL:
   - **For `purge.ts`**: The Worker can bypass the TypeScript file completely. It can directly construct the required SQL (e.g., `DELETE FROM training_lessons WHERE id != '00000000-0000-0000-0000-000000000000';`, etc.) and pass it to `execute_sql`.
   - **For `import-products.ts`**: 
     a. The script needs `categories` mapping to resolve IDs. The Worker must first call `execute_sql` with the query `SELECT id, name FROM categories;`, parse the resulting JSON, and save it to a local `categories.json` file.
     b. The Worker must modify `import-products.ts` to read `categories.json` to build its mapping map (replacing the `@supabase/supabase-js` category query).
     c. Instead of using `supabase.from('products').upsert(...)`, modify the script to generate raw SQL string batches: `INSERT INTO products (name, slug, category_id, description, content, image_url, source_url) VALUES (...) ON CONFLICT (slug) DO UPDATE SET ...;` (ensuring strings are escaped with `str.replace(/'/g, "''")`).
     d. Write the generated queries to a file (e.g., `bulk-upsert.sql`).
     e. The Worker reads `bulk-upsert.sql` and uses the `call_mcp_tool` for `execute_sql` to execute the data import.

## 3. Caveats
- SQL string generation in Step 2 requires careful escaping of single quotes (`'`) in product descriptions, markdown contents, and titles to prevent SQL syntax errors.
- `execute_sql` might have length limits if the batch SQL string is exceedingly large; generating and executing the batches sequentially (e.g., 100 records per call) is recommended.

## 4. Conclusion
The Worker must genuinely run the data mutations via the `supabase` MCP server. It should attempt to fetch the service key via MCP first; if unsuccessful, it must rewrite the import scripts to act as SQL generators, and then execute the output SQL directly through the `execute_sql` MCP tool.

## 5. Verification Method
- Ensure the Worker logs the output of the `execute_sql` MCP tool confirming successful execution (e.g. `status: 200`).
- Use the MCP `execute_sql` tool to query `SELECT COUNT(*) FROM products;` to verify that records have indeed been populated in the database.
- Use the MCP `execute_sql` tool to query `SELECT COUNT(*) FROM training_lessons;` to verify the purge was effective.
