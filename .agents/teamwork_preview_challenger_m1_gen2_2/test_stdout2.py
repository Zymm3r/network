import sys
import io

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
        self.lines_written += s.count('\n')
        
        if self.bytes_written > 50000 or self.lines_written > 1000:
            allowed = max(0, 50000 - prev_bytes)
            super().write(s[:allowed])
            super().write("\n[Error: Output limit exceeded (50KB or 1000 lines)]")
            raise RuntimeError("Output limit exceeded: 50KB or 1000 lines")
            
        return super().write(s)

def run():
    stdout = CappedStdout()
    sys.stdout = stdout
    try:
        # Simulate user code that catches the error
        for _ in range(100):
            try:
                sys.stdout.write("A" * 1000)
            except RuntimeError:
                pass
    finally:
        sys.stdout = sys.__stdout__
    
    # Check if the buffer grew beyond the limit due to the error message being appended
    print("Buffer length:", len(stdout.getvalue()))
    print("Bytes written tracker:", stdout.bytes_written)

if __name__ == "__main__":
    run()
