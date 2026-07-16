# Full Regression Audit Report — Persistent Exercise Progress System

**Date:** 2026-07-16  
**Auditor:** Senior QA Engineer + Senior Software Architect  
**Scope:** Complete Exercise Progress System  

---

## Overall Health Score: 28 / 100

**Verdict: ❌ NOT Production Ready**

The system has **1 CRITICAL data loss bug**, **4 HIGH-risk race conditions**, and **fundamental architectural flaws** in the unload/visibility persistence path that will cause silent data loss in production. The debounce system works for normal usage but fails under rapid input. Two-tab conflicts are entirely unhandled. The offline queue has silent data loss after 3 retries with no user notification.

---

## CRITICAL Issues

### C-1: All page unload/refresh/close saves silently fail — Data Loss
**Root Cause:** `useExerciseProgress.ts` lines 428-457 — `handleBeforeUnload` uses `fetch(url, { keepalive: true })` targeting `${window.location.origin}/api/exercise-progress` which is a **non-existent endpoint**. There is no route handler for this URL in the application. The `.catch(() => {})` silently swallows the 404 error.

```ts
// Line 432 — this URL does NOT exist in this app
const url = `${window.location.origin}/api/exercise-progress`;

fetch(url, {
  method: 'POST',
  keepalive: true,
  // ...
}).catch(() => {
  // Silent fail — offline queue never called
});
```

**Impact:** ALL progress data (answers, checkpoints, completion state) is silently lost when users:
- Close the browser tab
- Refresh the page
- Navigate away
- Hard refresh

The comment claims "offline queue will handle it" but `queueOfflineOperation` is NEVER called from this handler.

**Reproduction:**
1. Open any exercise
2. Start answering
3. Immediately close the tab
4. Reopen — all unsaved answers are lost

**Recommended Fix:**
- Remove the broken `fetch` to non-existent endpoint
- Use `navigator.sendBeacon()` with a properly configured POST endpoint OR
- Serialize to localStorage directly in `beforeunload` for the offline queue to pick up
- Call `exerciseProgressService['queueOfflineOperation']('upsert', saveData)` before page unload

**Estimated Risk:** 0.95 — Nearly every user session will encounter this.

---

### C-2: `flushPending` fails silently without queueing data — Data Loss
**Root Cause:** `useExerciseProgress.ts` lines 388-424 — When `flushPending` encounters a network error (catch block, line 413), it calls `exerciseProgressService['syncOfflineQueue'](saveData.user_id)` instead of `exerciseProgressService.queueOfflineOperation('upsert', saveData)`. The `syncOfflineQueue` method **processes existing queued items** but does NOT add `saveData` to the queue. The data that was supposed to be saved is simply lost because `pendingSaveRef.current` was already set to `null` (line 391).

```ts
// Line 391 — data reference is cleared
pendingSaveRef.current = null;

// ... save fails ...

// Line 417 — syncs existing queue but doesn't ADD saveData
await exerciseProgressService['syncOfflineQueue'](saveData.user_id);
// saveData is now orphaned — LOST
```

**Impact:** When `flushPending` is called (on tab hidden, pagehide, or manually) and the network is unavailable, the pending data is silently discarded.

**Reproduction:**
1. Answer an exercise question
2. Go offline
3. Wait for debounce timer to fire (2s) — save tries and queues to offline queue via `saveProgress` catch block
4. OR: Go offline and immediately hide tab — `flushPending` is called directly, bypassing `saveProgress`, and loses the data

**Recommended Fix:**
Replace line 417 with:
```ts
if (saveData.user_id) {
  await exerciseProgressService['queueOfflineOperation']('upsert', saveData as ExerciseProgressData);
}
```

**Estimated Risk:** 0.60 — Common on mobile when switching apps or losing signal.

---

### C-3: Rapid answers to different exercise inputs cause data loss — Stale Closure
**Root Cause:** `useExerciseProgress.ts` lines 248-268 — `updateAnswer` captures `progress?.answers` in the closure passed to `debouncedSave`. If the user rapidly answers multiple questions (e.g., Q1 then Q2) before React re-renders, both calls read the **same base `progress?.answers`** value. Q2's final save writes only its own answer, overwriting Q1's answer.

```ts
// Line 262 — captures progress?.answers at call time (stale if state hasn't updated)
debouncedSave({
  user_id: user.id,
  exercise_id: exerciseId,
  answers: { ...progress?.answers, [key]: value },  // Both Q1 and Q2 may read the same {}
});
```

