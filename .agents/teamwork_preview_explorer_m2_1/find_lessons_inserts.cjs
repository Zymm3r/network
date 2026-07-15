const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..', '..');
const migrationsDir = path.join(projectRoot, 'supabase', 'migrations');
const seedSqlPath = path.join(projectRoot, 'src', 'app', 'data', 'seed.sql');

const sqlFiles = [
  seedSqlPath,
  ...fs.readdirSync(migrationsDir)
    .filter(f => f.endsWith('.sql'))
    .map(f => path.join(migrationsDir, f))
];

for (let file of sqlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (/insert\s+into/i.test(line) && /lessons/i.test(line)) {
      console.log(`${path.basename(file)}:${idx + 1}: ${line.trim()}`);
    }
  });
}
