const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..', '..');
const migrationsDir = path.join(projectRoot, 'supabase', 'migrations');
const seedSqlPath = path.join(projectRoot, 'src', 'app', 'data', 'seed.sql');

// Map of lessonId -> { id, title_en, title_th, content_en, content_th, lesson_type }
const lessons = {};

// Helper to clean quotes/escapes in SQL strings
function cleanSqlString(str) {
  if (!str) return '';
  str = str.trim();
  if (str.startsWith("'") && str.endsWith("'")) {
    str = str.slice(1, -1);
  }
  // Replace double single quotes '' with single quote '
  str = str.replace(/''/g, "'");
  return str;
}

// Helper to strip SQL comments
function stripComments(sql) {
  // Remove single line comments starting with --
  let lines = sql.split('\n');
  lines = lines.map(line => {
    let inQuote = false;
    let i = 0;
    while (i < line.length) {
      const char = line[i];
      if (char === "'" && line[i+1] === "'") {
        i += 2;
        continue;
      }
      if (char === "'") {
        inQuote = !inQuote;
      }
      if (char === '-' && line[i+1] === '-' && !inQuote) {
        return line.slice(0, i);
      }
      i++;
    }
    return line;
  });
  return lines.join('\n');
}

// Parse seed.sql
console.log('Parsing seed.sql...');
try {
  const seedContent = fs.readFileSync(seedSqlPath, 'utf8');
  const lines = seedContent.split('\n');
  let inLessonsInsert = false;
  let valuesBlock = '';
  
  for (let line of lines) {
    if (line.includes('INSERT INTO lessons') && line.includes('VALUES')) {
      inLessonsInsert = true;
      continue;
    }
    if (inLessonsInsert) {
      if (line.trim().endsWith(';')) {
        valuesBlock += ' ' + line.slice(0, -1);
        inLessonsInsert = false;
        parseInsertValues(valuesBlock);
        valuesBlock = '';
      } else {
        valuesBlock += ' ' + line;
      }
    }
  }
} catch (e) {
  console.error('Error parsing seed.sql:', e);
}

function parseInsertValues(block) {
  let i = 0;
  let inRow = false;
  let rowContent = '';
  const rows = [];
  
  while (i < block.length) {
    const char = block[i];
    if (char === '(' && !inRow) {
      inRow = true;
      rowContent = '';
    } else if (char === ')' && inRow) {
      inRow = false;
      rows.push(rowContent);
    } else if (inRow) {
      rowContent += char;
    }
    i++;
  }

  for (let row of rows) {
    const cols = parseSqlRowCols(row);
    if (cols.length >= 7) {
      const id = cleanSqlString(cols[0]);
      const title_th = cleanSqlString(cols[2]);
      const title_en = cleanSqlString(cols[3]);
      const content_th = cleanSqlString(cols[4]);
      const content_en = cleanSqlString(cols[5]);
      const lesson_type = cleanSqlString(cols[6]);
      
      lessons[id] = { id, title_th, title_en, content_th, content_en, lesson_type };
    }
  }
}

function parseSqlRowCols(row) {
  const cols = [];
  let currentVal = '';
  let inQuote = false;
  let i = 0;
  
  while (i < row.length) {
    const char = row[i];
    if (char === "'" && row[i+1] === "'") {
      currentVal += "'";
      i += 2;
      continue;
    }
    if (char === "'") {
      inQuote = !inQuote;
      currentVal += "'";
      i++;
      continue;
    }
    if (char === ',' && !inQuote) {
      cols.push(currentVal.trim());
      currentVal = '';
    } else {
      currentVal += char;
    }
    i++;
  }
  cols.push(currentVal.trim());
  return cols;
}

// Parse migrations
console.log('Parsing migrations...');
const migrationFiles = fs.readdirSync(migrationsDir)
  .filter(f => f.endsWith('.sql'))
  .sort();