**Impact:** If a user types answers to multiple fields rapidly (or has auto-graded multi-part exercises), earlier answers are silently lost.

**Reproduction:**
1. Open an exercise with multiple answer fields
2. Answer field 1
3. Immediately (within same JS event loop tick or before React re-render) answer field 2
4. Save fires with only field 2's data — field 1's answer is lost

**Recommended Fix:**
Use functional state update or accumulate in a ref:
```ts
const updateAnswer = useCallback((key: string, value: any) => {
  if (!user?.id || !exerciseId) return;
  
  // Use ref to maintain latest accumulated answers
  pendingAnswersRef.current = { ...pendingAnswersRef.current, [key]: value };
  
  setProgress(prev => {
    if (!prev) return prev;
    return { ...prev, answers: { ...prev.answers, [key]: value } };
  });

  debouncedSave({
    user_id: user.id,
    exercise_id: exerciseId,
    answers: { ...progress?.answers, ...pendingAnswersRef.current, [key]: value },
  });
}, [user?.id, exerciseId, debouncedSave]);
```

**Estimated Risk:** 0.45 — Common in multi-field coding exercises.

---

### C-4: Two-tab exercise editing causes write conflicts — Data Corruption
**Root Cause:** `ExerciseProgressService.saveProgress` uses UPSERT with the full data object. If two tabs load the same exercise:
- Tab A saves `{answers: {q1: "A"}}` 
- Tab B saves `{answers: {q2: "B"}}`

Each UPSERT writes its own complete `answers` object. The second UPSERT **completely replaces** the first tab's answers. There is no server-side merge of JSONB fields.

```ts
// ExerciseProgressService.ts line 96-98
.upsert(payload, {
  onConflict: 'user_id,exercise_id',
})
// The entire payload replaces the row — including answers
```

**Impact:** Users working on the same exercise in multiple tabs/windows lose answers from the tab that saves first.

**Reproduction:**
1. Open lesson in Tab A
2. Open same lesson in Tab B
3. Answer Q1 in Tab A (saves: answers={q1: "A"})
4. Answer Q2 in Tab B (saves: answers={q2: "B"})
5. Result: answers = {q2: "B"} — Q1 is lost

**Recommended Fix:**
- Implement server-side JSONB merge in a Postgres function called via RPC
- OR: Use granular answer saves (per-key) instead of full object replacement
- OR: Implement optimistic locking with a `version` field that increments on each write

**Estimated Risk:** 0.30 — Common in learning environments where students open multiple tabs.

---

### C-5: Pyodide worker event listeners leak on rapid execution — Memory Leak
**Root Cause:** `usePython.ts` lines 48-119 — Each call to `runPythonTests` adds a new `message` event listener via `addEventListener`. The listener is only removed AFTER the message is received (line 99). If the user clicks "Run" rapidly, multiple listeners accumulate, each attempting to resolve the same Promise.

```ts
// Lines 106-109 — NEW listener added every call
if (workerRef.current) {
  workerRef.current.addEventListener('message', handleMessage);
}
// Listener is removed only AFTER receiving response (line 97-104)
```

**Impact:** Memory leak (growing listener list), potential duplicate Promise resolution. If worker is terminated (e.g., timeout), old listeners for terminated executions remain attached to the NEW worker, causing cross-execution interference.

**Reproduction:**
1. Click "Run" rapidly 10+ times
2. Each call adds 2 event listeners (message + cleanup)
3. Listeners accumulate until execution completes (which may never happen if worker is terminated)

**Recommended Fix:**
```ts
// Before adding, remove previous listener if exists
if (workerRef.current) {
  workerRef.current.removeEventListener('message', handleMessage);
  workerRef.current.addEventListener('message', handleMessage);
}
```

**Estimated Risk:** 0.70 — Students commonly spam the Run button.

---

## HIGH Issues

### H-1: Debounced save failures orphan data permanently
**Root Cause:** `useExerciseProgress.ts` line 186 — When the debounced save fires and `saveProgress` fails:
```ts
const saveData = pendingSaveRef.current;
pendingSaveRef.current = null; // Data reference cleared
// saveProgress fails → error set but data is gone
```
The data was removed from `pendingSaveRef` before the save attempt completed. If the network is down during debounced save, the data is not queued for offline.

