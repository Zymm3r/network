import fs from 'fs';
import path from 'path';

const migrationsDir = 'C:\\Users\\UTHtest\\.gemini\\antigravity\\worktrees\\network\\fix-lesson-completion-logic\\supabase\\migrations';
const seedPath = 'C:\\Users\\UTHtest\\.gemini\\antigravity\\worktrees\\network\\fix-lesson-completion-logic\\src\\app\\data\\seed.sql';
const outputPath = 'C:\\Users\\UTHtest\\.gemini\\antigravity\\worktrees\\network\\fix-lesson-completion-logic\\.agents\\teamwork_preview_explorer_m2_3\\lessons_extracted.json';

const lessons = {};

function updateLesson(id, title_en, content_en) {
  if (!id) return;
  if (!lessons[id]) {
    lessons[id] = { id, title_en: null, content_en: null };
  }
  if (title_en) {
    lessons[id].title_en = title_en.trim();
  }
  if (content_en) {
    // Strip dollar quotes if present
    let cleaned = content_en.trim();
    if (cleaned.startsWith('$$') && cleaned.endsWith('$$')) {
      cleaned = cleaned.substring(2, cleaned.length - 2);
    }
    lessons[id].content_en = cleaned.trim();
  }
}

// 1. Parse seed.sql
console.log('Parsing seed.sql...');
if (fs.existsSync(seedPath)) {
  const content = fs.readFileSync(seedPath, 'utf8');
  
  // Find INSERT INTO lessons VALUES block
  const insertRegex = /INSERT\s+INTO\s+lessons\s*\([^)]*\)\s*VALUES\s*([\s\S]*?);/i;
  const match = content.match(insertRegex);
  if (match) {
    const valuesBlock = match[1];
    // Find each tuple block like ('lesson-id', ...)
    const tupleRegex = /\(([^)]+)\)/g;
    let m;
    while ((m = tupleRegex.exec(valuesBlock)) !== null) {
      const tupleContent = m[1];
      // Match single-quoted strings: '...' or double-single quotes inside
      // A simple regex to split single-quoted elements
      const parts = [];
      const partRegex = /'((?:[^'\\]|\\.|'')*)'/g;
      let pm;
      while ((pm = partRegex.exec(tupleContent)) !== null) {
        parts.push(pm[1].replace(/''/g, "'"));
      }
      if (parts.length >= 6) {
        const id = parts[0];
        const title_en = parts[3];
        const content_en = parts[5];
        updateLesson(id, title_en, content_en);
      }
    }
  }
}

// 2. Parse migrations
console.log('Parsing migrations...');
const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

for (const file of files) {
  const filePath = path.join(migrationsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Parse INSERT statements
  const insertRegex = /INSERT\s+INTO\s+public\.lessons\s*\([^)]*\)\s*VALUES\s*\(([\s\S]*?)\);/gi;
  let im;
  while ((im = insertRegex.exec(content)) !== null) {
    const tupleContent = im[1];
    const parts = [];
    const partRegex = /'((?:[^'\\]|\\.|'')*)'/g;
    let pm;
    while ((pm = partRegex.exec(tupleContent)) !== null) {
      parts.push(pm[1].replace(/''/g, "'"));
    }
    if (parts.length >= 6) {
      const id = parts[0];
      const title_en = parts[3];
      const content_en = parts[5];
      updateLesson(id, title_en, content_en);
    }
  }

  // Parse UPDATE statements targeting public.lessons or lessons
  // E.g., UPDATE public.lessons SET content_en = '...' WHERE id = '...';
  // Or UPDATE public.lessons SET content_th = '...', content_en = '...' WHERE id = '...';
  // We can use a regex for: UPDATE [public.]lessons SET [clauses] WHERE id = '...';
  // Let's capture the set clause and the id
  const updateRegex = /UPDATE\s+(?:public\.)?lessons\s+SET\s+([\s\S]*?)\s+WHERE\s+id\s*=\s*'([^']+)';/gi;
  let um;
  while ((um = updateRegex.exec(content)) !== null) {
    const setClause = um[1];
    const id = um[2];

    // Try to extract content_en
    // It can be single-quoted '...' or dollar-quoted $$...$$
    let content_en = null;
    const contentEnMatch = setClause.match(/content_en\s*=\s*(?:'((?:[^'\\]|\\.|'')*)'|\$\$([\s\S]*?)\$\$)/i);
    if (contentEnMatch) {
      content_en = contentEnMatch[1] ? contentEnMatch[1].replace(/''/g, "'") : '$$' + contentEnMatch[2] + '$$';
    }

    // Try to extract title_en
    let title_en = null;
    const titleEnMatch = setClause.match(/title_en\s*=\s*(?:'((?:[^'\\]|\\.|'')*)'|\$\$([\s\S]*?)\$\$)/i);
    if (titleEnMatch) {
      title_en = titleEnMatch[1] ? titleEnMatch[1].replace(/''/g, "'") : '$$' + titleEnMatch[2] + '$$';
    }

    if (title_en || content_en) {
      updateLesson(id, title_en, content_en);
    }
  }
}

// 3. Write output
const lessonList = Object.values(lessons);
fs.writeFileSync(outputPath, JSON.stringify(lessonList, null, 2), 'utf8');
console.log(`Saved ${lessonList.length} lessons to ${outputPath}`);

// Check which lessons have empty content_en or empty title_en
const incomplete = lessonList.filter(l => !l.title_en || !l.content_en);
console.log(`Lessons missing title_en or content_en: ${incomplete.length}`);
if (incomplete.length > 0) {
  console.log('Incomplete lessons:', incomplete.map(l => l.id));
}
