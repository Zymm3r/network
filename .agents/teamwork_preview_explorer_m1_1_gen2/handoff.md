# Handoff Report

## 1. Observation
- Inspected `src/lib/pythonWorker.ts`.
- Located the global user code execution `try/except` block at lines 76-86.
- The current implementation is:
  ```python
      try:
          old_stdout = sys.stdout
          sys.stdout = CappedStdout()
          exec(__USER_CODE__, user_globals)
      except Exception as e:
          sys.stdout = old_stdout
          # If user code has a syntax error or fails to load, all test cases fail with this error
          error_msg = traceback.format_exc(limit=10)
          return json.dumps([{"input": tc["input"], "actual": error_msg, "expected": tc["expected"], "passed": False} for tc in __TEST_CASES__])
      finally:
          sys.stdout = old_stdout
  ```
- This block completely ignores the contents of `sys.stdout.getvalue()` if an exception occurs during the global initialization.
- If the exception is `RuntimeError("Output limit exceeded")`, the trace is leaked into `error_msg` instead of correctly suppressing the trace and showing the captured output.
- The inner `try/except` block (for test cases, lines 109-120) correctly catches `RuntimeError` and captures output.

## 2. Logic Chain
1. To fix the global execution block leak, we need to apply the same logic used in the test case exception handler.
2. Inside `except Exception as e:`, we must first extract the output: `output = sys.stdout.getvalue().strip()`.
3. Then we check if the exception is `RuntimeError` and contains "Output limit exceeded". If it is, we use `output` as the `error_msg` (suppressing the stack trace).
4. If it's a different exception, we append the traceback to `output` (if output exists) or use the traceback directly.
5. The `sys.stdout = old_stdout` assignment inside the `except` block can be safely removed, as the `finally` block guarantees `old_stdout` restoration even when returning from the `except` block.

## 3. Caveats
- Ensure `sys.stdout.getvalue()` is called *before* any restoration of `sys.stdout = old_stdout`. Otherwise, it would attempt to call `.getvalue()` on the original stdout.
- The string uses `\\n` for explicit newline character formatting because the python code itself is wrapped inside a JavaScript template literal. We must preserve this syntax (`"\\n"`).

## 4. Conclusion
We must patch the `except Exception as e:` block for the `exec(__USER_CODE__, user_globals)` to correctly capture `sys.stdout.getvalue()` and suppress the `RuntimeError` stack trace.

### Proposed Code Replacement
Replace `src/lib/pythonWorker.ts` lines 80-84 with the following:
```python
    except Exception as e:
        output = sys.stdout.getvalue().strip()
        if isinstance(e, RuntimeError) and "Output limit exceeded" in str(e):
            error_msg = output
        else:
            tb = traceback.format_exc(limit=10)
            if output:
                error_msg = output + "\\n" + tb
            else:
                error_msg = tb
        return json.dumps([{"input": tc["input"], "actual": error_msg, "expected": tc["expected"], "passed": False} for tc in __TEST_CASES__])
```

## 5. Verification Method
- **Implementation check**: Review `src/lib/pythonWorker.ts` to ensure lines 80-84 match the proposed change.
- **Run the code**: Execute a payload that exceeds 50000 chars outside any function (e.g., `print("a" * 60000)`) in the application and verify that the output trace does not leak `RuntimeError` and correctly prints the limit exceeded message instead.
