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
        self.bytes_written += len(s.encode('utf-8'))
        self.lines_written += s.count('\n')
        
        if self.bytes_written > 50000 or self.lines_written > 1000:
            super().write(s)
            super().write("\n[Error: Output limit exceeded (50KB or 1000 lines)]")
            raise RuntimeError("Output limit exceeded: 50KB or 1000 lines")
            
        return super().write(s)

stdout = CappedStdout()
try:
    stdout.write('A' * 1000000)
except Exception as e:
    pass

print('Length of buffer:', len(stdout.getvalue()))
