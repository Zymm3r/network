const { loadPyodide } = require("pyodide");

async function main() {
    const pyodide = await loadPyodide();
    
    // Test 1: Massive print string
    const code1 = `print("A" * 10000000)`;
    const testCases1 = [{ input: "1", expected: "1" }];

    pyodide.globals.set('__USER_CODE__', code1);
    pyodide.globals.set('__TEST_CASES__', pyodide.toPy(testCases1));

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
    # 1. Run user code in the global scope (to define functions, etc.)
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

    console.log("Running Test 1 (Massive Print):");
    try {
        const resultsJson = await pyodide.runPythonAsync(wrapperCode);
        console.log(JSON.parse(resultsJson));
    } catch (e) {
        console.error("Test 1 crashed pyodide?", e);
    }

    // Test 2: Returning a value without print
    const code2 = `def add(a, b):\n    return a + b`;
    const testCases2 = [{ input: "add(2, 3)", expected: "5" }];
    
    pyodide.globals.set('__USER_CODE__', code2);
    pyodide.globals.set('__TEST_CASES__', pyodide.toPy(testCases2));

    console.log("\\nRunning Test 2 (Return without print):");
    try {
        const resultsJson2 = await pyodide.runPythonAsync(wrapperCode);
        console.log(JSON.parse(resultsJson2));
    } catch (e) {
        console.error("Test 2 crashed?", e);
    }

    // Test 3: Returning a massive string directly as a value
    const code3 = `def massive():\n    return "A" * 10000000`;
    const testCases3 = [{ input: "massive()", expected: "A" }];
    pyodide.globals.set('__USER_CODE__', code3);
    pyodide.globals.set('__TEST_CASES__', pyodide.toPy(testCases3));

    console.log("\\nRunning Test 3 (Returning a massive string):");
    try {
        const resultsJson3 = await pyodide.runPythonAsync(wrapperCode);
        console.log(JSON.parse(resultsJson3));
    } catch (e) {
        console.error("Test 3 crashed?", e);
    }
}

main();
