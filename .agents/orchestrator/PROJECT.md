# Project: Python Execution & Supabase Integration

## Architecture
- **Execution**: `src/lib/pythonWorker.ts` runs code via Pyodide in a Web Worker. `src/hooks/usePython.ts` manages the Web Worker lifecycle. `src/app/components/ExerciseCard.tsx` provides the UI.
- **Analytics**: Uses `src/lib/supabase.ts` (or `src/app/lib/supabase.ts`) to communicate with the Supabase backend.
- **Data Flow**: `ExerciseCard` -> runs code -> evaluates -> if passed, submits result to Supabase.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Python Execution & Resource Management | Refactor `usePython.ts`, `ExerciseCard.tsx` and `pythonWorker.ts` for lazy loading, stdout cap, and advanced evaluation (`eval` fallback to `exec`). | none        | DONE    |
| 2 | M2: Supabase Persistence | Integrate Supabase saving of exercise attempts, pass/fail, score, timestamps. Ensure graceful network error handling in `ExerciseCard.tsx` or related hook. | none | IN_PROGRESS    |

## Interface Contracts
### `usePython.ts` ↔ `pythonWorker.ts`
- Worker needs to accept run requests, handle timeout without crashing, and return either success/stdout, return values, or stdout truncation errors.

### `ExerciseCard.tsx` ↔ Supabase
- Must interact with Supabase table to record attempts without freezing UI.

## Code Layout
- `src/lib/pythonWorker.ts`: Python Web Worker
- `src/hooks/usePython.ts`: Web Worker React hook
- `src/app/components/ExerciseCard.tsx`: UI Component
- `src/lib/supabase.ts`: Supabase client
