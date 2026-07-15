import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { quizzesPart1 } from './quizzes_part1.js';
import { quizzesPart2 } from './quizzes_part2.js';
import { quizzesPart3 } from './quizzes_part3.js';
import { quizzesPart4 } from './quizzes_part4.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = 'C:\\Users\\UTHtest\\.gemini\\antigravity\\worktrees\\network\\fix-lesson-completion-logic\\.agents\\teamwork_preview_explorer_quiz_m2_2\\lessons_db.json';

async function main() {
  console.log('Loading lessons list from DB file...');
  const lessons = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  console.log(`Loaded ${lessons.length} lessons.`);

  console.log('Consolidating quizzes...');
  const consolidated = {};
  
  // Merge all parts
  Object.assign(consolidated, quizzesPart1);
  Object.assign(consolidated, quizzesPart2);
  Object.assign(consolidated, quizzesPart3);
  Object.assign(consolidated, quizzesPart4);

  console.log(`Merged ${Object.keys(consolidated).length} lesson quizzes.`);

  let errorCount = 0;
  // Validate each lesson from the DB exists in consolidated and is structurally correct
  for (const lesson of lessons) {
    const quiz = consolidated[lesson.id];
    if (!quiz) {
      console.error(`[ERROR] Missing quiz for lesson ID: ${lesson.id}`);
      errorCount++;
      continue;
    }

    try {
      if (!quiz.questions || !Array.isArray(quiz.questions)) {
        throw new Error('questions field is missing or not an array');
      }
      if (quiz.questions.length !== 5) {
        throw new Error(`questions array size is ${quiz.questions.length}, expected 5`);
      }

      quiz.questions.forEach((q, idx) => {
        if (typeof q.question_en !== 'string' || q.question_en.trim() === '') {
          throw new Error(`Question ${idx} question_en is not a non-empty string`);
        }
        if (typeof q.question_th !== 'string' || q.question_th.trim() === '') {
          throw new Error(`Question ${idx} question_th is not a non-empty string`);
        }
        if (!q.options || !Array.isArray(q.options) || q.options.length !== 4) {
          throw new Error(`Question ${idx} options is not an array of 4 items`);
        }
        q.options.forEach((opt, oIdx) => {
          if (typeof opt !== 'string' || opt.trim() === '') {
            throw new Error(`Question ${idx} option ${oIdx} is not a non-empty string`);
          }
        });
        if (typeof q.correct_index !== 'number' || q.correct_index < 0 || q.correct_index > 3) {
          throw new Error(`Question ${idx} correct_index ${q.correct_index} is invalid (must be 0, 1, 2, or 3)`);
        }
        if (q.explanation_en !== undefined && q.explanation_en !== null && typeof q.explanation_en !== 'string') {
          throw new Error(`Question ${idx} explanation_en is invalid`);
        }
        if (q.explanation_th !== undefined && q.explanation_th !== null && typeof q.explanation_th !== 'string') {
          throw new Error(`Question ${idx} explanation_th is invalid`);
        }
      });
    } catch (err) {
      console.error(`[ERROR] Validation failed for lesson ID: ${lesson.id}: ${err.message}`);
      errorCount++;
    }
  }

  if (errorCount > 0) {
    console.error(`Validation completed with ${errorCount} error(s). Output file will not be written.`);
    process.exit(1);
  }

  const outputPath = path.join(__dirname, 'consolidated_quizzes.json');
  fs.writeFileSync(outputPath, JSON.stringify(consolidated, null, 2), 'utf8');
  console.log(`Successfully validated and wrote consolidated quizzes to: ${outputPath}`);
}

main();