**Impact:** Intermittent network issues cause silent data loss during debounced saves.

**Reproduction:**
1. Answer a question
2. Go offline before the 2s debounce fires
3. Debounce fires → `saveProgress` fails → error logged → data lost (not queued)
4. Come back online — no data to sync

**Recommended Fix:** Only clear `pendingSaveRef.current` on successful save, or queue to offline on failure.

### H-2: `markCompleted` race condition on concurrent calls
**Root Cause:** `ExerciseProgressService.markCompleted` loads `existing` at the start of the call. Two simultaneous calls from different contexts both load the same initial state, and both increment `attempts` from the same base value:
```ts
attempts: metadata?.attempts ?? (existing?.attempts || 0) + 1,
```

**Impact:** Attempt count can be off by 1 on concurrent completions.

**Reproduction:** Trigger `markCompleted` simultaneously from two interactions (e.g., UI button + auto-complete effect).

### H-3: Stale YouTube progress polling callback
**Root Cause:** `KalturaPlayer.tsx` lines 350-393 — The `checkProgress` function is wrapped in `useCallback` but the `setInterval` is set up inside the effect which only depends on `[isLoaded, videoId]`. If `onComplete` or `onProgress` props change, the interval still calls the old `checkProgress` reference.

**Impact:** Video completion callbacks may not fire with current handler references.

### H-4: Worker error during execution causes permanent hang
**Root Cause:** `usePython.ts` — If the worker sends an error (not returning a proper message with matching `id`), or crashes silently, the Promise never resolves. The timeout is only set after receiving a 'start' message. If the worker crashes before sending 'start', no timeout is armed.

**Impact:** Execution UI freezes permanently. User cannot run code again without page refresh.

### H-5: No deduplication in offline queue
**Root Cause:** `ExerciseProgressService.queueOfflineOperation` always pushes a new item. The same exercise can have multiple queue items with overlapping data.

**Impact:** During sync, outdated intermediate states are applied after newer states (or fail and waste retry budget on superseded data).

### H-6: 3-retry limit silently drops data
**Root Cause:** `syncOfflineQueue` line 346-348: items with `retries >= 3` are silently dropped with no user notification.

**Impact:** After 3 sync failures, user data is permanently lost with no indication.

### H-7: `LessonDetail` re-renders entire tree on every 1-second tick
**Root Cause:** `LessonDetail` uses `useState` for `elapsedSeconds` with a `setInterval` updating every second. This causes the entire component tree (including `CheckpointRow`, rendering buttons, etc.) to re-render every second. `ReadingContentRenderer` is not memoized.

**Impact:** Unnecessary CPU usage. Battery drain on mobile.

---

## MEDIUM Issues

### M-1: `handleRun` stale closure on `attempts`
**Root Cause:** `ExerciseCard.tsx` line 294 — `attempts + 1` in `recordAttempt` captures potentially stale `attempts` value from the render in which `handleRun` was created (its dependency array includes `attempts` but the `setInterval` callback at line 315-392 may not be the latest).

### M-2: Error boundary recovery doesn't reset exercise state
**Root Cause:** `ExerciseErrorBoundary` "Try Again" button (line 87-90) only resets the boundary's internal state. The parent `ExerciseCard` still has stale state (isRunning, testResults, etc.)

### M-3: `markCompleted` comparison logic uses `>= now` incorrectly
**Root Cause:** `ExerciseProgressService.ts` line 237: `if (existing.completed_at && existing.completed_at >= now)` — comparing timestamp strings lexicographically works for ISO strings, but `now` is generated at the start of the function. If called twice within the same millisecond, the second call may proceed instead of short-circuiting.

### M-4: `Auth.user` dependency in useEffects causes re-runs on auth refresh
**Root Cause:** Multiple `useEffect` hooks depend on `user?.id` which changes during auth refresh (session token rotation). This can cause auto-restart of exercises and duplicate visibilitychange handlers.

### M-5: Dead code in `online` event handler signature conflict
**Root Cause:** `useExerciseProgress.ts` has `window.addEventListener('online', handleOnline)` at line 101 AND `useExerciseProgress.ts` (the old `useExerciseProgress.ts` hook at `app/hooks/`) also has the same pattern. Both are loaded in `ExerciseCard` via different hook imports.

