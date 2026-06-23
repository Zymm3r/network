import multiprocessing
import time
import sys

def worker():
    import test_wrapper
    code = "while True:\n  pass"
    cases = [{"input": "1", "expected": "1"}]
    test_wrapper.run_tests(code, cases)

if __name__ == "__main__":
    p = multiprocessing.Process(target=worker)
    p.start()
    p.join(timeout=2)
    if p.is_alive():
        print("Test 4: Worker hung (as expected for infinite loop without print)")
        p.terminate()
        p.join()
        sys.exit(0)
    else:
        print("Test 4: Worker finished unexpectedly")
        sys.exit(1)
