# Scope: M1: Python Execution & Resource Management

## Architecture
- **Execution**: `src/lib/pythonWorker.ts` runs code via Pyodide in a Web Worker. `src/hooks/usePython.ts` manages the Web Worker lifecycle. `src/app/components/ExerciseCard.tsx` provides the UI.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | M1: Python Execution & Resource Management | Refactor `usePython.ts`, `ExerciseCard.tsx` and `pythonWorker.ts` for lazy loading, stdout cap, and advanced evaluation (`eval` fallback to `exec`). | none        | DONE |

## Interface Contracts
### `usePython.ts` ↔ `pythonWorker.ts`
- Worker needs to accept run requests, handle timeout without crashing, and return either success/stdout, return values, or stdout truncation errors.
