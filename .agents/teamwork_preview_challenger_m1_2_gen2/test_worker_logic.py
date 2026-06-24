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
        self.lines_written += s.count('\n')
        
        if self.chars_written > 50000 or self.lines_written > 1000:
            self.limit_reached = True
            allowed_chars = max(0, 50000 - prev_chars)
            truncated_s = s[:allowed_chars]
            
            allowed_lines = max(0, 1000 - prev_lines)
            lines = truncated_s.split('\n')
            if len(lines) > allowed_lines + 1:
                truncated_s = '\n'.join(lines[:allowed_lines + 1])
                
            super().write(truncated_s)
            super().write("\n[Error: Output limit exceeded (50000 chars or 1000 lines)]")
            raise RuntimeError("Output limit exceeded")
            
        return super().write(s)

def run_tests(user_code, test_cases):
    global __USER_CODE__, __TEST_CASES__
    __USER_CODE__ = user_code
    __TEST_CASES__ = test_cases
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
                error_msg = output + "\n" + tb
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
            # getvalue() might have the output with the appended error from CappedStdout
            output = sys.stdout.getvalue().strip()
            if isinstance(e, RuntimeError) and "Output limit exceeded" in str(e):
                pass
            else:
                tb = traceback.format_exc(limit=10)
                if output:
                    output = output + "\n" + tb
                else:
                    output = tb
            # if output already contains the custom error, it's fine
            
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
    import json
    
    # Test 1: Global scope exceeded lines
    user_code_lines = "for i in range(2000):\n    print('line', i)"
    res1 = run_tests(user_code_lines, [{"input": "1", "expected": "1"}])
    print("Test 1 (Global lines):")
    print(res1)
    
    # Test 2: Global scope exceeded chars
    user_code_chars = "print('a' * 60000)"
    res2 = run_tests(user_code_chars, [{"input": "1", "expected": "1"}])
    print("\nTest 2 (Global chars):")
    # limit chars output so we can see
    res2_obj = json.loads(res2)
    for r in res2_obj:
        if len(r["actual"]) > 100:
            r["actual"] = r["actual"][:50] + "... [TRUNCATED] ..." + r["actual"][-50:]
    print(json.dumps(res2_obj, indent=2))
    
    # Test 3: Normal error in global scope
    user_code_err = "1 / 0"
    res3 = run_tests(user_code_err, [{"input": "1", "expected": "1"}])
    print("\nTest 3 (Global err):")
    print(res3)

    # Test 4: Catching the limit exception
    user_code_catch = """
try:
    for i in range(2000):
        print("line", i)
except Exception:
    pass
print("still running!")
"""
    res4 = run_tests(user_code_catch, [{"input": "1", "expected": "1"}])
    print("\nTest 4 (Catch global):")
    print(res4)
