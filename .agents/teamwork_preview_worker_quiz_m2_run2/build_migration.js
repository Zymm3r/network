import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, 'consolidated_quizzes.json');
const migrationPath = 'C:\\Users\\UTHtest\\.gemini\\antigravity\\worktrees\\network\\fix-lesson-completion-logic\\supabase\\migrations\\20260714073717_backfill_lesson_quizzes.sql';

async function main() {
  console.log('Loading consolidated quizzes...');
  const quizzes = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  let sql = `-- Migration to backfill quiz data for all 73 lessons\n\n`;

  const lessonIds = Object.keys(quizzes).sort();
  console.log(`Generating SQL updates for ${lessonIds.length} lessons...`);

  for (const id of lessonIds) {
    const quizData = quizzes[id];
    const jsonString = JSON.stringify(quizData);
    
    sql += `UPDATE public.lessons\n`;
    sql += `SET quiz_data = $quiz_data$${jsonString}$quiz_data$::jsonb\n`;
    sql += `WHERE id = '${id}';\n\n`;
  }

  // Ensure migration directory exists (it does, but let's be safe)
  const dir = path.dirname(migrationPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(migrationPath, sql, 'utf8');
  console.log(`Successfully generated migration file: ${migrationPath}`);
}

main();
