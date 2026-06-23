import { loadPyodide } from "pyodide";

async function runTest(code, testCases, description) {
    const pyodide = await loadPyodide();

    pyodide.globals.set('__USER_CODE__', code);
    pyodide.globals.set('__TEST_CASES__', pyodide.toPy(testCases));

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
        self.bytes_written += len(s.encode('utf-8'))
        self.lines_written += s.count('\\n')
        
        if self.bytes_written > 50000 or self.lines_written > 1000:
            super().write(s)
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
                "actual": "Length of output: " + str(len(output)),
                "expected": tc["expected"],
                "passed": output == tc["expected"]
            })
        except Exception as e:
            output = sys.stdout.getvalue().strip()
            if not output:
                output = "Error: " + str(e)
            
            results.append({
                "input": tc["input"],
                "actual": "Length of actual output containing error: " + str(len(output)),
                "expected": tc["expected"],
                "passed": False
            })
        finally:
            sys.stdout = old_stdout
            
    return json.dumps(results)

run_tests()
`;

    try {
        const resultsJson = await pyodide.runPythonAsync(wrapperCode);
        console.log(`\n--- Test: ${description} ---`);
        console.log("Success: true");
        console.log("Results:", JSON.parse(resultsJson));
    } catch (error) {
        console.log(`\n--- Test: ${description} ---`);
        console.log("Success: false");
        console.log("Error:", error.message || String(error));
    }
}

async function main() {
    await runTest(
        "def return_huge_list():\n  return list(range(1000000))", // Returns a list with 1 million ints
        [{ input: "return_huge_list()", expected: "A" }],
        "Return Huge List Bomb"
    );
}

main();
