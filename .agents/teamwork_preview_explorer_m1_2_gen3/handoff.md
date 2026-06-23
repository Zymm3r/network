# Handoff Report

## Observation
1. **5-Second Timeout covers Pyodide Initialization**: `usePython.ts` started the 5s timeout synchronously before `postMessage` (lines 62-72). This meant the 5-second timer covered the Pyodide WASM download time.
2. **CappedStdout Line Limit Bypass**: `pythonWorker.ts` truncated `s` based on `bytes_written` limits only (line 47: `s[:allowed]`). The line limit was checked but `s` wasn't correctly truncated for newlines, meaning `s` with 20000 `\n` characters bypassed the 1000 lines limit.
3. **General Exceptions Swallowed**: In `pythonWorker.ts`, inside the `except Exception as e:` block (line 92), if `sys.stdout.getvalue().strip()` was not empty, `e` (the actual error) was discarded instead of being appended to the output.
4. **Memory Exploit in encode**: `pythonWorker.ts` called `len(s.encode('utf-8'))` on incoming chunks (line 42). Passing a massive string like `10**8` chars would result in Pyodide allocating a huge buffer and causing an OOM error before the limit check could trigger.
5. **Memory Exploit in RuntimeError catch**: `CappedStdout` inside `pythonWorker.ts` wrote the error message `"\n[Error: Output limit exceeded]"` via `super().write()` every time the string exceeded the limit (line 48). If caught in a `while True:` loop, this continuously appended text to the string buffer until memory was exhausted.

## Logic Chain
1. To fix the timeout initialization, I added `self.postMessage({ id, type: 'start' })` in `pythonWorker.ts` right after Pyodide initialization completes and before execution starts. I then updated `usePython.ts` to only begin the 5-second `setTimeout` when it receives `e.data.type === 'start'`.
2. To correctly implement the line limit, I modified `CappedStdout.write` to find the exact allowed characters (`allowed_chars`) and allowed lines (`allowed_lines`). I explicitly truncated lines using `lines = truncated_s.split('\\n')` and rejoined only the allowed number of lines before passing the string to `super().write()`.
3. To prevent exceptions from being swallowed, I imported `traceback` and updated the `except` block to capture the stack trace with `traceback.format_exc()`. This is now always appended to the current `output`, ensuring exceptions like `NameError` are visible.
4. To fix the `encode` OOM, I removed the `.encode('utf-8')` call. Output size is now approximated using raw character counts via `len(s)`, which is O(1) in memory and safe against huge strings.
5. To fix the `RuntimeError` exploit, I introduced a `self.limit_reached = False` flag in `CappedStdout`. When the output limits are first exceeded, this flag is set to `True`. Subsequent calls to `write()` check this flag and immediately raise `RuntimeError` without writing the warning text a second time.

## Caveats
- Using `len(s)` instead of byte counts for the size limit slightly underestimates the bytes used by multi-byte unicode characters, but it perfectly mitigates the OOM vector while still enforcing a strict output size boundary, which is the primary goal.
- `usePython.ts` is robustly checking for `e.data.type === 'start'` before starting the execution timer. This prevents premature timeouts on slow network connections.

## Conclusion
All 5 points identified in the iteration feedback have been addressed securely. The code has been rewritten to prevent infinite appends, to ensure all syntax/runtime errors are outputted properly, to stop strings from bypassing limits, and to execute user code without arbitrary Pyodide load-time failures.

## Verification Method
- **Timeout**: Artificially throttle the network in the browser DevTools to "Slow 3G" and run an exercise. The 5-second timer shouldn't crash the worker while it's downloading Pyodide.
- **Exceptions**: Run Python code with a syntax error or a NameError. The traceback will now be displayed in the UI's terminal.
- **Memory Exploits**: Run `print("A" * 10**8)` or `while True: try: print("A") except: pass` in the code editor. It will hit the limit once, throw a runtime error cleanly, and safely cap the buffer.
