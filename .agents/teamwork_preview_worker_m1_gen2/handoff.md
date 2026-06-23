# Handoff Report

## Observation
- `src/lib/pythonWorker.ts`: Found `CappedStdout.write` limiting logic which checked `self.bytes_written` before adding the new length, but called `super().write(s)` with the entire string even if it pushed the total bytes beyond the limit. This would have caused an out-of-memory exception or massive unhandled output.
- `src/app/components/ExerciseCard.tsx`: Found the `useEffect` that calls `initWorker()` on mount (lines 113-115).
- `src/app/components/ExerciseCard.tsx`: Found `TerminalLine` component missing `whitespace-pre-wrap` styling, and the text logic showing `but got error` instead of the actual error.

## Logic Chain
- For `pythonWorker.ts`, I updated `CappedStdout.write` to first record `prev_bytes = self.bytes_written`, calculate the new bytes/lines size, and if it exceeds the limit, determine the `allowed` character limit via `max(0, 50000 - prev_bytes)`. Then it calls `super().write(s[:allowed])` before writing the error message and raising `RuntimeError`.
- For `ExerciseCard.tsx`, I removed the `useEffect` calling `initWorker()`. This prevents eagerly spinning up the Python worker upon mount if it's not needed.
- For `ExerciseCard.tsx`'s `TerminalLine`, I added `whitespace-pre-wrap` to its outer wrapper.
- For `ExerciseCard.tsx`'s test result display logic, I changed the fallback text to `but got: ${tc?.actual ?? 'error'}`. This exposes Python syntax/runtime errors and mismatches to the student directly in the UI.

## Caveats
- No caveats. The build command `npm run build` executed successfully without compilation issues.

## Conclusion
The bugs from Iteration 1 have been resolved according to the requirements: Python execution output limiting is now truly truncated, eager worker initialization on mount is removed, and actual test failure outputs are fully exposed to the user terminal with proper whitespace handling.

## Verification Method
1. `npm run build` in `C:\Users\UTHtest\Downloads\app.hotel`
2. Test code with heavy output in the browser to ensure it truncates output up to 50KB.
3. Test code with syntax errors to ensure they are visible with line breaks in the terminal UI.
