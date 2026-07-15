const fs = require('fs');
const path = require('path');

const migrationFilePath = path.join(__dirname, '..', '..', 'supabase', 'migrations', '20260714073717_backfill_lesson_quizzes.sql');

if (!fs.existsSync(migrationFilePath)) {
  console.error(`Error: Migration file not found at ${migrationFilePath}`);
  process.exit(1);
}

const content = fs.readFileSync(migrationFilePath, 'utf8');

// Parse the UPDATE statements
// We can use a regex to capture each UPDATE public.lessons ... WHERE id = '...';
// The format is:
// UPDATE public.lessons
// SET quiz_data = $quiz_data$<JSON>$quiz_data$::jsonb
// WHERE id = '<id>';

const updateRegex = /UPDATE\s+public\.lessons\s+SET\s+quiz_data\s+=\s+\$quiz_data\$([\s\S]*?)\$quiz_data\$::jsonb\s+WHERE\s+id\s+=\s+'([^']+)'/gi;

let match;
let matchCount = 0;
const errors = [];
const lessonIds = new Set();

while ((match = updateRegex.exec(content)) !== null) {
  matchCount++;
  const jsonStr = match[1].trim();
  const lessonId = match[2].trim();

  lessonIds.add(lessonId);

  // Parse JSON
  let quizData;
  try {
    quizData = JSON.parse(jsonStr);
  } catch (err) {
    errors.push(`[Lesson ${lessonId}] JSON Parsing Error: ${err.message}`);
    continue;
  }

  // Validate quizData structure
  if (!quizData || typeof quizData !== 'object') {
    errors.push(`[Lesson ${lessonId}] Root is not an object.`);
    continue;
  }

  if (!Array.isArray(quizData.questions)) {
    errors.push(`[Lesson ${lessonId}] 'questions' property is missing or not an array.`);
    continue;
  }

  if (quizData.questions.length !== 5) {
    errors.push(`[Lesson ${lessonId}] Expected exactly 5 questions, found ${quizData.questions.length}.`);
  }

  quizData.questions.forEach((q, index) => {
    const qPrefix = `[Lesson ${lessonId}][Question ${index + 1}]`;

    // question_en
    if (typeof q.question_en !== 'string' || q.question_en.trim() === '') {
      errors.push(`${qPrefix} 'question_en' must be a non-empty string.`);
    }

    // question_th
    if (typeof q.question_th !== 'string' || q.question_th.trim() === '') {
      errors.push(`${qPrefix} 'question_th' must be a non-empty string.`);
    }

    // options
    if (!Array.isArray(q.options)) {
      errors.push(`${qPrefix} 'options' must be an array.`);
    } else {
      if (q.options.length !== 4) {
        errors.push(`${qPrefix} 'options' must contain exactly 4 elements, found ${q.options.length}.`);
      }
      q.options.forEach((opt, optIndex) => {
        if (typeof opt !== 'string' || opt.trim() === '') {
          errors.push(`${qPrefix} Option ${optIndex + 1} must be a non-empty string.`);
        }
      });
    }

    // correct_index
    if (typeof q.correct_index !== 'number' || !Number.isInteger(q.correct_index) || q.correct_index < 0 || q.correct_index > 3) {
      errors.push(`${qPrefix} 'correct_index' must be an integer between 0 and 3, found ${q.correct_index}.`);
    }

    // explanation_en
    if (typeof q.explanation_en !== 'string' || q.explanation_en.trim() === '') {
      errors.push(`${qPrefix} 'explanation_en' must be a non-empty string.`);
    }

    // explanation_th
    if (typeof q.explanation_th !== 'string' || q.explanation_th.trim() === '') {
      errors.push(`${qPrefix} 'explanation_th' must be a non-empty string.`);
    }
  });
}

console.log(`--- Verification Results ---`);
console.log(`Total UPDATE statements matched: ${matchCount}`);
console.log(`Unique lesson IDs updated: ${lessonIds.size}`);

if (errors.length > 0) {
  console.error(`\nFound ${errors.length} validation errors:`);
  errors.forEach(err => console.error(`- ${err}`));
  process.exit(1);
} else {
  console.log(`\nAll checks passed successfully!`);
}
