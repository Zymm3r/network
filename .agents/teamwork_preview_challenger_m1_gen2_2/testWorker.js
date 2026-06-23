import { loadPyodide } from 'pyodide';

async function main() {
  const pyodide = await loadPyodide();

  const code1 = `print("A" * 10000000)`;
  const code2 = ``;
  const testCases1 = [{ input: '1', expected: '1' }];
  const testCases2 = [{ input: '42', expected: '42' }];

  const wrapperCode = `
import sys
import io
import json

class CappedStdout(io.StringIO):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.bytes_written = 0
        self.lines_written = 0

    def write(self, s):
        if not isinstance(s, str):
            s = str(s)
            
        prev_bytes = self.bytes_written
        # This len(s.encode('utf-8')) might cause memory explosion if s is huge!
        self.bytes_written += len(s.encode('utf-8'))
        self.lines_written += s.count('\\n')
        
        if self.bytes_written > 50000 or self.lines_written > 1000:
            allowed = max(0, 50000 - prev_bytes)
            super().write(s[:allowed])
            super().write("\\n[Error: Output limit exceeded (50KB or 1000 lines)]")
            raise RuntimeError("Output limit exceeded: 50KB or 1000 lines")
            
        return super().write(s)

def run_tests():
    user_globals = {}
    try:
        old_stdout = sys.stdout
        sys.stdout = CappedStdout()
        exec(__USER_CODE__, user_globals)
    except Exception as e:
        sys.stdout = old_stdout
        error_msg = str(e)
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
            if not output:
                output = "Error: " + str(e)
            results.append({
                "input": tc["input"],
                "actual": output,
                "expected": tc["expected"],
                "passed": False
            })
        finally:
            sys.stdout = old_stdout
            
    return json.dumps(results)
`;

  // Test 1: massive print string
  console.log("Running Test 1: Massive print string");
  pyodide.globals.set('__USER_CODE__', code1);
  pyodide.globals.set('__TEST_CASES__', pyodide.toPy(testCases1));
  try {
    const resultsJson = await pyodide.runPythonAsync(wrapperCode + "\\nrun_tests()");
    console.log("Test 1 Result:", resultsJson);
  } catch (err) {
    console.error("Test 1 Failed with Error:", err.message);
  }

  // Test 2: return value without print
  console.log("\\nRunning Test 2: Return value without print");
  pyodide.globals.set('__USER_CODE__', code2);
  pyodide.globals.set('__TEST_CASES__', pyodide.toPy(testCases2));
  try {
    const resultsJson = await pyodide.runPythonAsync(wrapperCode + "\\nrun_tests()");
    console.log("Test 2 Result:", resultsJson);
  } catch (err) {
    console.error("Test 2 Failed with Error:", err.message);
  }
}

main().catch(console.error);
