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

// Parse seed.sql
console.log('Parsing seed.sql...');
try {
  const seedContent = fs.readFileSync(seedSqlPath, 'utf8');
  // Match INSERT INTO lessons ... VALUES ...;
  // Let's do a regex or simple line-by-line parsing
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
  // block contains list of rows like ('id', 'course_id', 'title_th', 'title_en', 'content_th', 'content_en', 'lesson_type', ...)
  // Let's parse them carefully, handling commas inside quotes.
  // A simple way is to use a state machine to split by rows
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
      // Check if not inside quote (we simplify by assuming row ends at ) followed by , or end of block)
      // Actually, we can check if it's the end of row
      inRow = false;
      rows.push(rowContent);
    } else if (inRow) {
      rowContent += char;
    }
    i++;
  }

  for (let row of rows) {
    // Split row by commas, respecting quotes
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
      // Escaped single quote
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
  .sort(); // Sort by name (timestamp prefix)

for (let file of migrationFiles) {
  const filePath = path.join(migrationsDir, file);
  const sql = fs.readFileSync(filePath, 'utf8');
  
  // Look for INSERT INTO public.lessons or INSERT INTO lessons
  // Also look for UPDATE lessons or UPDATE public.lessons
  // We can write a simple regex parser for UPDATE
  // Format: UPDATE [public.]lessons SET col1 = val1, col2 = val2, ... WHERE id = 'id';
  // Let's parse line by line or statement by statement.
  
  // Split by semicolon (ignoring semicolons in quotes is tricky but let's do state machine)
  const statements = splitStatements(sql);
  for (let stmt of statements) {
    stmt = stmt.trim();
    if (stmt.toUpperCase().startsWith('INSERT INTO PUBLIC.LESSONS') || stmt.toUpperCase().startsWith('INSERT INTO LESONS') || stmt.toUpperCase().startsWith('INSERT INTO LESSONS')) {
      // Parse insert
      const match = stmt.match(/VALUES\s+([\s\S]+)$/i);
      if (match) {
        parseInsertValues(match[1]);
      }
    } else if (stmt.toUpperCase().startsWith('UPDATE PUBLIC.LESSONS') || stmt.toUpperCase().startsWith('UPDATE LESSONS')) {
      // Parse update
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
  // UPDATE [public.]lessons SET ... WHERE id = '...';
  // Let's find WHERE id = '...'
  const whereMatch = stmt.match(/WHERE\s+id\s*=\s*'([^']+)'/i);
  if (!whereMatch) return;
  const id = whereMatch[1];
  
  if (!lessons[id]) {
    lessons[id] = { id, title_en: '', title_th: '', content_en: '', content_th: '', lesson_type: '' };
  }
  
  // Extract SET assignments
  // Format: SET col1 = val1, col2 = val2, ...
  const setPartMatch = stmt.match(/SET\s+([\s\S]+?)\s+WHERE/i);
  if (!setPartMatch) return;
  const setPart = setPartMatch[1];
  
  // Parse assignments like col = val
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
