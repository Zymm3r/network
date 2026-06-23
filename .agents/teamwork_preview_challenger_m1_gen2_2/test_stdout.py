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
        # Simulate memory usage
        encoded = s.encode('utf-8')
        self.bytes_written += len(encoded)
        self.lines_written += s.count('\n')
        
        if self.bytes_written > 50000 or self.lines_written > 1000:
            allowed = max(0, 50000 - prev_bytes)
            super().write(s[:allowed])
            super().write("\n[Error: Output limit exceeded (50KB or 1000 lines)]")
            raise RuntimeError("Output limit exceeded: 50KB or 1000 lines")
            
        return super().write(s)

if __name__ == "__main__":
    stdout = CappedStdout()
    try:
        # Create a massive string (e.g., 1GB)
        # We'll see if creating it and encoding it blows up memory.
        massive_str = "A" * 100000000  # 100MB string
        print("Created massive string.")
        stdout.write(massive_str)
    except RuntimeError as e:
        print("Caught RuntimeError:", e)
        print("Buffer length:", len(stdout.getvalue()))
