import { loadPyodide } from 'pyodide';

async function main() {
  const pyodide = await loadPyodide();

  const runTest = async (code, testCases) => {
    pyodide.globals.set('__USER_CODE__', code);
    pyodide.globals.set('__TEST_CASES__', pyodide.toPy(testCases));

    const wrapperCode = `
import sys
import io
import json
import traceback

class CappedStdout(io.StringIO):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.chars_written = 0
        self.lines_written = 0
        self.limit_reached = False

    def write(self, s):
        if self.limit_reached:
            raise RuntimeError("Output limit exceeded")
            
        if not isinstance(s, str):
            s = str(s)
            
        if len(s) > 50000:
            s = s[:50000]
            
        prev_chars = self.chars_written
        prev_lines = self.lines_written
        
        self.chars_written += len(s)
        self.lines_written += s.count('\\n')
        
        if self.chars_written > 50000 or self.lines_written > 1000:
            self.limit_reached = True
            allowed_chars = max(0, 50000 - prev_chars)
            truncated_s = s[:allowed_chars]
            
            allowed_lines = max(0, 1000 - prev_lines)
            lines = truncated_s.split('\\n')
            if len(lines) > allowed_lines + 1:
                truncated_s = '\\n'.join(lines[:allowed_lines + 1])
                
            super().write(truncated_s)
            super().write("\\n[Error: Output limit exceeded (50000 chars or 1000 lines)]")
            raise RuntimeError("Output limit exceeded")
            
        return super().write(s)

def run_tests():
    user_globals = {}
    try:
        old_stdout = sys.stdout
        sys.stdout = CappedStdout()
        exec(__USER_CODE__, user_globals)
    except Exception as e:
        sys.stdout = old_stdout
        error_msg = traceback.format_exc(limit=10)
        return json.dumps([{"input": tc["input"], "actual": error_msg, "expected": tc["expected"], "passed": False} for tc in __TEST_CASES__])
    finally:
        sys.stdout = old_stdout

    results = []
    for tc in __TEST_CASES__:
        old_stdout = sys.stdout
        sys.stdout = CappedStdout()
        try:
            try:
                ret = eval(tc["input"], user_globals)
                if ret is not None:
                    print(ret)
            except SyntaxError:
                exec(tc["input"], user_globals)
            
            output = sys.stdout.getvalue().strip()
            
            results.append({
                "input": tc["input"],
                "actual": output,
                "expected": tc["expected"],
                "passed": output == tc["expected"]
            })
        except Exception as e:
            output = sys.stdout.getvalue().strip()
            if isinstance(e, RuntimeError) and "Output limit exceeded" in str(e):
                pass
            else:
                tb = traceback.format_exc(limit=10)
                if output:
                    output = output + "\\n" + tb
                else:
                    output = tb
            
            results.append({
                "input": tc["input"],
                "actual": output,
                "expected": tc["expected"],
                "passed": False
            })
        finally:
            sys.stdout = old_stdout
            
    return json.dumps(results)

run_tests()
`;
    const resultsJson = await pyodide.runPythonAsync(wrapperCode);
    return JSON.parse(resultsJson);
  };

  let allPassed = true;

  // Case 1: Very long lines, many newlines to test line limit bypass (1000 lines).
  try {
    const res1 = await runTest('pass', [{ input: 'print("x\\n" * 2000)', expected: '' }]);
    const actual = res1[0].actual;
    if (actual.includes('Output limit exceeded')) {
      console.log('Case 1 PASS: Truncated correctly on 2000 newlines.');
    } else {
      console.log('Case 1 FAIL: Did not truncate properly.', res1);
      allPassed = false;
    }
  } catch (err) {
    console.log('Case 1 FAIL with error:', err);
    allPassed = false;
  }

  // Case 2: Huge strings to trigger `encode` OOM.
  try {
    const res2 = await runTest('pass', [{ input: 'print("a" * (10**7))', expected: '' }]);
    const actual = res2[0].actual;
    if (actual.includes('Output limit exceeded') || actual.includes('MemoryError')) {
      console.log('Case 2 PASS: Handled huge string gracefully.');
    } else {
      console.log('Case 2 FAIL: Did not handle huge string properly.', res2);
      allPassed = false;
    }
  } catch (err) {
    console.log('Case 2 FAIL with error:', err);
    allPassed = false;
  }

  // Case 3: Catching RuntimeError in while True loop. 
  try {
    const res3 = await runTest('pass', [{ input: `
for i in range(100):
    try:
        print("A" * 1000)
    except RuntimeError:
        pass
`, expected: '' }]);
    const actual = res3[0].actual;
    if (actual.includes('[Error: Output limit exceeded')) {
      console.log('Case 3 PASS: RuntimeError is caught by user but limit holds.');
    } else {
      console.log('Case 3 FAIL: Limit did not hold.', res3);
      allPassed = false;
    }
  } catch (err) {
    console.log('Case 3 FAIL with error:', err);
    allPassed = false;
  }

  // Case 4: Testing that normal execution exceptions show tracebacks.
  try {
    const res4 = await runTest('pass', [{ input: `
def f():
    return undefined_var
f()
`, expected: '' }]);
    const actual = res4[0].actual;
    if (actual.includes('NameError') && actual.includes('Traceback')) {
      console.log('Case 4 PASS: Traceback is shown.');
    } else {
      console.log('Case 4 FAIL: Traceback not found.', res4);
      allPassed = false;
    }
  } catch (err) {
    console.log('Case 4 FAIL with error:', err);
    allPassed = false;
  }

  if (allPassed) {
    console.log("ALL TESTS PASS");
  } else {
    console.log("SOME TESTS FAILED");
  }
}

main().catch(console.error);
