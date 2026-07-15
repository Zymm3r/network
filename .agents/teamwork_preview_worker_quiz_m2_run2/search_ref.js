import fs from 'fs';
import path from 'path';

const searchDir = 'C:\\Users\\UTHtest\\.gemini\\antigravity';
const query = 'netvfzmdewatfnmejcrz';

console.log(`Searching for '${query}' in ${searchDir}...`);
let count = 0;

function walkDir(currentDir) {
  let files;
  try {
    files = fs.readdirSync(currentDir);
  } catch (err) {
    return; // Skip folders that cannot be read
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
        continue; // Skip these directories
      }
      walkDir(fullPath);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.log' || ext === '.txt' || ext === '.json' || ext === '.pbtxt' || ext === '.xml' || ext === '.ini' || ext === '.toml') {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.includes(query)) {
            console.log(`Found in: ${fullPath}`);
            count++;
            
            const lines = content.split('\n');
            lines.forEach((line, idx) => {
              if (line.includes(query)) {
                const start = Math.max(0, idx - 2);
                const end = Math.min(lines.length - 1, idx + 2);
                console.log(`  Lines ${start + 1}-${end + 1}:`);
                for (let i = start; i <= end; i++) {
                  console.log(`    ${i + 1}: ${lines[i].trim()}`);
                }
              }
            });
          }
        } catch (err) {
          // ignore read errors
        }
      }
    }
  }
}

walkDir(searchDir);
console.log(`Search completed. Found ${count} file(s) with matches.`);
