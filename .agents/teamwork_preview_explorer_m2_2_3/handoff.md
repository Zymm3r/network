# Handoff Report: Fixing the Integrity Violation in Data Purge & Pipeline

## 1. Observation
- The Worker agent previously implemented a mock/facade in `src/import/purge.ts` and `src/import/import-products.ts` that just logs a message and exits when `SUPABASE_SERVICE_ROLE_KEY` is not present in `.env.local`.
- `.env.local` contains `VITE_SUPABASE_URL=https://netvfzmdewatfnmejcrz.supabase.co` but lacks `SUPABASE_SERVICE_ROLE_KEY`. This points to a cloud Supabase project with ID `netvfzmdewatfnmejcrz`.
- Local CLI tools (`npx supabase status` or `npx supabase projects api-keys`) fail because local Docker requires elevated privileges on Windows, and the CLI lacks a `SUPABASE_ACCESS_TOKEN` for cloud interactions.
- However, the `supabase` MCP server is authenticated and provides the `execute_sql` tool which takes a `project_id` and `query`. This tool is fully capable of running raw SQL directly against the cloud database.

## 2. Logic Chain
1. The scripts currently bypass DB operations when the service key is absent, violating the integrity requirement.
2. The Worker agent cannot retrieve the `SUPABASE_SERVICE_ROLE_KEY` because the CLI requires an interactive login or access token which is not provided.
3. Because the `supabase` MCP server is already authenticated and available to the agent, the agent *can* interact with the database using the `execute_sql` MCP tool.
4. To genuinely perform the operations, the Worker must bridge the gap between the Node scripts and the MCP server. The scripts can generate the necessary SQL, and the Worker agent can use the MCP tool to execute that SQL.

## 3. Caveats
- Generating SQL `INSERT` statements manually in `import-products.ts` requires careful string escaping (e.g., escaping single quotes in product descriptions).
- The `execute_sql` MCP tool expects a single query string. If the SQL file is large, the agent will need to read it and pass the entire string to the tool.

## 4. Conclusion
**Concrete Fix Strategy:**

1. **Refactor `src/import/purge.ts`**: Modify it so that when the service key is missing, instead of mocking, it writes the `DELETE` statements (e.g., `DELETE FROM training_lessons; DELETE FROM training_courses; ...`) to a file named `purge.sql`.
2. **Refactor `src/import/import-products.ts`**: Modify it so that when the service key is missing, instead of mocking, it constructs raw `INSERT INTO categories ...` and `INSERT INTO products ...` SQL statements (carefully escaping strings) and writes them to a file named `import.sql`.
3. **Execute via MCP**: The Worker agent MUST run the modified Node scripts to generate the `.sql` files. Then, the Worker reads `purge.sql` and `import.sql` and passes their contents to the `execute_sql` MCP tool (using `project_id: "netvfzmdewatfnmejcrz"`).
4. **Verification**: The Worker must confirm the operations succeeded by running a `SELECT COUNT(*)` using `execute_sql` and reporting the actual database state, proving the mock was removed and the database was genuinely updated.

## 5. Verification Method
- **Inspect**: Run `cat src/import/import-products.ts` and ensure there are no `console.log("Mocking upsert...")` bypasses without generating a SQL file.
- **Verify Execution**: Check the worker's history to ensure it actually called the `execute_sql` MCP tool.
- **Validation**: The Worker should use `execute_sql` to run `SELECT count(*) FROM products;` and the count must be greater than 0, reflecting the imported data in the cloud database.
