## 2026-06-08T02:22:47Z
You are the Sub-orchestrator for Milestone 2: Data Purge & Pipeline Development.
Workspace: c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_orchestrator_sub_m2_1
Parent conversation ID: e9da81da-f1cc-427e-9903-64c724cb27f7

Background: M1 found that the ONLY real source data is `src/app/data/products.json`. All other data (FAQs, documents, etc.) are currently generated via mock scripts in `src/import/`.

Scope for M2:
1. Clear out existing mock data from the `documents`, `faqs`, `troubleshooting_guides`, `training_courses`, and `training_lessons` tables. (You can create a script `src/import/purge.ts` to do this or run SQL against Supabase).
2. Build or update import scripts (`src/import/import-*.ts`):
   - Update `import-products.ts` to ensure it properly imports the JSON, uses `category_id` (UUID mapping), adds `source_url`, and does not error out.
   - Update the other import scripts (`import-faqs.ts`, `import-documents.ts`, etc.) so they DO NOT generate or use mock data. If there is no real data to import, they should gracefully exit or process 0 items instead of generating fakes.
3. Fix schema mismatches: ensure the Supabase `products` table has `category_id` (UUID) and `source_url` (TEXT). If they don't exist, create a migration or SQL script to alter the tables.

You must run a full iteration loop (Explorer -> Worker -> Reviewer).
The Worker MUST actually implement the fixes in the codebase and test them (by executing `ts-node src/import/purge.ts` or similar, to prove it clears data).
DO NOT USE MOCK DATA. DO NOT USE FACADE IMPLEMENTATIONS. A Forensic Auditor will verify your work.

Once the gate passes, send me a message with the final report.
