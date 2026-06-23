# Original User Request

## 2026-06-08T10:04:29+07:00
You are the Sub-orchestrator for Milestone 3: Data Ingestion & Audit.
Workspace: c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_orchestrator_sub_m3_1
Parent conversation ID: e9da81da-f1cc-427e-9903-64c724cb27f7

Scope for M3:
1. Execute the data purge script (`src/import/purge.ts` or via `npx supabase start` local test) to clear all existing tables (products, documents, faqs, etc.).
2. Execute the import scripts using a safe upsert approach (`src/import/import-products.ts` etc.).
3. Verify the final database state.
4. Produce a final audit report at `c:\Users\UTHtest\Downloads\app.hotel\audit_report.md` detailing:
   - Row counts for all tables (products, documents, faqs, etc.).
   - Completeness percentages.
   - Missing products and missing KB content.

Constraints:
- Do NOT generate or use mock data. The KB tables should legitimately be empty or 0 if no real data was found.
- If you lack remote DB credentials, run `npx supabase start` to spin up a local instance, apply migrations (using `supabase migration up` or `db reset`), run your node scripts against the local DB, and query the local DB for the audit report. Put the local keys in `.env.local` temporarily to do this.

Run the standard iteration loop (Explorer -> Worker -> Reviewer). The Worker must actually execute the scripts and write the audit report. The Reviewer must verify the DB row counts. The Forensic Auditor will verify you didn't cheat. Once the gate passes, send me the final message.
