# UTech Standards Guide

This skill applies project-specific standards to all work. Use it when:
- Planning a new feature or fix
- Reviewing code before committing
- Migrating existing functionality
- Implementing progress tracking or exercises

---

## Pre-Task Analysis

### 1. Scope Assessment

**Questions to answer:**
- [ ] What files will this touch? (list them, don't scan globally)
- [ ] Does this change existing APIs or behavior?
- [ ] Does this affect authentication, database, or progress tracking?
- [ ] Is this a new feature, bug fix, or refactor?

**Dependency mapping:**
- Read only files directly involved
- Build a minimal dependency graph
- Ask before scanning entire project

### 2. Risk Identification

**Check against these patterns:**

| Area | Risk | Mitigation |
|------|------|-----------|
| **Auth** | Duplicate auth systems | Reuse AuthContext; never create new auth |
| **Database** | Missing RLS policies | Verify `@enabled` on sensitive queries |
| **Bundle** | Unnecessary imports | No global Pyodide; lazy load expensive libs |
| **UI** | Unnecessary rerenders | Use hooks, memoization; avoid context bloat |
| **Progress** | Offline data loss | Queue locally; sync on reconnect |
| **Exercises** | Blocking main thread | Use Web Workers for Python; enforce timeouts |
| **Types** | `any` creep | Strict TypeScript; define interfaces |

---

## Implementation Standards

### React + TypeScript
```typescript
// ✅ DO: Strict typing, reusable hooks
interface ExerciseProps {
  id: string;
  content: string;
  onSubmit: (result: SubmitResult) => void;
}

const useExerciseProgress = (exerciseId: string) => {
  const { user } = useAuth();
  const [progress, setProgress] = useState<ProgressState>(INITIAL);
  // ...
};

// ❌ DON'T: any, component-specific logic, inline handlers
const ExerciseCard: React.FC<any> = (props: any) => {
  const handleClick = () => trackProgress(props.id); // should be in hook
};
```

**Rules:**
- Use TypeScript strictly; avoid `any`
- Extract logic into custom hooks
- Preserve existing component APIs
- Lazy load heavy dependencies

### Supabase Integration
```typescript
// ✅ DO: Reuse client, RLS-compatible queries, graceful failures
const { data, error } = await supabase
  .from('progress')
  .select('*')
  .eq('user_id', user.id)
  .order('created_at', { ascending: false });

if (error) {
  console.error('Failed to fetch progress:', error);
  // Fallback to local cache
}

// ❌ DON'T: Create new clients, ignore errors, raw queries
const client = new SupabaseClient(...); // Duplicate
await db.query('SELECT * FROM progress'); // Bypasses RLS
```

**Rules:**
- Reuse `supabase` client from context
- Reuse `AuthContext` for session
- All queries must be RLS-compatible
- Handle network failures gracefully
- Minimize database round trips

### Coding Exercises
```typescript
// ✅ DO: Web Workers, timeouts, output capture
const runPythonExercise = async (code: string) => {
  const worker = new Worker('/python-worker.js');
  const timeout = setTimeout(() => worker.terminate(), 30000);
  
  return new Promise((resolve) => {
    worker.onmessage = (e) => {
      clearTimeout(timeout);
      resolve({ output: e.data.stdout, result: e.data.result });
    };
    worker.postMessage({ code });
  });
};

// ❌ DON'T: Block UI, no timeout, no output capture
eval(code); // Blocks UI, security risk
Pyodide.runPythonAsync(code); // No timeout
```

**Rules:**
- Only enable Python for `lesson_type = "coding"`
- Always use Web Workers
- Enforce 30s execution timeout
- Limit stdout size (e.g., 100KB)
- Capture both return value and print output
- Show clear error messages

### Progress Tracking
```typescript
// ✅ DO: Persist to Supabase, queue offline
const trackProgress = async (attempt: AttemptRecord) => {
  try {
    await supabase.from('attempts').insert(attempt);
  } catch (error) {
    // Queue locally, sync on reconnect
    queueLocalProgress(attempt);
  }
};

// ❌ DON'T: Store in localStorage only, no sync
localStorage.setItem('progress', JSON.stringify(data));
```

**Tracked fields:**
- `attempts` (count)
- `pass/fail` status
- `score` (if applicable)
- `completion_status`
- `execution_timestamp`

---

## Migration Checklist

Before modifying existing functionality:

### 1. **Analyze**
- [ ] List all affected files
- [ ] Identify database schema changes (if any)
- [ ] Check for UI impacts
- [ ] Look for downstream dependencies

### 2. **Explain**
- [ ] State the current behavior
- [ ] Explain the intended change
- [ ] Describe user-facing impact

### 3. **Identify Risks**
- [ ] Auth/security vulnerabilities?
- [ ] Missing RLS policies?
- [ ] Breaking API changes?
- [ ] Performance regressions?
- [ ] Bundle size growth?
- [ ] Offline data loss?

### 4. **Implement Minimally**
- [ ] Make only required changes
- [ ] Preserve existing APIs
- [ ] No premature abstractions
- [ ] No unused error handling

### 5. **Validate**
- [ ] TypeScript strict (`npm run type-check`)
- [ ] Build succeeds (`npm run build`)
- [ ] No regressions in related features
- [ ] Test golden path + edge cases (if UI)

---

## Performance Rules

**Bundle optimization:**
- Lazy load Pyodide (not global import)
- Lazy load heavy UI libraries (e.g., charts)
- Code-split large route components
- Monitor bundle size (`npm run build` output)

**Runtime optimization:**
- Use `useMemo` for expensive computations
- Use `useCallback` for stable references
- Avoid context re-renders (split contexts)
- Profile on mobile (production bottleneck)

---

## Output Requirements

Every task completion should include:

```
## Summary
- **Files modified**: [file1, file2, ...]
- **Reason**: [1-2 sentences on why]
- **Risks identified**: [list or "none"]
- **Validation performed**: [build, types, regression tests]
- **Remaining work**: [list or "complete"]
```

Keep descriptions concise and implementation-focused. No narratives or process explanations.

---

## Common Task Patterns

### Adding a New Exercise Type
1. Update lesson schema (if needed)
2. Create exercise component (reuse hooks)
3. Add progress tracking (use hook)
4. Test in browser
5. Verify build and types

### Migrating Database Schema
1. Create migration file
2. Update TypeScript types
3. Update RLS policies
4. Update queries to use new schema
5. Add data backfill (if needed)
6. Test with production-like data

### Fixing Auth Issues
1. Check `AuthContext` state
2. Verify RLS policies
3. Test session persistence
4. Clear browser cache + retry
5. Check network logs for JWT errors

### Optimizing Performance
1. Profile with DevTools
2. Identify bottleneck (bundle, render, network)
3. Apply targeted fix (lazy load, memo, query optimization)
4. Verify bundle size unchanged
5. Benchmark before/after

---

## Quick Decision Tree

**Should I create a new hook?**
→ Yes, if logic is reused in 2+ components or is testable in isolation

**Should I create a new context?**
→ Only for auth or global state; prefer prop drilling for local state

**Should I create a database table?**
→ Only for persistent data; use localStorage/IndexedDB for client-side cache

**Should I load Pyodide globally?**
→ No; lazy load on-demand via Web Worker

**Should I add error handling here?**
→ Only at system boundaries (user input, API calls, DB queries)

**Should I add a comment?**
→ Only if the WHY is non-obvious; avoid documenting WHAT the code does
