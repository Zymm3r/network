# Review Handoff Report

## 1. Observation
- **Lazy Loading**: In `src/hooks/usePython.ts`, the `initWorker` function is only called when `runPythonTests` is invoked. `src/app/components/ExerciseCard.tsx` does not eagerly initialize the Pyodide Web Worker on mount.
- **Memory Limit (CappedStdout)**: In `src/lib/pythonWorker.ts`, the custom `CappedStdout` correctly limits the output to `50000` bytes or `1000` lines, raising a `RuntimeError` if exceeded. 
- **Build**: Running `npm run build` completed successfully without type errors.
- **Terminal UX & Exception Handling Bug**: In `src/lib/pythonWorker.ts` (lines 90-95), when an exception is caught during test evaluation:
  ```python
          except Exception as e:
              # getvalue() might have the output with the appended error from CappedStdout
              output = sys.stdout.getvalue().strip()
              if not output:
                  output = "Error: " + str(e)
              # if output already contains the custom error, it's fine
  ```
  If `output` is not empty (i.e., the user's code printed something before the exception), the exception message (`str(e)`) is never appended or displayed.

## 2. Logic Chain
1. The implementation successfully defers pyodide loading, meeting the lazy loading requirement.
2. The `CappedStdout` effectively prevents browser crashes by intercepting and truncating massive strings, fulfilling the memory limit requirement.
3. However, the exception handling logic in `pythonWorker.ts` has a critical flaw. The developer assumed that if `output` is not empty, it contains the `CappedStdout`'s `RuntimeError` string. But this logic swallows *all* standard Python exceptions (e.g., `NameError`, `TypeError`, `ZeroDivisionError`) if they occur after a `print()` statement.
4. For example, if a user writes:
   ```python
   def test():
       print("Doing something")
       1 / 0
   ```
   The terminal will only display: `Expected "..." but got: Doing something`. The `ZeroDivisionError` is completely hidden from the user, making debugging extremely difficult.

## 3. Caveats
- I did not test the exact UI rendering in a browser, but the React code correctly maps `tc.actual` to the terminal UI. The bug is strictly within the Python worker logic.

## 4. Conclusion
**Verdict**: **REQUEST_CHANGES**

The milestone mostly passes and is implemented beautifully, but the exception swallowing bug in `pythonWorker.ts` is a major usability issue for a learning platform. It must be fixed before approval.

**Required Changes**:
Update the exception block in `pythonWorker.ts` to ensure standard exceptions are appended to the output even if the output is not empty. You can differentiate between the custom `Output limit exceeded` error and general exceptions, for example:

```python
        except Exception as e:
            output = sys.stdout.getvalue().strip()
            if "Output limit exceeded" not in str(e):
                err_msg = type(e).__name__ + ": " + str(e)
                output = (output + "\n" + err_msg) if output else err_msg
```

## 5. Verification Method
- Make the requested change in `src/lib/pythonWorker.ts`.
- Run the provided `npm run build` to ensure no syntax errors.
- Optionally, create a script testing `run_tests()` with a function that prints something and then raises a `ZeroDivisionError` to confirm the error text is preserved in the output.
