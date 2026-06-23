# Handoff Report: Python Execution & Resource Management (Iteration 3)

## 1. Observation
- **5-Second Timeout covers Pyodide Initialization**: `src/hooks/usePython.ts` starts a 5000ms `setTimeout` immediately after `workerRef.current.postMessage(...)`. `src/lib/pythonWorker.ts` awaits `initPyodide()` which fetches ~10MB of WASM before running user code. If network latency delays the fetch >5s, the worker is killed.
- **CappedStdout Line Limit Bypass**: In `pythonWorker.ts:45-49`, line truncation is handled by `s[:allowed]` where `allowed = max(0, 50000 - prev_bytes)`. A massive string with 20,000 `\n` characters (length ~20k bytes) will be fully retained because 20k bytes is less than the 50,000 byte limit, thus bypassing the 1000-line check entirely.
- **General Exceptions Swallowed**: In `pythonWorker.ts:91-93`, `except Exception as e:` handles execution errors. It sets `output = sys.stdout.getvalue().strip()`. It only appends the error if `not output`. If the user has printed text before the error, the error is discarded. The initial `exec(__USER_CODE__, user_globals)` also uses `str(e)` instead of the traceback.
- **Memory Exploit in encode**: In `pythonWorker.ts:42`, `self.bytes_written += len(s.encode('utf-8'))` is called before bounds checking. Calling `.encode('utf-8')` on a massive input string (`10**8` chars) causes Pyodide to exceed memory limits and crash the tab during the `.encode` operation itself.
- **Memory Exploit in RuntimeError catch**: `CappedStdout` raises `RuntimeError` when limits are exceeded. If a user runs `while True: try: print("a") except RuntimeError: pass`, the limit check condition remains true on subsequent loops. Each loop iteration appends `"\n[Error: Output limit exceeded...]"` to the `io.StringIO` buffer, eventually causing an OOM.

## 2. Logic Chain
- By sending a `{ type: 'ready' }` postMessage from the worker immediately before calling `pyodide.runPythonAsync(...)`, we can defer the timeout initiation in `usePython.ts` until the WASM download completes.
- To correctly truncate lines, we must split the string explicitly by lines (`s.split('\n')`), truncate to `remaining_lines`, and join, *before* we encode and slice by `remaining_bytes`. This enforces both limits correctly.
- By importing `traceback` and replacing `str(e)` with `traceback.format_exc(limit=10)`, we prevent giant recursive stacks while providing helpful traces. Appending this to `output` unconditionally (unless it is our custom limit error) ensures users always see the error alongside their `print` logs.
- Limiting the initial string size via `s = s[:50000]` before calling `.encode('utf-8')` avoids large memory allocations natively, as the max permitted byte limit is 50,000 anyway.
- Adding a `self.limit_reached = True` flag inside `CappedStdout` allows the `write` method to immediately raise a `RuntimeError` at the start of subsequent calls, avoiding redundant buffer appends in a `try/except` loop.

## 3. Caveats
- `traceback.format_exc(limit=10)` will limit stack traces to 10 frames. This is a compromise to prevent `RecursionError` traces from bloating the payload, while providing enough context for almost all beginner logic errors.
- `usePython.ts` `timeoutId` typing might vary based on TypeScript configurations (`NodeJS.Timeout` vs `number`). `ReturnType<typeof setTimeout>` is used in the patch to be safely agnostic.

## 4. Conclusion
The proposed changes resolve all 5 specific edge-cases comprehensively:
1. WASM download latency no longer impacts user-code timeout.
2. The line limit enforces string splitting accurately.
3. Tracebacks are captured cleanly, truncated to 10 frames, and never swallowed.
4. Early truncation entirely mitigates the `.encode('utf-8')` memory leak.
5. `limit_reached` flag entirely mitigates infinite buffer growth in `except RuntimeError` loops.

Patch files have been generated:
- `C:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_explorer_m1_3_gen3\usePython.patch`
- `C:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_explorer_m1_3_gen3\pythonWorker.patch`

## 5. Verification Method
1. Examine the patch files to confirm all points mentioned above are covered.
2. Apply the patches manually or using `git apply`.
3. Start the application and test Pyodide on a throttled "Slow 3G" network to verify the 5-second timeout no longer interrupts initialization.
4. Input adversarial strings to test CappedStdout: `print("\n" * 20000)` and `while True: try: print("a") except: pass` to ensure the tab does not crash.