### M-6: Existing `updateTimer` has unnecessary floating-point guard
**Root Cause:** `useExerciseProgress.ts` line 303: `if (Math.abs(...) < 1) return` — The timer updates as integers, so this guard is effectively dead code for integer inputs.

---

## LOW Issues

### L-1: No foreign key constraint on `exercise_id`
The `exercise_progress.exercise_id` column is `text NOT NULL` with no FK reference. Invalid exercise IDs can be inserted.

### L-2: React StrictMode double-mount could trigger duplicate auto-start
The `useEffect` for `autoStart` fires twice in StrictMode, potentially calling `markStarted` twice. The service handles this (checks existing status), but creates a redundant Supabase read.

### L-3: Offline localStorage storage is accessible to any JS on the origin
Standard web security concern. Acceptable given the app architecture, but should be noted.

### L-4: `setCode` from stale closure in ExerciseCard
The `handleShowSolution` (line 447) sets code but doesn't reset other state (attempts, runPhase).

---

## Phase 2 — Database Consistency Summary

| Check | Status | Notes |
|-------|--------|-------|
| One exercise → one row | ✅ | `UNIQUE (user_id, exercise_id)` constraint |
| UPSERT correct | ✅ | `onConflict: 'user_id,exercise_id'` matches constraint |
| Cannot create duplicates | ✅ | Unique constraint prevents |
| Indexes on user_activity | ✅ | `idx_exercise_progress_user_activity` |
| Indexes on lesson_id | ✅ | Partial index on non-null lesson_id |
| RLS enforced | ✅ | All three policies (SELECT/INSERT/UPDATE) use `auth.uid() = user_id` |
| Foreign key on user_id | ✅ | `REFERENCES auth.users(id) ON DELETE CASCADE` |
| Foreign key on exercise_id | ❌ | `text NOT NULL` without FK — acceptable for now |
| Timestamps (created_at, updated_at) | ✅ | `NOT NULL DEFAULT now()` with auto-trigger |
| completed_at nullable | ✅ | Only set when completed |
| progress_percentage CHECK | ✅ | `BETWEEN 0 AND 100` |
| started_at nullable | ✅ | Set on first markStarted |
| last_activity_at | ✅ | `NOT NULL DEFAULT now()` |

---

## Phase 4 — Offline Queue Summary

| Check | Status | Finding |
|-------|--------|---------|
| No duplicate items | ❌ | H-5: Duplicates accumulate |
| No infinite retries | ✅ | Max 3 retries |
| No queue corruption | ✅ | JSON parse errors clear queue |
| Queue ordering | ✅ | FIFO |
| Queue cleanup on success | ✅ | Cleared entirely |
| Conflict resolution | ⚠️ | Uses `last_activity_at` comparison — works but only for timestamp ordering, not content merging |
| Retry limit | ❌ | H-6: Silent data loss after 3 failures |

---

## Phase 5 — Debounce Summary

| Check | Status | Finding |
|-------|--------|---------|
| Rapid answers → latest wins | ⚠️ | C-3: Only if same key. Different keys lose data |
| Cancelled requests never overwrite | ✅ | AbortController cancels in-flight |
| flushPending saves latest state | ❌ | C-2: Orphans data on failure |

---

## Phase 6 — React Lifecycle Summary

| Check | Status | Finding |
|-------|--------|---------|
| useEffect cleanup | ✅ | Timers, abort controllers, listeners removed |
| Refs correct | ⚠️ | C-3: Stale closure in updateAnswer |
| Callbacks deps correct | ❌ | C-3, H-3: Missing/incorrect dependencies |
| Memoization | ❌ | H-7: No memo for re-render-heavy components |
| Dependency arrays | ⚠️ | H-3: Missing dependencies |
| visibilitychange | ✅ | Properly registered/removed (but uses non-existent endpoint) |
| beforeunload | ❌ | Hits non-existent endpoint |
| pagehide | ✅ | Correctly calls flushPending (but async) |
| No duplicated listeners | ⚠️ | M-5: Two hooks both register listeners |

---

## Phase 7 — Pyodide/Audit Summary

