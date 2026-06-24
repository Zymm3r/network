import sys
import io

class CappedStdout(io.StringIO):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.bytes_written = 0
        self.lines_written = 0
        self.limit_reached = False

    def write(self, s):
        if getattr(self, 'limit_reached', False):
            raise RuntimeError("Output limit exceeded: 50KB or 1000 lines")
            
        if not isinstance(s, str):
            s = str(s)
            
        if len(s) > 50000:
            s = s[:50000]
            
        prev_bytes = self.bytes_written
        prev_lines = self.lines_written
        
        self.bytes_written += len(s.encode('utf-8'))
        self.lines_written += s.count('\n')
        
        if self.bytes_written > 50000 or self.lines_written > 1000:
            self.limit_reached = True
            
            allowed_bytes = max(0, 50000 - prev_bytes)
            s_trunc = s[:allowed_bytes]
            while len(s_trunc.encode('utf-8')) > allowed_bytes and len(s_trunc) > 0:
                s_trunc = s_trunc[:-1]
                
            allowed_lines = max(0, 1000 - prev_lines)
            parts = s_trunc.split('\n')
            if len(parts) > allowed_lines + 1:
                s_trunc = '\n'.join(parts[:allowed_lines + 1])
                
            super().write(s_trunc)
            super().write("\n[Error: Output limit exceeded (50KB or 1000 lines)]")
            raise RuntimeError("Output limit exceeded: 50KB or 1000 lines")
            
        return super().write(s)

stdout = CappedStdout()
try:
    stdout.write("A" * 60000)
except RuntimeError as e:
    print(e)
print(f"Bytes written: {len(stdout.getvalue())}")
print(f"Last bits: {stdout.getvalue()[-100:]}")

stdout = CappedStdout()
try:
    stdout.write("\n" * 20000)
except RuntimeError as e:
    print(e)
print(f"Lines written: {stdout.getvalue().count(chr(10))}")
print(f"Last bits: {repr(stdout.getvalue()[-100:])}")

stdout = CappedStdout()
attempts = 0
try:
    while attempts < 10:
        try:
            stdout.write("A" * 10000)
        except RuntimeError:
            attempts += 1
except KeyboardInterrupt:
    pass
print(f"Bytes written in loop: {len(stdout.getvalue())}")
