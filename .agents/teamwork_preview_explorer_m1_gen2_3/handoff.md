# Handoff: Milestone M1 Fix Strategy

## Observation

### 1. Critical Memory Limit Flaw in `pythonWorker.ts`
- **Location**: `src/lib/pythonWorker.ts`, lines 37-49
- **Observation**: The `write` method of `CappedStdout` class currently tracks `bytes_written` and throws an error when it exceeds limits. However, the incoming string `s` is not bounded before being written.
- **Verbatim Error**: `if self.bytes_written > 50000 or self.lines_written > 1000: super().write(s) ...`
This causes Pyodide to crash with an Out-of-Memory (OOM) error when a massive string like `print("A" * 10000000)` is printed, because `super().write(s)` consumes huge memory before limits trigger.

### 2. Eager Initialization in `ExerciseCard.tsx`
- **Location**: `src/app/components/ExerciseCard.tsx`, lines 113-115
- **Observation**: The component uses a `useEffect` to eagerly call `initWorker()` on mount.
- **Code snippet**:
```tsx
  useEffect(() => {
    initWorker();
  }, [initWorker]);
```
- **Context**: `initWorker` instantiates the Python web worker immediately upon component load instead of waiting for the user to trigger it.

### 3. UX Flaw in `ExerciseCard.tsx`
- **Location**: `src/app/components/ExerciseCard.tsx`, lines 521-525
- **Observation**: When a test fails, the terminal UI renders: `Expected "${tc?.expected ?? ''}" but got error`. It totally ignores the actual output (`tc.actual`).
- **Code snippet**:
```tsx
  <TerminalLine
    text={tc?.passed ? `${tc?.expected ?? ''} ✓` : `Expected "${tc?.expected ?? ''}" but got error`}
    type={tc?.passed ? 'success' : 'error'}
    delay={100}
  />
```

## Logic Chain

1. **Memory Limit Fix**: To prevent a giant string from bypassing the 50KB limit and consuming available RAM in Pyodide, we must truncate `s` *before* attempting any byte calculation or passing it to `super().write(s)`. Truncating `s` to 50000 chars right at the beginning of the `write` method guarantees `s` will never exceed 150KB (worst-case utf-8 encoding limit), keeping it safely within memory constraints.
2. **Lazy Initialization**: `runPythonTests` in `usePython.ts` already has a lazy-loading mechanism (`if (!workerRef.current) { initWorker(); }`). Therefore, simply removing the eager `useEffect` from `ExerciseCard.tsx` will naturally enforce on-demand initialization.
3. **UX Flaw Fix**: The worker already returns the actual output of the code in the `actual` property of the payload (lines 80-85 of `pythonWorker.ts`). The frontend just fails to render it. By updating the `TerminalLine` component to read `${tc?.actual || 'error'}`, students will be able to see their real stdout and syntax error traces.

## Caveats

- We are relying on Pyodide's internal mechanisms to survive an intermediate 50k character string. This is extremely safe since WebAssembly allows hundreds of megabytes, but Python strings are dense.
- `ExerciseCard.tsx` line 81 states `const [testResults, setTestResults] = useState<TestCase[]>([]);`. `TestCase` doesn't strictly have an `actual` property. However, it looks like `tc` behaves as `any` or extends correctly within the current TS config because `actual` is populated in line 182. To be perfectly type-safe, importing `PythonTestResult` from `usePython.ts` and using `useState<PythonTestResult[]>` would be best, but optionally accessing `tc?.actual` is sufficient as a targeted fix.

## Conclusion

The issues can be fixed with these specific localized edits:

**1. Fix `src/lib/pythonWorker.ts` (lines 37-49)**
```python
    def write(self, s):
        if not isinstance(s, str):
            s = str(s)
            
        # Truncate to prevent massive strings from causing OOM
        if len(s) > 50000:
            s = s[:50000]

        self.bytes_written += len(s.encode('utf-8'))
        self.lines_written += s.count('\\n')
        
        if self.bytes_written > 50000 or self.lines_written > 1000:
            super().write(s)
            super().write("\\n[Error: Output limit exceeded (50KB or 1000 lines)]")
            raise RuntimeError("Output limit exceeded: 50KB or 1000 lines")
            
        return super().write(s)
```

**2. Fix `src/app/components/ExerciseCard.tsx` (Lazy Load)**
Remove lines 113-115 completely:
```tsx
  // REMOVE THIS BLOCK:
  // useEffect(() => {
  //   initWorker();
  // }, [initWorker]);
```
And adjust line 111 so it no longer extracts `initWorker` (optional cleanup):
```tsx
  const { runPythonTests, isInitializing } = usePython();
```

**3. Fix `src/app/components/ExerciseCard.tsx` (Terminal UX)**
Change line 522 to render actual output:
```tsx
  // FROM:
  text={tc?.passed ? `${tc?.expected ?? ''} ✓` : `Expected "${tc?.expected ?? ''}" but got error`}
  // TO:
  text={tc?.passed ? `${tc?.expected ?? ''} ✓` : `Expected "${tc?.expected ?? ''}" but got: ${tc?.actual || 'error'}`}
```
(Optional strict typing: change line 81 to `useState<PythonTestResult[]>([])` and import it).

## Verification Method

1. **Memory OOM Check**: Open the app, and run `print("A" * 10000000)`. Ensure the browser tab does not crash with OOM, and terminal outputs `Output limit exceeded`.
2. **Lazy Loading Check**: Load the exercise page. Check the Network tab to ensure `pythonWorker.ts` and Pyodide are NOT downloaded immediately. Click "Run", then observe the worker network requests triggering.
3. **UX Terminal Check**: Run an incorrect test script (e.g. `print("Hello World")` for an expected output of `5`). The terminal should now correctly say `Expected "5" but got: Hello World`.