| Check | Status | Finding |
|-------|--------|---------|
| Pyodide loads | ✅ | `loadPyodide` with CDN |
| Worker lifecycle | ⚠️ | C-5: Listener leak, H-4: Hang on crash |
| Memory cleanup | ❌ | C-5: Runtime error handling accumulates listeners |
| Runtime exceptions | ⚠️ | C-5: Error boundaries catch UI crashes, but worker can hang |
| Infinite loop protection | ✅ | 5s timeout → terminate + recreate |
| Large output | ✅ | 50KB char limit, 1000 line limit |
| Large stdin | N/A | No stdin in current design |
| Restart execution | ✅ | Worker termination + recreation |
| Page refresh | ❌ | C-1: Progress data lost on refresh |
| Navigation away | ❌ | C-1: Progress data lost on navigation |
| Checkpoint saving | ⚠️ | Works with online debounce, fails on unload |
| Exercise progress persistence | ❌ | C-1, C-2: Multiple data loss paths |
| Error boundaries | ⚠️ | M-2: Recovery doesn't reset parent state |
| Pyodide crash → app crash | ✅ | Error boundary wraps only the code area |

---

## Phase 8 — Performance Summary

| Check | Status | Finding |
|-------|--------|---------|
| Network requests | ⚠️ | H-7: Full tree re-render on every 1s timer tick |
| Render count | ⚠️ | H-7: Unnecessary renders |
| Re-renders | ❌ | H-7: Every 1s re-renders entire LessonDetail |
| Memory usage | ❌ | C-5: Listener leak |
| Listener count | ❌ | C-5: Growing listeners on rapid Run |
| Queue size | ⚠️ | H-5: Duplicate queue items |
| Database writes | ✅ | Debounced writes, reasonable frequency |

---

## Phase 9 — Security Summary

| Check | Status | Finding |
|-------|--------|---------|
| User A overwrite User B | ✅ | RLS prevents (SELECT/INSERT/UPDATE all filter by auth.uid()) |
| RLS policies | ✅ | Verified in migration SQL |
| exercise_id spoofing | ⚠️ | Possible if user manipulates URL — no FK but RLS doesn't limit exercise_id |
| user_id spoofing | ✅ | RLS uses `auth.uid()` which is server-verified |
| Offline queue injection | ⚠️ | Offline queue is localStorage — vulnerable to XSS but same-origin only |

---

## Summary Action Plan

### Must-Fix Before Production (reduce Health Score from 28 to ~65):
1. **C-1**: Replace `beforeunload` fetch to non-existent endpoint with `navigator.sendBeacon()` or localStorage queue
2. **C-2**: Fix `flushPending` to queue data on failure instead of calling `syncOfflineQueue`
3. **C-3**: Fix stale closure in `updateAnswer` by accumulating pending answers in a ref
4. **C-4**: Implement JSONB merge strategy for two-tab conflict resolution
5. **C-5**: Fix Pyodide listener leak by removing before re-adding

### Should-Fix (increase Health Score to ~85):
6. **H-1**: Only clear `pendingSaveRef` on successful save
7. **H-2**: Add client-side optimistic lock version to `markCompleted`
8. **H-3**: Add `checkProgress` and `onComplete`/`onProgress` to effect deps
9. **H-4**: Add timeout for worker initialization stage
10. **H-5**: Deduplicate offline queue by exercise_id (keep latest)
11. **H-6**: Show user notification when items exceed retry limit

### Nice-to-Have (increase Health Score to ~95):
12. **H-7**: Memoize expensive child components or use `useRef` for timer
13. **M-1**: Use functional state update for attempts in handleRun
14. **M-2**: Add parent reset callback to error boundary
15. **M-5**: Consolidate duplicate event listener registrations

---

## Health Score Breakdown

| Category | Score | Weight | Weighted |
|----------|-------|--------|----------|
| Data Persistence (C-1, C-2) | 10/100 | 25% | 2.5 |
| Race Conditions (C-3, C-4, H-2) | 25/100 | 20% | 5.0 |
| React Lifecycle (H-3, H-7, M-2, M-5) | 40/100 | 15% | 6.0 |
| Offline Queue (H-5, H-6) | 30/100 | 15% | 4.5 |
| Pyodide Worker (C-5, H-4) | 30/100 | 10% | 3.0 |
| Database Consistency | 85/100 | 10% | 8.5 |
| Security | 80/100 | 5% | 4.0 |

**Total: 28 / 100**

The Exercise Progress system demonstrates solid architectural choices (singleton service, RLS, unique constraints, debounce pattern) but critical data loss paths in the unload/visibility/beforeunload handlers make it **NOT production ready**. The foundation is fixable, but all five critical bugs must be resolved before launch.