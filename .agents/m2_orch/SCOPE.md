# Scope: M2: Supabase Persistence

## Architecture
- `ExerciseCard.tsx` provides the UI and runs code. Upon completion, it needs to save the attempt results.
- `src/lib/supabase.ts` or `src/app/lib/supabase.ts` provides the Supabase client.
- The updates must happen asynchronously so the UI does not freeze during slow network operations.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M2: Supabase Persistence | Save attempt, pass/fail status, score (xpEarned), execution timestamp, and completion progress to the appropriate Supabase tables without blocking UI. | none        | IN_PROGRESS    |

## Interface Contracts
### `ExerciseCard.tsx` ↔ Supabase
- Must record exercise attempts asynchronously. Network failures must not crash the `ExerciseCard` UI.
