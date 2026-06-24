# Review Report: M1 Python Execution & Resource Management

## Review Summary

**Verdict**: REQUEST_CHANGES

The Gen2 worker correctly implemented the structural requirements: lazy initialization of the Web Worker, CappedStdout memory limits, and improved Terminal UX. However, adversarial stress-testing revealed a **critical race condition** between the lazy-loaded Pyodide network request and the hardcoded 5-second execution timeout, which will completely break the feature for users on average network connections.

## Findings

### [Critical] 5-Second Timeout Terminates Pyodide Initialization

- **What**: The `runPythonTests` function in `src/hooks/usePython.ts` sets a strict 5000ms timeout that begins as soon as the message is posted to the worker.
- **Where**: `src/hooks/usePython.ts` (lines 62-72) and `src/lib/pythonWorker.ts` (lines 6-13).
- **Why**: Because Pyodide is now lazily loaded, the *first* execution includes downloading ~10MB of Pyodide WASM and JS. On connections slower than ~16Mbps, downloading 10MB takes more than 5 seconds. The timeout will aggressively terminate the worker mid-download, throw a false "Infinite Loop" error to the user, and tear down the worker. The user will be stuck in a permanent failure loop where Pyodide can never finish downloading.
- **Attack scenario**: User on a 3G/4G or standard Wi-Fi connection clicks "Run". Pyodide starts downloading. At 5.0 seconds, `usePython.ts` terminates the worker. Download is aborted. User receives an "Infinite Loop" error despite writing correct code.
- **Mitigation**: Separate the initialization phase from the execution phase. The worker should send a `"ready"` or `"started"` message *after* Pyodide is loaded, and the 5-second timeout should only begin counting down *after* execution has actually started.

### [Major] CappedStdout Ignores Line Limit During Truncation

- **What**: In `pythonWorker.ts`, the `CappedStdout` truncation logic correctly catches line-limit violations (`self.lines_written > 1000`), but the truncation slicing `s[:allowed]` only restricts by *bytes*, not lines.
- **Where**: `src/lib/pythonWorker.ts` (lines 45-48).
- **Why**: If a user runs `print("\n" * 20000)`, it triggers the `> 1000` line check. However, since `bytes_written` is only 20000 (well under 50000), `allowed` evaluates to 50000. `s[:50000]` includes all 20000 newlines, which are then written to the buffer.
- **Blast Radius**: While memory is safe (capped at 50KB), the UI will receive up to 50,000 lines of output, which may cause significant layout thrashing or browser lag.
- **Mitigation**: Incorporate line counts into the truncation logic, e.g., `max_allowed_lines = 1000 - prev_lines`, and split/truncate the string by `\n` if the line limit is the breached constraint.

### [Minor] Dead State: `isInitializing`

- **What**: `usePython.ts` defines `const [isInitializing, setIsInitializing] = useState(false);` but never calls `setIsInitializing`.
- **Where**: `src/hooks/usePython.ts` (line 9).
- **Why**: The UI is unable to differentiate between "compiling" and "downloading Pyodide", which means the user sees "กำลังคอมไพล์..." for the entire duration of the heavy network request, which is poor UX.

## Verified Claims

- **Lazy loading implementation**: Verified via `view_file` on `usePython.ts`. The worker is no longer eagerly initialized on mount; it instantiates on `runPythonTests`. -> **Pass** (but breaks due to timeout)
- **CappedStdout memory limit**: Verified via `pythonWorker.ts`. The 50KB byte limit correctly prevents OOM attacks by strictly truncating `super().write()`. -> **Pass**
- **Terminal UX displays tc.actual**: Verified via `ExerciseCard.tsx` (line 518). Terminal directly references `${tc?.actual ?? 'error'}`. -> **Pass**
- **Build passes**: Verified via `npm run build`. -> **Pass**

## Conclusion

The implementation requires revision. The lazy-loading feature directly conflicts with the hardcoded execution timeout. Please address the Pyodide network initialization timeout issue to ensure the platform works on standard internet connections, and fix the line limit truncation loophole.
