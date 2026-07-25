import fs from 'fs';

const dbPath = 'C:\\Users\\UTHtest\\.gemini\\antigravity\\worktrees\\network\\fix-lesson-completion-logic\\.agents\\teamwork_preview_explorer_quiz_m2_2\\lessons_db.json';
const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

console.log(`Total lessons: ${data.length}`);
data.forEach((l, i) => {
  console.log(`${i + 1}: ${l.id} - ${l.title_en}`);
});
