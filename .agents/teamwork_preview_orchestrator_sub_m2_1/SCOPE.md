# Scope: Milestone 2: Data Purge & Pipeline Development

## Architecture
- `src/import/purge.ts` or SQL scripts to clear existing mock data from `documents`, `faqs`, `troubleshooting_guides`, `training_courses`, `training_lessons`.
- `src/import/import-products.ts` correctly parses `src/app/data/products.json`, assigns `category_id` (UUID mapping), adds `source_url`, and processes without errors.
- Other `src/import/import-*.ts` scripts must stop generating or using mock data (exit gracefully/process 0 items if no real data).
- Supabase `products` table needs schema fix to ensure `category_id` (UUID) and `source_url` (TEXT) columns exist. Migration/SQL script required if missing.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M2 Iteration | Purge mock data, fix schema for `products`, update import scripts | none | DONE |

## Interface Contracts
- None currently specified between new modules. Scripts operate directly on the database via Supabase client.
