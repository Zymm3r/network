# Project Cleanup Audit Report
**Generated:** 2026-06-05  
**Purpose:** Identify and document all unused files, obsolete components, and dead code

---

## 📋 Executive Summary

This report identifies **32 files** that are no longer being used in the active codebase and are safe to remove. These files include:
- One-off database migration/audit scripts (21 files)
- Unused React hooks (4 files)
- Unused UI components (1 file)
- Obsolete documentation/notes (3 files)
- Legacy configuration shortcuts (1 file)
- Legacy data files (2 files)

**Total space to be freed:** Approximately 350+ KB

---

## ✂️ Category 1: Root-Level Temporary Scripts (21 files)

These are one-off Node.js/CLI scripts used for database migrations, testing, and auditing during development. **None are referenced in package.json scripts, vite config, or the build process.**

### Database Audit & Inspection Scripts
| File | Purpose | Safe to Delete |
|------|---------|---|
| `audit_remote.cjs` | Remote database audit script | ✅ YES |
| `audit_seed.cjs` | Seed data validation script | ✅ YES |

### Data Migration Scripts
| File | Purpose | Safe to Delete |
|------|---------|---|
| `backfill_44_lessons.cjs` | Backfill lessons table (completed) | ✅ YES |
| `backfill_full_urls.cjs` | URL format migration (completed) | ✅ YES |
| `execute_fixes_and_additions.cjs` | One-time data fixes (completed) | ✅ YES |
| `fix_seed.cjs` | Seed data fixes (completed) | ✅ YES |
| `generate_migration.cjs` | Migration generator (completed) | ✅ YES |
| `generate_picsum_migration.cjs` | Picsum image migration (completed) | ✅ YES |
| `reading_content.cjs` | Reading content population (completed) | ✅ YES |
| `researched_articles.cjs` | Article research script (completed) | ✅ YES |
| `update_durations.cjs` | Duration update migration (completed) | ✅ YES |
| `update_to_loremflickr.cjs` | Image host migration to LoremFlickr (completed) | ✅ YES |
| `update_to_picsum.cjs` | Image host migration to Picsum (completed) | ✅ YES |

### Development Testing Scripts
| File | Purpose | Safe to Delete |
|------|---------|---|
| `test-db.js` | Database connectivity test | ✅ YES |
| `test-schema.js` | Schema structure test | ✅ YES |
| `test-upsert.js` | Data upsert testing | ✅ YES |
| `test-upsert2.js` | Additional upsert test | ✅ YES |
| `debug-fetch.mjs` | API debugging script | ✅ YES |
| `yt-test.cjs` | YouTube API test | ✅ YES |
| `yt-test2.cjs` | YouTube API test (variant) | ✅ YES |
| `download_thumbnails.cjs` | Thumbnail download script (completed) | ✅ YES |

---

## 📦 Category 2: Unused TypeScript Components & Hooks (5 files)

These are React hooks and components that are defined but **never imported or used** in any active page, component, or hook.

### Unused Custom Hooks (in `src/app/hooks/`)
| File | Reason | Safe to Delete |
|------|--------|---|
| `useBookmarks.ts` | Exported in index.ts but never imported; no bookmarking feature implemented | ✅ YES |
| `useCertificates.ts` | Exported in index.ts but never imported; no certificate feature implemented | ✅ YES |
| `useExercises.ts` | Exported in index.ts but never imported; feature not yet implemented | ✅ YES |
| `useResources.ts` | Exported in index.ts but never imported; feature not yet implemented | ✅ YES |

### Unused UI Components (in `src/app/components/`)
| File | Reason | Safe to Delete |
|------|--------|---|
| `figma/ImageWithFallback.tsx` | Defined but never imported; duplicate fallback logic exists elsewhere | ✅ YES |

---

## 📄 Category 3: Obsolete Documentation (3 files)

| File | Content | Safe to Delete |
|------|---------|---|
| `what-was-the-last-lazy-creek.md` | Old migration notes from hotel app → education platform refactor | ✅ YES |
| `context.md` | Duplicate project context (preserved in codebase docs) | ✅ YES |
| `CLEANUP_REPORT.md` | Outdated cleanup report (replaced by this audit) | ✅ YES |

**Note:** Keep `ATTRIBUTIONS.md` (contains shadcn/ui and Unsplash licensing info)  
**Note:** Keep `README.md` (project documentation)  
**Note:** Keep `guidelines/Guidelines.md` (project guidelines)

