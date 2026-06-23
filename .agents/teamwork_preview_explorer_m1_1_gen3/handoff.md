# Handoff Report: Python Execution Fixes (M1 Iteration 3)

## 1. Observation
- **`usePython.ts:62`**: The timeout (`setTimeout(..., 5000)`) is started immediately when `runPythonTests` is called, meaning it counts down while the worker is busy downloading/initializing Pyodide.
- **`pythonWorker.ts:45`**: `CappedStdout` checks `self.bytes_written > 50000` or `self.lines_written > 1000`, but when truncating, it only does `s[:allowed]` based on `allowed_bytes`, ignoring line limits. A string with 20,000 newlines will bypass the line limit because its byte size is within 50KB.
- **`pythonWorker.ts:90`**: In `run_tests()`, if an exception occurs during test case evaluation, it checks `if not output: output = "Error: " + str(e)`. This hides exceptions if the user previously printed something. Also, it uses `str(e)` instead of a full traceback.
- **`pythonWorker.ts:42`**: `CappedStdout` executes `len(s.encode('utf-8'))` on the incoming string `s` *before* checking if it's too large. If `s` is a 1GB string, `encode` will crash the Web Worker with an Out Of Memory error.
- **`pythonWorker.ts:47`**: When the limit is reached, `CappedStdout` writes `[Error: Output limit exceeded...]` and raises a `RuntimeError`. If the user has a `while True: try: print("A") except RuntimeError: pass`, the function gets called infinitely, repeatedly appending the error string to the base `io.StringIO`, leading to an OOM.

## 2. Logic Chain
1. To prevent Pyodide initialization from triggering the 5s timeout, the worker should send a `{ type: 'started' }` message *after* Pyodide is ready, and `usePython.ts` should only start the timeout when this message is received.
2. To prevent the line limit bypass, `CappedStdout` must additionally split `s_trunc` by `\n` and keep only up to `1000 - prev_lines` elements if the line count would exceed 1000.
3. To stop swallowed exceptions, we must import `traceback`, format the exception using `traceback.format_exc()`, and reliably append it to `output` if `output` is not empty (ignoring our custom `RuntimeError` which is already in stdout).
4. To fix the `encode` OOM, we can simply slice `s = s[:50000]` before performing `len(s.encode('utf-8'))` or any length calculation, as any string longer than 50,000 characters is guaranteed to exceed the 50KB limit anyway.
5. To fix the infinite growth via `RuntimeError` catching, we introduce a `self.limit_reached = False` instance variable. Once the limit is tripped, we set `self.limit_reached = True`. The very first line of `write` checks if `self.limit_reached` is True; if so, it immediately raises the `RuntimeError` without calling `super().write()` again.

## 3. Caveats
- `traceback.format_exc()` will include the frame of `run_tests()` from the wrapper script. However, this is standard Python behavior, and parsing/filtering the traceback can be complex and error-prone. Leaving it in provides full context.
- Truncating `s[:50000]` by character length before checking byte length is a safe approximation because 50,000 chars will be at least 50,000 bytes. It prevents massive memory allocation prior to byte calculation.
- We cannot test Pyodide loading interactively without the frontend, but separating the `started` message cleanly isolates network load time from execution time.

## 4. Conclusion
We must implement a set of targeted logic changes to `usePython.ts` and `pythonWorker.ts` to properly isolate timeout from load time, strictly enforce caps on stdout, ensure full stack traces are propagated, and harden the capture wrapper against memory spikes and malicious error catching.

**Proposed Changes:**
1. **`pythonWorker.ts`**:
   - Insert `self.postMessage({ id, type: 'started' });` right before defining `wrapperCode`.
   - In `wrapperCode`, import `traceback`.
   - Update `CappedStdout.__init__` to add `self.limit_reached = False`.
   - Update `CappedStdout.write` to instantly raise `RuntimeError` if `self.limit_reached` is True.
   - Pre-truncate `s = s[:50000]` before encoding.
   - Truncate by bytes safely, then truncate lines by splitting on `\n`.
   - In `run_tests` exception blocks, replace `str(e)` with `traceback.format_exc()` and append it to `output` if `output` is not empty.
2. **`usePython.ts`**:
   - Move the `setTimeout` creation inside `handleMessage` under the condition `e.data.type === 'started'`. Declare `let timeoutId: NodeJS.Timeout | null = null;` at the top of the Promise executor.

## 5. Verification Method
- Run `npm run build` to ensure type-checking passes.
- To verify the timeout fix: load a large Python test case on a slow network connection. The 5s timeout should not fire during WASM download.
- To verify OOM fixes: execute `print("A" * 100000000)` and `while True: try: print("A") except RuntimeError: pass`. The app should not crash and should gracefully return an output limit error.
- To verify Exception visibility: evaluate `print("Hello")\nx = 1/0` and ensure both `"Hello"` and the ZeroDivisionError traceback appear in the output.
