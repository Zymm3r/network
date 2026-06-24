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
    return json.dumps([])

run_tests()
`;

    // Try an extremely large allocation that should OOM Pyodide or JS
    const code5 = `print("A" * 1500000000)`;
    const testCases5 = [{ input: "1", expected: "1" }];
    
    pyodide.globals.set('__USER_CODE__', code5);
    pyodide.globals.set('__TEST_CASES__', pyodide.toPy(testCases5));

    console.log("\\nRunning Test 5 (1.5GB Print):");
    try {
        const resultsJson5 = await pyodide.runPythonAsync(wrapperCode);
        const res = JSON.parse(resultsJson5);
        console.log("Result length:", res[0].actual.length);
        console.log("Passed:", res[0].passed);
        console.log("Actual error snippet:", res[0].actual.substring(0, 100));
    } catch (e) {
        console.error("Test 5 crashed pyodide? ", e.message);
    }
}

main();
