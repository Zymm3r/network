import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const searchDir = 'C:\\Users\\UTHtest\\.gemini\ntigravity';
const query = 'netvfzmdewatfnmejcrz';
const outputPath = path.join(__dirname, 'search_results.txt');

let outputContent = `Searching for '${query}' in ${searchDir}...\n\n`;
let count = 0;

function walkDir(currentDir) {
  let files;
  try {
    files = fs.readdirSync(currentDir);
  } catch (err) {
    return;
  }

  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    let stat;
    try {
      stat = fs.statSync(fullPath);
    } catch (err) {
      continue;
    }

    if (stat.isDirectory()) {
      if (file === 'worktrees' || file === 'annotations' || file === 'implicit' || file === 'html_artifacts') {
        continue;
      }
      walkDir(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.log' || ext === '.txt' || ext === '.json' || ext === '.pbtxt' || ext === '.xml' || ext === '.ini' || ext === '.toml') {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.includes(query)) {
            outputContent += `Found in: ${fullPath}\n`;
            count++;
            
            const lines = content.split('\n');
            lines.forEach((line, idx) => {
              if (line.includes(query)) {
                const start = Math.max(0, idx - 2);
                const end = Math.min(lines.length - 1, idx + 2);
                outputContent += `  Lines ${start + 1}-${end + 1}:\n`;
                for (let i = start; i <= end; i++) {
                  outputContent += `    ${i + 1}: ${lines[i].trim()}\n`;
                }
              }
            });
            outputContent += '\n';
          }
        } catch (err) {
          // ignore
        }
      }
    }
  }
}

walkDir('C:\\Users\\UTHtest\\.gemini\\antigravity');
outputContent += `\nSearch completed. Found ${count} file(s) with matches.\n`;

fs.writeFileSync(outputPath, outputContent, 'utf8');
console.log(`Successfully wrote search results to ${outputPath}`);
