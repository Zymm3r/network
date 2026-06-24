# Handoff Report

## Observation
- In `src/lib/pythonWorker.ts` (lines ~74-87), `run_tests()` executes the user's code globally inside a `try/except` block using `exec(__USER_CODE__, user_globals)`.
- In this global block, `sys.stdout` is replaced with `CappedStdout()`.
- When an exception occurs during the global `exec` execution, the `except` block catches the exception and unconditionally sets `error_msg = traceback.format_exc(limit=10)`.
- The code completely ignores any captured output that is in the current `CappedStdout` (`sys.stdout.getvalue()`), leading to lost `stdout` and allowing the raw internal `RuntimeError("Output limit exceeded")` traceback to leak into the test outputs.

## Logic Chain
1. The internal test case runner loop already handles output limit exceptions correctly by checking `if isinstance(e, RuntimeError) and "Output limit exceeded" in str(e)` and preserving the user's output up to the limit using `sys.stdout.getvalue()`.
2. The global `exec(__USER_CODE__)` block needs the same treatment. We must instantiate `CappedStdout()` and keep a reference to it (e.g., `capped_out = CappedStdout()`) so we can access its contents in the `except` block.
3. Inside the `except` block, we extract the partial standard output using `output = capped_out.getvalue().strip()`.
4. If the exception is the `Output limit exceeded` `RuntimeError`, we should assign `error_msg = output` to show the truncated text and our custom error label, avoiding the Python traceback.
5. If it's a different runtime or syntax error (e.g., `SyntaxError`), we concatenate `output` and `traceback.format_exc()` so any partial print statements before the error are retained.

## Caveats
- `sys.stdout = old_stdout` is executed in both the `except` block and in the `finally` block in the proposed code (just like the original code). This is redundant but harmless. We keep `finally` to ensure stdout is strictly reset.

## Conclusion
Modify the `run_tests` function in `src/lib/pythonWorker.ts` to patch the global execution block so it mirrors the logic of the test-case runner.

Target block replacement (around lines 74-87):
```python
    # 1. Run user code in the global scope (to define functions, etc.)
    user_globals = {}
    capped_out = CappedStdout()
    old_stdout = sys.stdout
    sys.stdout = capped_out
    try:
        exec(__USER_CODE__, user_globals)
    except Exception as e:
        sys.stdout = old_stdout
        output = capped_out.getvalue().strip()
        if isinstance(e, RuntimeError) and "Output limit exceeded" in str(e):
            error_msg = output
        else:
            tb = traceback.format_exc(limit=10)
            error_msg = output + "\\n" + tb if output else tb
        return json.dumps([{"input": tc["input"], "actual": error_msg, "expected": tc["expected"], "passed": False} for tc in __TEST_CASES__])
    finally:
        sys.stdout = old_stdout
```

## Verification Method
- Write a Python snippet that loops and prints until exceeding 1000 lines or 50000 chars *outside* any function or test case (i.e. in the global scope).
- Execute it via the Web Worker.
- Verify that the resulting JSON response has `"actual": "...[Error: Output limit exceeded (50000 chars or 1000 lines)]"`.
- Verify the string `RuntimeError` or `Traceback` is absent from the `"actual"` field.
- Verify that normal exceptions (e.g., `print('hi'); 1/0`) at the global scope still show the traceback alongside the partial output ("hi").