for (let file of migrationFiles) {
  const filePath = path.join(migrationsDir, file);
  const rawSql = fs.readFileSync(filePath, 'utf8');
  const sql = stripComments(rawSql);
  
  const statements = splitStatements(sql);
  for (let stmt of statements) {
    stmt = stmt.trim();
    const upperStmt = stmt.toUpperCase();
    if (upperStmt.startsWith('INSERT INTO PUBLIC.LESSONS') || upperStmt.startsWith('INSERT INTO LESONS') || upperStmt.startsWith('INSERT INTO LESSONS')) {
      const match = stmt.match(/VALUES\s+([\s\S]+)$/i);
      if (match) {
        parseInsertValues(match[1]);
      }
    } else if (upperStmt.startsWith('UPDATE PUBLIC.LESSONS') || upperStmt.startsWith('UPDATE LESSONS')) {
      parseUpdateStatement(stmt, file);
    }
  }
}

function splitStatements(sql) {
  const statements = [];
  let current = '';
  let inQuote = false;
  let i = 0;
  while (i < sql.length) {
    const char = sql[i];
    if (char === "'" && sql[i+1] === "'") {
      current += "''";
      i += 2;
      continue;
    }
    if (char === "'") {
      inQuote = !inQuote;
      current += "'";
      i++;
      continue;
    }
    if (char === ';' && !inQuote) {
      statements.push(current);
      current = '';
    } else {
      current += char;
    }
    i++;
  }
  if (current.trim()) {
    statements.push(current);
  }
  return statements;
}

function parseUpdateStatement(stmt, filename) {
  const whereMatch = stmt.match(/WHERE\s+id\s*=\s*'([^']+)'/i);
  if (!whereMatch) return;
  const id = whereMatch[1];
  
  if (!lessons[id]) {
    lessons[id] = { id, title_en: '', title_th: '', content_en: '', content_th: '', lesson_type: '' };
  }
  
  const setPartMatch = stmt.match(/SET\s+([\s\S]+?)\s+WHERE/i);
  if (!setPartMatch) return;
  const setPart = setPartMatch[1];
  
  const assignments = parseSetAssignments(setPart);
  for (let [col, val] of Object.entries(assignments)) {
    const colName = col.toLowerCase().trim();
    if (colName === 'title_en') lessons[id].title_en = cleanSqlString(val);
    if (colName === 'title_th') lessons[id].title_th = cleanSqlString(val);
    if (colName === 'content_en') lessons[id].content_en = cleanSqlString(val);
    if (colName === 'content_th') lessons[id].content_th = cleanSqlString(val);
    if (colName === 'lesson_type') lessons[id].lesson_type = cleanSqlString(val);
  }
}

function parseSetAssignments(setPart) {
  const assignments = {};
  let i = 0;
  let inQuote = false;
  let currentKey = '';
  let currentVal = '';
  let inVal = false;
  
  while (i < setPart.length) {
    const char = setPart[i];
    if (char === "'" && setPart[i+1] === "'") {
      if (inVal) currentVal += "''";
      i += 2;
      continue;
    }
    if (char === "'") {
      inQuote = !inQuote;
      if (inVal) currentVal += "'";
      i++;
      continue;
    }
    
    if (char === '=' && !inQuote && !inVal) {
      inVal = true;
      i++;
      continue;
    }
    
    if (char === ',' && !inQuote && inVal) {
      assignments[currentKey.trim()] = currentVal.trim();
      currentKey = '';
      currentVal = '';
      inVal = false;
      i++;
      continue;
    }
    
    if (inVal) {
      currentVal += char;
    } else {
      currentKey += char;
    }
    i++;
  }
  if (currentKey.trim() && inVal) {
    assignments[currentKey.trim()] = currentVal.trim();
  }
  return assignments;
}

console.log(`Total lessons parsed: ${Object.keys(lessons).length}`);
fs.writeFileSync(
  path.join(__dirname, 'lessons_parsed.json'),
  JSON.stringify(lessons, null, 2)
);
console.log('Saved lessons_parsed.json');
