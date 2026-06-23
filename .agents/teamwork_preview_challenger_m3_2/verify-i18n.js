const fs = require('fs');
const path = require('path');

function loadTsAsJs(filePath, exportName) {
  const fullPath = path.resolve(filePath);
  let content = fs.readFileSync(fullPath, 'utf8');
  // Strip imports
  content = content.replace(/import\s+type\s+[\s\S]*?;/g, '');
  // Strip export type
  content = content.replace(/export\s+type\s+[\s\S]*?;/g, '');
  // Replace export const name = with const name =
  content = content.replace(/export\s+const\s+(\w+)(?:\s*:\s*\w+)?\s*=/g, 'const $1 =');
  // Append module.exports
  content += `\nmodule.exports = ${exportName};`;
  
  // Create a temporary file to require
  const tempPath = path.join(__dirname, `temp_${exportName}.js`);
  fs.writeFileSync(tempPath, content);
  
  let obj;
  try {
    obj = require(tempPath);
  } finally {
    // Cleanup temp file
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
  return obj;
}

// Compare structures recursively
function compareObjects(obj1, obj2, path = '') {
  const keys1 = Object.keys(obj1).sort();
  const keys2 = Object.keys(obj2).sort();
  
  const diffs = [];
  
  // Check key set equality
  const keys1Set = new Set(keys1);
  const keys2Set = new Set(keys2);
  
  for (const k of keys1) {
    if (!keys2Set.has(k)) {
      diffs.push(`Missing key in target: ${path ? path + '.' : ''}${k}`);
    }
  }
  for (const k of keys2) {
    if (!keys1Set.has(k)) {
      diffs.push(`Extra key in target: ${path ? path + '.' : ''}${k}`);
    }
  }
  
  // Compare common keys
  for (const k of keys1) {
    if (keys2Set.has(k)) {
      const val1 = obj1[k];
      const val2 = obj2[k];
      const type1 = typeof val1;
      const type2 = typeof val2;
      
      const currentPath = path ? `${path}.${k}` : k;
      
      if (type1 !== type2) {
        diffs.push(`Type mismatch at ${currentPath}: expected ${type1}, got ${type2}`);
      } else if (type1 === 'object' && val1 !== null && val2 !== null) {
        diffs.push(...compareObjects(val1, val2, currentPath));
      }
    }
  }
  
  return diffs;
}

try {
  const en = loadTsAsJs('src/app/i18n/en.ts', 'en');
  const th = loadTsAsJs('src/app/i18n/th.ts', 'th');
  
  console.log('Comparing th (source) vs en (target)...');
  const diffs = compareObjects(th, en);
  if (diffs.length === 0) {
    console.log('Success: Translation files are identical in structure!');
    process.exit(0);
  } else {
    console.error('Differences found:');
    diffs.forEach(d => console.error(`- ${d}`));
    process.exit(1);
  }
} catch (e) {
  console.error('Error during static analysis:', e);
  process.exit(2);
}
