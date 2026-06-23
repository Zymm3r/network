# Handoff: M1 Python Execution & Resource Management (Explorer 3)

## Observation
In `src/lib/pythonWorker.ts`, the global code execution block does not capture the standard output or filter the `RuntimeError` when a user exceeds the output limit. The block at lines 75-86 currently reads:
```python
    # 1. Run user code in the global scope (to define functions, etc.)
    user_globals = {}
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
When `exec(__USER_CODE__, user_globals)` reaches the output limit, `CappedStdout` correctly throws a `RuntimeError("Output limit exceeded")`. However, the `except` block immediately restores `old_stdout` and only returns the traceback. It entirely ignores whatever partial output was successfully captured by `CappedStdout`, meaning the user loses all context of what caused the output loop. The `RuntimeError` traceback itself also leaks to the user.

## Logic Chain
1. The system utilizes `CappedStdout` to limit output size, which raises `RuntimeError("Output limit exceeded")` upon hitting the limit.
2. The second execution block (for test cases) correctly catches this specific error, avoids generating a traceback, and appends the capped output (which includes an explicit `"Output limit exceeded"` error string).
3. The first execution block (global user scope) fails to do this. It grabs `traceback.format_exc()` for all errors, leaking the internal `RuntimeError` traceback.
4. The first block also fails to read `sys.stdout.getvalue()` before `old_stdout` is restored or the `CappedStdout` object is discarded, causing a total loss of the captured print output.
5. To fix this, we need to explicitly instantiate `CappedStdout` into a variable so we can invoke `.getvalue()` if an error occurs, and we need to check if the error is our internal `RuntimeError` to suppress the stack trace and attach the captured output to the `actual` field of the test results.

## Caveats
- If the global execution is successful, the standard output produced during it is still discarded. This is the existing behavior, and we assume it's acceptable (or intended) not to pollute individual test cases with successful global print statements.
- The `CappedStdout` includes the string `"\n[Error: Output limit exceeded (50000 chars or 1000 lines)]"` at the end of the capped output. We just need to pass this string back to the user without appending the stack trace.

## Conclusion
We need to modify the global `try/except` block to capture and evaluate the `CappedStdout` output on error. 

**Changes needed in `src/lib/pythonWorker.ts`**:

Replace lines 74-87 with:
```python
    # 1. Run user code in the global scope (to define functions, etc.)
    user_globals = {}
    old_stdout = sys.stdout
    capped_stdout = CappedStdout()
    sys.stdout = capped_stdout
    try:
        exec(__USER_CODE__, user_globals)
    except Exception as e:
        output = capped_stdout.getvalue().strip()
        if isinstance(e, RuntimeError) and "Output limit exceeded" in str(e):
            error_msg = output
        else:
            tb = traceback.format_exc(limit=10)
            if output:
                error_msg = output + "\\n" + tb
            else:
                error_msg = tb
        return json.dumps([{"input": tc["input"], "actual": error_msg, "expected": tc["expected"], "passed": False} for tc in __TEST_CASES__])
    finally:
        sys.stdout = old_stdout
```

## Verification Method
1. Make the specified replacement in `src/lib/pythonWorker.ts`.
2. Run the system and provide python code containing an infinite loop printing a lot of output in the global scope:
```python
while True:
    print("global leak")
```
3. Observe that the execution returns test cases marked `passed: False`.
4. Observe that the `actual` output in the results contains `"global leak"` followed by `"[Error: Output limit exceeded (50000 chars or 1000 lines)]"`, but **no traceback** mentioning `RuntimeError`.
