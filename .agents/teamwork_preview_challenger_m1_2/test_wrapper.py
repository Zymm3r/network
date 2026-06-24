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
        self.lines_written += s.count('\n')
        
        if self.bytes_written > 50000 or self.lines_written > 1000:
            super().write(s)
            super().write("\n[Error: Output limit exceeded (50KB or 1000 lines)]")
            raise RuntimeError("Output limit exceeded: 50KB or 1000 lines")
            
        return super().write(s)

def run_tests(__USER_CODE__, __TEST_CASES__):
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

if __name__ == "__main__":
    print("Test 1: Infinite loop with print hitting limit during test case execution")
    code1 = "def f():\n  while True:\n    print('spam')\n"
    cases1 = [{"input": "f()", "expected": "doesn't matter"}]
    res1 = run_tests(code1, cases1)
    print("Result 1:", res1)

    print("\nTest 2: Code returning a value without print() successfully evaluates and produces output")
    code2 = "def add(a, b):\n  return a + b\n"
    cases2 = [{"input": "add(2, 3)", "expected": "5"}]
    res2 = run_tests(code2, cases2)
    print("Result 2:", res2)

    print("\nTest 3: Infinite loop in user code initialization")
    code3 = "while True:\n  print('init')"
    cases3 = [{"input": "1", "expected": "1"}]
    res3 = run_tests(code3, cases3)
    print("Result 3:", res3)
