import { loadPyodide } from 'pyodide';

async function main() {
  const pyodide = await loadPyodide({
    indexURL: 'node_modules/pyodide/',
  });

  const code1 = `
print("a" * 100000)
`;

  const testCases1 = [
    { input: "1", expected: "1" }
  ];

  pyodide.globals.set('__USER_CODE__', code1);
  pyodide.globals.set('__TEST_CASES__', pyodide.toPy(testCases1));

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

    # 2. Run each test case against the user_globals
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

print(run_tests())
`;

  try {
    const resultsJson1 = await pyodide.runPythonAsync(wrapperCode);
    console.log(resultsJson1);
  } catch (err) {
    console.error("Code failed:", err);
  }
}

main().catch(console.error);