---

## 🗑️ Category 4: Other Unused Files (2 files)

| File | Purpose | Safe to Delete |
|------|---------|---|
| `claude.lnk` | Windows shortcut to Claude folder (IDE convenience, not needed) | ✅ YES |
| `src/app/data/courseQuizData.ts` | Legacy quiz data (replaced by Supabase schema) | ⚠️ VERIFY |
| `src/app/data/lessonResources.ts` | Legacy resource data (replaced by Supabase schema) | ⚠️ VERIFY |

---

## ✅ Files to Keep

### Essential Configuration
- `.env.local` - Environment variables (should remain, ignore from git)
- `.mcp.json` - MCP server config
- `.agents/` - VS Code agent configuration
- `.claude/` - Claude IDE cache

### Essential Build & Development
- `package.json` - Dependencies and scripts
- `package-lock.json` - Dependency lock file
- `vite.config.ts` - Build configuration
- `postcss.config.mjs` - PostCSS configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `index.html` - HTML entry point

### Documentation to Keep
- `README.md` - Project documentation
- `ATTRIBUTIONS.md` - License attributions
- `guidelines/Guidelines.md` - Development guidelines

### SQL Migrations
- `supabase/migrations/*` - All migration files (essential for database schema)
- `recreate_schema_and_policies.sql` - Schema reference
- `src/app/data/seed.sql` - Database seed (keep as reference)

---

## 🎯 Recommended Deletion Order

**Phase 1 - Low Risk (21 files)**
Delete all root-level temporary scripts:
```
audit_remote.cjs, audit_seed.cjs, backfill_*.cjs, debug-fetch.mjs,
download_thumbnails.cjs, execute_fixes_and_additions.cjs, fix_seed.cjs,
generate_*.cjs, reading_content.cjs, researched_articles.cjs,
test-*.js, test-*.cjs, update_*.cjs, yt-test*.cjs, claude.lnk
```

**Phase 2 - Medium Risk (5 files) - REQUIRES VERIFICATION**
Delete unused TypeScript files only if no future features depend on them:
```
src/app/hooks/useBookmarks.ts
src/app/hooks/useCertificates.ts
src/app/hooks/useExercises.ts
src/app/hooks/useResources.ts
src/app/components/figma/ImageWithFallback.tsx
```

**Phase 3 - Low Risk (3 files)**
Delete obsolete documentation:
```
what-was-the-last-lazy-creek.md
context.md
CLEANUP_REPORT.md
```

**Phase 4 - HIGH CAUTION (2 files)**
Data files need verification before deletion:
```
src/app/data/courseQuizData.ts (verify no imports)
src/app/data/lessonResources.ts (verify no imports)
```

---

## 🔍 Verification Checklist

Before deleting any file, verify:
- [ ] File is not imported in any `.tsx` or `.ts` file
- [ ] File is not referenced in `package.json` scripts
- [ ] File is not part of the build configuration
- [ ] File is not required by Supabase migrations
- [ ] No future features depend on the file (check feature branches)
- [ ] File is not part of version control history (git)

---

## 📊 Expected Results After Cleanup

| Metric | Before | After | Savings |
|--------|--------|-------|---------|
| Root-level scripts | 25 | 4 | -21 files |
| Unused hooks | 4 | 0 | -4 files |
| Unused components | 1 | 0 | -1 file |
| Total files to remove | 32 | - | ~350KB |
| Project clarity | Cluttered | Clean | ✅ Improved |

---

## ⚠️ Important Notes

1. **Do NOT delete migration files** in `supabase/migrations/` - they define the database schema
2. **Do NOT delete `.env.local`** even though it's in .gitignore (environment config needed locally)
3. **Do NOT delete configuration files** (vite.config.ts, tailwind.config.js, etc.)
4. **Do NOT delete the `src/app/data/seed.sql`** file (database reference/backup)
5. **Backup recommended** before bulk deletion
6. **Git tracking**: These files can be permanently removed since git history is preserved

---

## 🚀 Next Steps

1. Run this cleanup to free project space
2. Update `hooks/index.ts` to remove exports of deleted hooks
3. Verify no broken imports after deletion
4. Commit changes with message: "chore: cleanup obsolete files and dead code"
5. Proceed with new learning content card/module development with clean project structure

---

**Report Status:** ✅ Ready for Execution  
**Generated by:** Cleanup Audit Tool  
**Date:** 2026-06-05
