const fs = require('fs');
const path = require('path');
const target = path.resolve(__dirname, '..', '..', 'src', 'app', 'data', 'lessonResources.ts');
const content = fs.readFileSync(target, 'utf8');
const matches = content.match(/['"]lesson-[\w-]+['"]/g) || [];
const unique = new Set(matches.map(m => m.slice(1, -1)));
console.log('Unique lesson resources count:', unique.size);
console.log('Unique lesson resources keys:', Array.from(unique).sort());
