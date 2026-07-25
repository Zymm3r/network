import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://netvfzmdewatfnmejcrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldHZmem1kZXdhdGZubWVqY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTMwNjcsImV4cCI6MjA5MTcyOTA2N30.3SzgLigbKlbUxrgDyYcrkp65soRIBFfeQnQFRmZmE3U';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  console.log('Fetching lessons from remote database...');
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, title_en, quiz_data');

  if (error) {
    console.error('Error fetching lessons:', error);
    process.exit(1);
  }

  console.log(`Fetched ${lessons.length} lessons from DB.`);

  const lessonsWithQuiz = lessons.filter(l => l.quiz_data !== null);
  console.log(`Lessons with non-null quiz_data: ${lessonsWithQuiz.length}`);

  let errorCount = 0;
  let totalQuestions = 0;

  lessons.forEach(lesson => {
    const { id, title_en, quiz_data } = lesson;
    if (quiz_data === null) {
      console.error(`[ERROR] Lesson "${id}" ("${title_en}") has NULL quiz_data`);
      errorCount++;
      return;
    }

    let parsed = quiz_data;
    if (typeof quiz_data === 'string') {
      try {
        parsed = JSON.parse(quiz_data);
      } catch (err) {
        console.error(`[ERROR] Lesson "${id}" has malformed JSON quiz_data: ${err.message}`);
        errorCount++;
        return;
      }
    }

    try {
      if (!parsed.questions || !Array.isArray(parsed.questions)) {
        throw new Error('questions field is missing or not an array');
      }
      if (parsed.questions.length !== 5) {
        throw new Error(`questions array size is ${parsed.questions.length}, expected 5`);
      }

      parsed.questions.forEach((q, idx) => {
        totalQuestions++;
        const qPrefix = `Question ${idx + 1}`;
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
      console.error(`[ERROR] Lesson "${id}" structural validation failed: ${err.message}`);
      errorCount++;
    }
  });

  console.log('\n--- REMOTE DATABASE VALIDATION ---');
  console.log(`Total lessons: ${lessons.length}`);
  console.log(`Lessons with valid quizzes: ${lessons.length - errorCount}`);
  console.log(`Total questions verified: ${totalQuestions}`);
  console.log(`Total errors: ${errorCount}`);

  if (errorCount > 0 || lessons.length !== 73) {
    console.log('\nVerdict: VERIFICATION FAILED');
    process.exit(1);
  } else {
    console.log('\nVerdict: VERIFICATION PASSED');
  }
}

main();
