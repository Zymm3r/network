## 2026-06-08T02:10:19Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Populate the Supabase Knowledge Base and Equipment Catalog with real source data from local files, replacing all mocked data. The process includes locating source files, building an import pipeline, fixing schema mappings, and validating the final database state.

Working directory: `C:\Users\UTHtest\Downloads\app.hotel`
Integrity mode: development

## Requirements

### R1. Source Content Inventory
- Locate all real source materials (markdown, manuals, PDFs, website crawls, products.json, Firecrawl/Crawl4AI exports) within the repository, specifically restricting the search to directories like `src/data`, `src/content`, or `supabase/data`.
- Produce an inventory report detailing file locations, content types, product counts, and estimated counts for FAQs, documents, and training materials.
- Do NOT generate or use mock data.

### R2. Data Purge & Import Pipeline Development
- Clear out existing mock data from the `documents`, `faqs`, `troubleshooting_guides`, `training_courses`, and `training_lessons` tables before importing.
- Build or update import scripts for `products`, `documents`, `faqs`, `troubleshooting_guides`, `training_courses`, and `training_lessons`.
- Fix existing schema mismatches (e.g., `category` to `category_id`, adding `source_url` column, properly mapping `content`).

### R3. Data Ingestion & Audit
- Execute the import scripts using a safe upsert approach.
- Produce a final audit report with row counts, completeness percentages, missing products, and missing KB content.

## Acceptance Criteria

### Execution & Verification
- [ ] An inventory report is generated showing exactly where real data was found in the specified data directories.
- [ ] Existing mock data is truncated/deleted before new real data is inserted.
- [ ] Import scripts successfully execute without errors and without using mock data.
- [ ] `category_id` correctly maps to UUIDs instead of strings.
- [ ] The `products` table has a valid `source_url` column populated from the real data.
- [ ] A final audit report is produced showing >0 row counts for KB tables (if real data exists), entirely sourced from real files.
