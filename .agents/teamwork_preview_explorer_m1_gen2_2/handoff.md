# Handoff Report: Milestone M1 (Python Execution & Resource Management)

## Observation
I investigated the three files associated with Milestone M1: `src/hooks/usePython.ts`, `src/app/components/ExerciseCard.tsx`, and `src/lib/pythonWorker.ts`.
1. **pythonWorker.ts (Lines 37-48)**: The `CappedStdout.write` method calls `self.bytes_written += len(s.encode('utf-8'))` and `super().write(s)` even if `s` is excessively large (e.g., `print("A" * 10000000)`). The massive string is loaded into memory and written to the `io.StringIO` buffer before throwing the `RuntimeError`, defeating the memory limit.
2. **ExerciseCard.tsx (Lines 113-115)**: There is an eager initialization hook:
   ```tsx
     useEffect(() => {
       initWorker();
     }, [initWorker]);
   ```
   This initializes Pyodide on component mount, ignoring the lazy-loading requirement.
3. **ExerciseCard.tsx (Lines 37, 521-525)**: The terminal UI component `TerminalLine` ignores `tc.actual` and hardcodes `"but got error"`:
   ```tsx
     text={tc?.passed ? `${tc?.expected ?? ''} ✓` : `Expected "${tc?.expected ?? ''}" but got error`}
   ```
   Furthermore, `TerminalLine` wrapper `div` lacks the `whitespace-pre-wrap` utility class, which would cause multi-line Python error traces to format improperly.

## Logic Chain
1. **Fixing OOM in `pythonWorker.ts`**: To prevent `s` from causing an OOM or bypassing the buffer limit, we must intercept `s` at the top of the `write` method. By truncating `s` to a maximum character length (e.g., 50000) and preventing the writing of strings that exceed the 50KB or 1000 lines limits to `super().write()`, we completely eliminate memory allocation spikes.
2. **Fixing Eager Loading in `ExerciseCard.tsx`**: Deleting the `useEffect` block that calls `initWorker()` entirely will defer Pyodide initialization. The `runPythonTests` method in `usePython.ts` already calls `initWorker()` if the worker does not exist:
   ```ts
         if (!workerRef.current) {
           initWorker();
         }
   ```
   This gracefully satisfies the lazy-loading requirement.
3. **Fixing Terminal UX in `ExerciseCard.tsx`**: We need to surface `tc.actual` when `tc.passed` is false. By modifying the failure string to include `\n${tc?.actual ?? 'No output'}` and adding the Tailwind class `whitespace-pre-wrap` to `TerminalLine`, users will be able to see the exact runtime errors or incorrect values.

## Caveats
- Removing eager initialization means users will experience a slightly longer delay (~1-3 seconds) upon clicking "Run" for the very first time, as Pyodide loads on-demand.
- In `pythonWorker.ts`, checking `len(s.encode('utf-8'))` before truncating string could still spike memory if `s` is enormous. To be safest, we should truncate `s` by string length *before* encoding it.

## Conclusion
The bugs can be fully remediated with the following specific modifications.

**Action Plan:**
1. **`src/lib/pythonWorker.ts`**:
   Replace lines 37-48 with:
   ```python
       def write(self, s):
           if not isinstance(s, str):
               s = str(s)
           
           # Truncate massive strings immediately to prevent memory spikes
           if len(s) > 50000:
               s = s[:50000]
               
           s_bytes = len(s.encode('utf-8'))
           s_lines = s.count('\\n')
           
           if self.bytes_written + s_bytes > 50000 or self.lines_written + s_lines > 1000:
               safe_s = s[:1000] # Safe truncated slice
               super().write(safe_s)
               super().write("\\n[Error: Output limit exceeded (50KB or 1000 lines)]")
               self.bytes_written += len(safe_s.encode('utf-8'))
               self.lines_written += safe_s.count('\\n')
               raise RuntimeError("Output limit exceeded: 50KB or 1000 lines")
               
           self.bytes_written += s_bytes
           self.lines_written += s_lines
           return super().write(s)
   ```

2. **`src/app/components/ExerciseCard.tsx`**:
   - **Delete** lines 113-115:
     ```tsx
       useEffect(() => {
         initWorker();
       }, [initWorker]);
     ```
   - **Modify** line 37 to add `whitespace-pre-wrap`:
     ```tsx
         <div className={`${colors[type]} terminal-line-enter whitespace-pre-wrap`}>
     ```
   - **Modify** line 522 to use `tc.actual`:
     ```tsx
                           text={tc?.passed ? `${tc?.expected ?? ''} ✓` : `Expected "${tc?.expected ?? ''}" but got:\n${tc?.actual ?? 'No output'}`}
     ```

## Verification Method
1. Test OOM bypass: Enter `print("A" * 10000000)` into the exercise and click Run. It should immediately hit the output limit error without crashing the browser or running out of memory.
2. Test Lazy Load: Reload the page. Verify in the DevTools Network tab that `pyodide.js` and WebAssembly files are *only* fetched when the "Run" button is clicked, not on initial render.
3. Test Error UX: Enter `print(1 / 0)` and click Run. The terminal should display the full Python traceback for `ZeroDivisionError`, not just "Expected ... but got error".
