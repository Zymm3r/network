# BRIEFING — 2026-06-05T16:15:32+07:00

## Mission
Implement the Products Importer to parse products from JSON/Markdown and upsert them into Supabase.

## 🔒 My Identity
- Archetype: Teamwork agent
- Roles: implementer, qa, specialist
- Working directory: c:\Users\UTHtest\Downloads\app.hotel\.agents\worker_m1
- Original parent: d19e625e-7264-4399-a130-cd521a4df03d
- Milestone: [TBD]

## 🔒 Key Constraints
- DO NOT CHEAT. Genuine implementations only.
- Parse `src/app/data/products.json` (and any Markdown in `content/` or `src/content/`).
- Extract: `name`, `slug`, `category`, `description`, `image_url`, `source_url`.
- Deterministic slugs, avoid duplicates, upsert logic.
- Use `.env` variables `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
- Write `src/import/import-products.ts` and ensure it runs.
- Output `handoff.md` to `c:\Users\UTHtest\Downloads\app.hotel\.agents\worker_m1\handoff.md`.

## Current Parent
- Conversation ID: d19e625e-7264-4399-a130-cd521a4df03d
- Updated: not yet

## Task Summary
- **What to build**: Products importer script in TypeScript
- **Success criteria**: Script successfully parses data and upserts to Supabase, ts-node/tsx can execute it.
- **Interface contracts**: [TBD]
- **Code layout**: [TBD]

## Key Decisions Made
- [None yet]

## Artifact Index
- [TBD]
