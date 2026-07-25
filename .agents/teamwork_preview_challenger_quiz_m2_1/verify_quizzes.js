import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://netvfzmdewatfnmejcrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldHZmem1kZXdhdGZubWVqY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTMwNjcsImV4cCI6MjA5MTcyOTA2N30.3SzgLigbKlbUxrgDyYcrkp65soRIBFfeQnQFRmZmE3U';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Querying all lessons with non-null quiz_data from remote database...');
  
  // Note: we fetch all rows without limit. Since we expect 73, we can retrieve them in one go.
  const { data, error } = await supabase
    .from('lessons')
    .select('id, title_en, title_th, lesson_type, quiz_data')
    .not('quiz_data', 'is', null);

  if (error) {
    console.error('Error querying database:', error);
    process.exit(1);
  }

  console.log(`Fetched ${data.length} lessons with non-null quiz_data.`);

  let validationPassed = true;
  const errors = [];
  const warnings = [];

  if (data.length !== 73) {
    errors.push(`Expected exactly 73 lessons with non-null quiz_data, but found ${data.length}.`);
    validationPassed = false;
  }

  data.forEach((lesson, index) => {
    const { id, title_en, lesson_type, quiz_data } = lesson;
    const prefix = `[Lesson ${index + 1}/${data.length}] ID: ${id} ("${title_en}", type: ${lesson_type})`;

    if (typeof quiz_data !== 'object' || quiz_data === null) {
      errors.push(`${prefix}: quiz_data is not a valid JSON object.`);
      validationPassed = false;
      return;
    }

    const { questions } = quiz_data;
    if (!Array.isArray(questions)) {
      errors.push(`${prefix}: quiz_data.questions is not an array.`);
      validationPassed = false;
      return;
    }

    if (questions.length === 0) {
      warnings.push(`${prefix}: questions array is empty.`);
    }

    questions.forEach((q, qIndex) => {
      const qPrefix = `${prefix} -> Question ${qIndex + 1}`;

      // Check fields existence and types
      if (typeof q.question_en !== 'string') {
        errors.push(`${qPrefix}: question_en is missing or not a string (type: ${typeof q.question_en}).`);
        validationPassed = false;
      } else if (q.question_en.trim() === '') {
        errors.push(`${qPrefix}: question_en is empty.`);
        validationPassed = false;
      }

      if (typeof q.question_th !== 'string') {
        errors.push(`${qPrefix}: question_th is missing or not a string (type: ${typeof q.question_th}).`);
        validationPassed = false;
      } else if (q.question_th.trim() === '') {
        errors.push(`${qPrefix}: question_th is empty.`);
        validationPassed = false;
      }

      if (!Array.isArray(q.options)) {
        errors.push(`${qPrefix}: options is missing or not an array.`);
        validationPassed = false;
      } else {
        if (q.options.length < 2) {
          errors.push(`${qPrefix}: options array must have at least 2 elements (has ${q.options.length}).`);
          validationPassed = false;
        }

        q.options.forEach((opt, optIndex) => {
          if (typeof opt !== 'string') {
            errors.push(`${qPrefix} -> Option ${optIndex}: is not a string (type: ${typeof opt}).`);
            validationPassed = false;
          } else {
            if (opt.trim() === '') {
              errors.push(`${qPrefix} -> Option ${optIndex}: is empty or whitespace-only.`);
              validationPassed = false;
            }
            if (opt.includes('\uFFFD')) {
              errors.push(`${qPrefix} -> Option ${optIndex}: contains replacement character (unicode ).`);
              validationPassed = false;
            }
            if (opt.endsWith('\\')) {
              warnings.push(`${qPrefix} -> Option ${optIndex}: ends with a backslash. Possible escape character issue.`);
            }
          }
        });

        // Check correct_index
        if (typeof q.correct_index !== 'number') {
          errors.push(`${qPrefix}: correct_index is missing or not a number.`);
          validationPassed = false;
        } else if (!Number.isInteger(q.correct_index)) {
          errors.push(`${qPrefix}: correct_index ${q.correct_index} is not an integer.`);
          validationPassed = false;
        } else if (q.correct_index < 0 || q.correct_index >= q.options.length) {
          errors.push(`${qPrefix}: correct_index ${q.correct_index} is out of bounds (options length: ${q.options.length}).`);
          validationPassed = false;
        }
      }

      // Check optional fields: explanation_en, explanation_th
      if (q.explanation_en !== undefined && q.explanation_en !== null) {
        if (typeof q.explanation_en !== 'string') {
          errors.push(`${qPrefix}: explanation_en is specified but is not a string.`);
          validationPassed = false;
        } else if (q.explanation_en.includes('\uFFFD')) {
          errors.push(`${qPrefix}: explanation_en contains replacement character (unicode ).`);
          validationPassed = false;
        }
      }
      if (q.explanation_th !== undefined && q.explanation_th !== null) {
        if (typeof q.explanation_th !== 'string') {
          errors.push(`${qPrefix}: explanation_th is specified but is not a string.`);
          validationPassed = false;
        } else if (q.explanation_th.includes('\uFFFD')) {
          errors.push(`${qPrefix}: explanation_th contains replacement character (unicode ).`);
          validationPassed = false;
        }
      }

      // Check main question strings for unicode replacement chars
      if (typeof q.question_en === 'string') {
        if (q.question_en.includes('\uFFFD')) {
          errors.push(`${qPrefix}: question_en contains replacement character (unicode ).`);
          validationPassed = false;
        }
        if (q.question_en.endsWith('\\')) {
          warnings.push(`${qPrefix}: question_en ends with a backslash.`);
        }
      }
      if (typeof q.question_th === 'string') {
        if (q.question_th.includes('\uFFFD')) {
          errors.push(`${qPrefix}: question_th contains replacement character (unicode ).`);
          validationPassed = false;
        }
      }
    });
  });

  console.log('\n--- Validation Summary ---');
  console.log(`Validation Passed: ${validationPassed}`);
  console.log(`Total Errors Found: ${errors.length}`);
  console.log(`Total Warnings Found: ${warnings.length}`);

  if (warnings.length > 0) {
    console.log('\n--- Warnings ---');
    warnings.forEach(w => console.warn(w));
  }

  if (errors.length > 0) {
    console.log('\n--- Errors ---');
    errors.forEach(e => console.error(e));
    process.exit(1);
  } else {
    console.log('All checks passed successfully!');
    process.exit(0);
  }
}

run();
