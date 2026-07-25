import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resultsPath = path.join(__dirname, 'search_results.txt');
const content = fs.readFileSync(resultsPath, 'utf8');

const lines = content.split('\n');
let count = 0;
lines.forEach((line, idx) => {
  if (line.toLowerCase().includes('call_mcp_tool')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
    count++;
  }
});

console.log(`Total occurrences of 'call_mcp_tool': ${count}`);
