const fs = require('fs');
const path = require('path');

const migrationPath = path.resolve('C:/Users/UTHtest/.gemini/antigravity/worktrees/network/fix-lesson-completion-logic/supabase/migrations/20260714073717_backfill_lesson_quizzes.sql');

try {
  const content = fs.readFileSync(migrationPath, 'utf8');

  // Split by UPDATE statements
  const statements = content.split(/UPDATE\s+public\.lessons/i);
  const updates = [];

  for (let i = 1; i < statements.length; i++) {
    const stmt = 'UPDATE public.lessons' + statements[i];
    if (stmt.includes('SET quiz_data')) {
      updates.push(stmt);
    }
  }

  console.log(`Found ${updates.length} UPDATE statements.`);

  const errors = [];
  const lessonIds = new Set();
  let validLessonsCount = 0;

  updates.forEach((stmt, index) => {
    const idx = index + 1;
    // Extract ID
    const idMatch = stmt.match(/WHERE\s+id\s*=\s*'([^']+)'/i);
    if (!idMatch) {
      errors.push(`Statement ${idx}: Could not find lesson ID.`);
      return;
    }
    const lessonId = idMatch[1];
    
    if (lessonIds.has(lessonId)) {
      errors.push(`Statement ${idx}: Duplicate update for lesson ID '${lessonId}'.`);
    } else {
      lessonIds.add(lessonId);
    }

    // Extract JSON between $quiz_data$ and $quiz_data$
    const parts = stmt.split(/\$quiz_data\$/);
    if (parts.length < 3) {
      errors.push(`Statement ${idx} (ID: ${lessonId}): Could not find JSON content between $quiz_data$ tags.`);
      return;
    }
    const jsonStr = parts[1].trim();

    let quizData;
    try {
      quizData = JSON.parse(jsonStr);
    } catch (err) {
      errors.push(`Statement ${idx} (ID: ${lessonId}): Invalid JSON. Error: ${err.message}`);
      return;
    }

    if (!quizData.questions) {
      errors.push(`Statement ${idx} (ID: ${lessonId}): Missing 'questions' key in JSON.`);
      return;
    }

    const questions = quizData.questions;
    if (!Array.isArray(questions)) {
      errors.push(`Statement ${idx} (ID: ${lessonId}): 'questions' is not an array.`);
      return;
    }

    if (questions.length !== 5) {
      errors.push(`Statement ${idx} (ID: ${lessonId}): Contains ${questions.length} questions (expected exactly 5).`);
      return;
    }

    const requiredKeys = [
      'question_en',
      'question_th',
      'options',
      'correct_index',
      'explanation_en',
      'explanation_th'
    ];

    questions.forEach((q, qIdx) => {
      const qNum = qIdx + 1;
      requiredKeys.forEach(key => {
        if (!(key in q)) {
          errors.push(`Statement ${idx} (ID: ${lessonId}), Question ${qNum}: Missing key '${key}'.`);
        }
      });

      // Type checks
      if (typeof q.question_en !== 'string') {
        errors.push(`Statement ${idx} (ID: ${lessonId}), Question ${qNum}: 'question_en' is not a string.`);
      }
      if (typeof q.question_th !== 'string') {
        errors.push(`Statement ${idx} (ID: ${lessonId}), Question ${qNum}: 'question_th' is not a string.`);
      }
      if (typeof q.explanation_en !== 'string') {
        errors.push(`Statement ${idx} (ID: ${lessonId}), Question ${qNum}: 'explanation_en' is not a string.`);
      }
      if (typeof q.explanation_th !== 'string') {
        errors.push(`Statement ${idx} (ID: ${lessonId}), Question ${qNum}: 'explanation_th' is not a string.`);
      }

      if (!Array.isArray(q.options)) {
        errors.push(`Statement ${idx} (ID: ${lessonId}), Question ${qNum}: 'options' is not an array.`);
      } else {
        if (q.options.length !== 4) {
          errors.push(`Statement ${idx} (ID: ${lessonId}), Question ${qNum}: 'options' has length ${q.options.length} (expected exactly 4).`);
        }
        q.options.forEach((opt, optIdx) => {
          if (typeof opt !== 'string') {
            errors.push(`Statement ${idx} (ID: ${lessonId}), Question ${qNum}, Option ${optIdx + 1}: is not a string.`);
          }
        });
      }

      if (typeof q.correct_index !== 'number' || !Number.isInteger(q.correct_index)) {
        errors.push(`Statement ${idx} (ID: ${lessonId}), Question ${qNum}: 'correct_index' is not an integer.`);
      } else {
        if (q.correct_index < 0 || q.correct_index > 3) {
          errors.push(`Statement ${idx} (ID: ${lessonId}), Question ${qNum}: 'correct_index' is ${q.correct_index} (must be between 0 and 3).`);
        }
      }
    });

    validLessonsCount++;
  });

  console.log(`Total valid updates parsed correctly: ${validLessonsCount}`);
  console.log(`Total unique lesson IDs: ${lessonIds.size}`);
  if (errors.length > 0) {
    console.log('\nERRORS DETECTED:');
    errors.forEach(err => console.log(`- ${err}`));
    process.exit(1);
  } else {
    console.log('\nAll checks passed successfully!');
    process.exit(0);
  }
} catch (err) {
  console.error(`Failed to read or process migration file: ${err.message}`);
  process.exit(1);
}
