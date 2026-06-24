const { loadPyodide } = require("pyodide");

async function main() {
    const pyodide = await loadPyodide();
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

run_tests()
`;

    // Test 8: Large array return
    const code8 = `
def massive():
    return [1] * 1000000
`;
    const testCases8 = [{ input: "massive()", expected: "[1, 1]" }];
    
    pyodide.globals.set('__USER_CODE__', code8);
    pyodide.globals.set('__TEST_CASES__', pyodide.toPy(testCases8));

    console.log("\\nRunning Test 8 (Large array return):");
    try {
        const resultsJson8 = await pyodide.runPythonAsync(wrapperCode);
        const res = JSON.parse(resultsJson8);
        console.log("Actual output ends with:", res[0].actual.substring(res[0].actual.length - 100));
        console.log("Passed:", res[0].passed);
    } catch (e) {
        console.error("Test 8 crashed pyodide? ", e.message);
    }
}

main();
