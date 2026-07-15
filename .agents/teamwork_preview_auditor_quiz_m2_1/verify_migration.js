import fs from 'fs';
import path from 'path';

const sqlPath = 'C:\\Users\\UTHtest\\.gemini\\antigravity\\worktrees\\network\\fix-lesson-completion-logic\\supabase\\migrations\\20260714073717_backfill_lesson_quizzes.sql';

async function main() {
  console.log('Reading migration file...');
  const content = fs.readFileSync(sqlPath, 'utf8');

  // Split into UPDATE statements
  const statements = content.split(/UPDATE\s+public\.lessons/i);
  // The first item is the header comment/preamble
  const preamble = statements.shift();
  
  console.log(`Preamble length: ${preamble.length} chars`);
  console.log(`Found ${statements.length} update blocks.`);

  const lessonIds = new Set();
  const duplicateIds = [];
  const invalidJsonLessons = [];
  const structuralErrors = [];
  let totalQuestions = 0;

  statements.forEach((stmt, idx) => {
    // Reconstruct the statement for logging / debug if needed
    // Look for SET quiz_data = $quiz_data$ ... $quiz_data$::jsonb
    const quizMatch = stmt.match(/SET\s+quiz_data\s*=\s*\$quiz_data\$([\s\S]*?)\$quiz_data\$::jsonb/i);
    const idMatch = stmt.match(/WHERE\s+id\s*=\s*'([^']+)'/i);

    if (!idMatch) {
      structuralErrors.push(`Block ${idx + 1}: Missing WHERE id clause`);
      return;
    }

    const lessonId = idMatch[1];
    if (lessonIds.has(lessonId)) {
      duplicateIds.push(lessonId);
    } else {
      lessonIds.add(lessonId);
    }

    if (!quizMatch) {
      structuralErrors.push(`Lesson "${lessonId}": Missing or malformed quiz_data block`);
      return;
    }

    const quizJsonStr = quizMatch[1].trim();
    let quizData;
    try {
      quizData = JSON.parse(quizJsonStr);
    } catch (err) {
      invalidJsonLessons.push({ id: lessonId, error: err.message, snippet: quizJsonStr.substring(0, 100) });
      return;
    }

    // Verify quiz data structure
    try {
      if (!quizData.questions || !Array.isArray(quizData.questions)) {
        throw new Error('questions field is missing or not an array');
      }
      if (quizData.questions.length !== 5) {
        throw new Error(`questions array size is ${quizData.questions.length}, expected 5`);
      }

      quizData.questions.forEach((q, qIdx) => {
        totalQuestions++;
        const qPrefix = `Question ${qIdx + 1}`;
        if (typeof q.question_en !== 'string' || q.question_en.trim() === '') {
          throw new Error(`${qPrefix} missing or empty question_en`);
        }
        if (typeof q.question_th !== 'string' || q.question_th.trim() === '') {
          throw new Error(`${qPrefix} missing or empty question_th`);
        }
        if (!Array.isArray(q.options) || q.options.length !== 4) {
          throw new Error(`${qPrefix} options must be an array of 4 items`);
        }
        q.options.forEach((opt, oIdx) => {
          if (typeof opt !== 'string' || opt.trim() === '') {
            throw new Error(`${qPrefix} option ${oIdx + 1} must be a non-empty string`);
          }
        });
        if (typeof q.correct_index !== 'number' || !Number.isInteger(q.correct_index) || q.correct_index < 0 || q.correct_index > 3) {
          throw new Error(`${qPrefix} correct_index ${q.correct_index} is invalid (must be integer 0-3)`);
        }
        if (q.explanation_en && typeof q.explanation_en !== 'string') {
          throw new Error(`${qPrefix} explanation_en must be a string`);
        }
        if (q.explanation_th && typeof q.explanation_th !== 'string') {
          throw new Error(`${qPrefix} explanation_th must be a string`);
        }
      });
    } catch (err) {
      structuralErrors.push(`Lesson "${lessonId}": ${err.message}`);
    }
  });

  console.log('\n--- MIGRATION VERIFICATION ---');
  console.log(`Total unique lessons updated: ${lessonIds.size}`);
  console.log(`Duplicates: ${duplicateIds.length} (${duplicateIds.join(', ') || 'None'})`);
  console.log(`JSON errors: ${invalidJsonLessons.length}`);
  console.log(`Structural errors: ${structuralErrors.length}`);
  console.log(`Total questions verified: ${totalQuestions}`);

  if (invalidJsonLessons.length > 0) {
    console.log('\n--- JSON Errors ---');
    invalidJsonLessons.forEach(e => console.log(`- ${e.id}: ${e.error}`));
  }

  if (structuralErrors.length > 0) {
    console.log('\n--- Structural Errors ---');
    structuralErrors.forEach(e => console.log(`- ${e}`));
  }
}

main();
