import fs from 'fs';
import path from 'path';

const searchDir = 'C:\\Users\\UTHtest\\AppData';
const query = 'mcp.supabase.com';

console.log(`Searching for '${query}' in ${searchDir}...`);

function walkDir(currentDir, depth = 0) {
  if (depth > 4) return; // limit depth
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
      if (file.startsWith('.') || file === 'Local' || file === 'LocalLow' || file === 'Temp' || file === 'cache') {
        // focus primarily on Roaming or specific config dirs if we want, but let's just search
      }
      walkDir(fullPath, depth + 1);
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.json' || ext === '.toml' || ext === '.yaml' || ext === '.yml' || ext === '.config') {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.includes(query)) {
            console.log(`Found in: ${fullPath}`);
            const lines = content.split('\n');
            lines.forEach((line, idx) => {
              if (line.includes(query)) {
                console.log(`  Line ${idx + 1}: ${line.trim()}`);
              }
            });
          }
        } catch (err) {
          // ignore
        }
      }
    }
  }
}

walkDir(searchDir);
console.log('Search completed.');
