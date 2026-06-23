# Handoff Report: Milestone M1 Fix Strategy

## Observation
I investigated the three reported issues in `pythonWorker.ts` and `ExerciseCard.tsx`.

1. **Memory Limit Flaw (`src/lib/pythonWorker.ts`)**:
   - On lines 37-48, `CappedStdout.write(self, s)` increments `bytes_written` and `lines_written`.
   - If limits are exceeded (> 50,000 bytes or 1,000 lines), it currently executes:
     ```python
     super().write(s)
     super().write("\n[Error: Output limit exceeded (50KB or 1000 lines)]")
     raise RuntimeError("Output limit exceeded: 50KB or 1000 lines")
     ```
   - This means if `s` is 10MB, it writes the entire 10MB to the `StringIO` buffer *before* raising the error, defeating the purpose of the limit.

2. **Eager Initialization (`src/app/components/ExerciseCard.tsx`)**:
   - On lines 113-115, a `useEffect` eagerly initializes the Pyodide Web Worker when the component mounts:
     ```tsx
     useEffect(() => {
       initWorker();
     }, [initWorker]);
     ```

3. **Terminal UX Flaw (`src/app/components/ExerciseCard.tsx`)**:
   - On line 522, the terminal output component renders failed test cases as:
     ```tsx
     text={tc?.passed ? `${tc?.expected ?? ''} ✓` : `Expected "${tc?.expected ?? ''}" but got error`}
     ```
   - The actual output or runtime error captured in `tc.actual` (which we verified is populated by `pythonWorker.ts` on lines 88-90) is entirely ignored.

## Logic Chain
1. To prevent memory overflow in `pythonWorker.ts`, we must truncate the incoming string `s` to whatever capacity is remaining *before* it gets passed to `super().write(s)`. This ensures the in-memory buffer (`io.StringIO`) strictly honors the 50KB limit.
2. To enable lazy loading, we simply delete the `useEffect` hook in `ExerciseCard.tsx` (lines 113-115). The `runPythonTests` function in `src/hooks/usePython.ts` already handles initializing the worker on-demand if it hasn't been created yet.
3. To surface actual errors and student output, we must interpolate `tc.actual` into the terminal text in `ExerciseCard.tsx` (line 522), replacing the hardcoded "got error" string.

## Caveats
- When truncating the Python output, doing a strict byte truncation on a multi-byte unicode string could theoretically split a surrogate pair, but a character-based slice (e.g. `s[:max(0, 50000 - self.bytes_written)]`) provides a robust and simple safeguard against massive `print()` payloads.
- Multi-line `tc.actual` strings will render in the terminal `div`. The UI uses a monospace font (`font-mono text-xs`), but depending on Tailwind classes, long unbroken error tracebacks might need horizontal scrolling or wrap settings (which appear to already have overflow containment).

## Conclusion
The bugs can be fixed via three surgical code edits:
1. **`src/lib/pythonWorker.ts`**: Update `CappedStdout.write` to slice `s` before calling `super().write`.
2. **`src/app/components/ExerciseCard.tsx`**: Delete the `initWorker` `useEffect` (lines 113-115).
3. **`src/app/components/ExerciseCard.tsx`**: Update line 522 to include `tc.actual` (e.g., ``Expected "${tc?.expected ?? ''}" but got: ${tc?.actual ?? 'error'}``).

## Verification Method
1. **Memory Limit**: In the app, write Python code `print("A" * 10000000)` and run it. The browser should not freeze or throw Out Of Memory errors; instead, it should immediately return the custom error limit string.
2. **Lazy Loading**: Open the browser's DevTools Network/Source tab. Navigate to the Exercise page. Verify that `pythonWorker.ts` (and Pyodide) is *not* fetched/loaded until the "Run" button is actually clicked.
3. **Terminal UX**: Write Python code with a syntax error or a wrong output (e.g., `print("hello")` instead of `print("world")`). Verify the terminal UI explicitly displays "hello" or the Python exception traceback, rather than the generic "but got error" message.
