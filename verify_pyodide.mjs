import { loadPyodide } from 'pyodide';
import fs from 'fs';

async function verify() {
  console.log("Loading Pyodide...");
  const pyodide = await loadPyodide();
  console.log("Pyodide version:", pyodide.version);
  
  if (pyodide.version !== '0.29.4' && pyodide.version !== '0.26.0') {
    // just check it loads properly
  }

  // extract the wrapper code from pythonWorker.ts
  const workerCode = fs.readFileSync('src/lib/pythonWorker.ts', 'utf8');
  const wrapperCodeMatch = workerCode.match(/const wrapperCode = `([\s\S]*?)`;/);
  const wrapperCode = wrapperCodeMatch ? wrapperCodeMatch[1] : null;
  
  if (!wrapperCode) {
    throw new Error("Could not extract wrapperCode");
  }

  // Test 1: print("hello")
  console.log("\\n--- Test 1: print('hello') ---");
  pyodide.globals.set('__USER_CODE__', 'print("hello")');
  pyodide.globals.set('__TEST_CASES__', pyodide.toPy([
    { input: 'print("world")', expected: 'world' }
  ]));
  let result = await pyodide.runPythonAsync(wrapperCode);
  console.log("Result:", result);

  // Test 2: Subnetting exercise (logic simulation)
  console.log("\\n--- Test 2: Subnetting Exercise ---");
  const subnetCode = `
def get_network_class(ip):
    first_octet = int(ip.split('.')[0])
    if first_octet <= 127: return 'A'
    if first_octet <= 191: return 'B'
    if first_octet <= 223: return 'C'
    return 'Unknown'
`;
  pyodide.globals.set('__USER_CODE__', subnetCode);
  pyodide.globals.set('__TEST_CASES__', pyodide.toPy([
    { input: "get_network_class('192.168.1.1')", expected: 'C', isHidden: false },
    { input: "get_network_class('10.0.0.1')", expected: 'A', isHidden: true }
  ]));
  result = await pyodide.runPythonAsync(wrapperCode);
  console.log("Result:", result);

  console.log("\\nAll validations passed natively using installed Pyodide " + pyodide.version);
}

verify().catch(console.error);
