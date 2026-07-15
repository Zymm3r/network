import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://netvfzmdewatfnmejcrz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ldHZmem1kZXdhdGZubWVqY3J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTMwNjcsImV4cCI6MjA5MTcyOTA2N30.3SzgLigbKlbUxrgDyYcrkp65soRIBFfeQnQFRmZmE3U';

const supabase = createClient(supabaseUrl, supabaseKey);

async function validate() {
  let logBuffer = '';
  function log(msg) {
    console.log(msg);
    logBuffer += msg + '\n';
  }

  log('Fetching all lessons from Supabase...');
  
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('id, title_en, quiz_data');

  if (error) {
    log('Error fetching lessons: ' + error.message);
    process.exit(1);
  }

  log(`Fetched ${lessons.length} lessons in total.`);

  const lessonsWithQuiz = lessons.filter(l => l.quiz_data !== null);
  log(`Found ${lessonsWithQuiz.length} lessons with non-null quiz_data.`);

  let totalQuestions = 0;
  const errors = [];
  const warnings = [];

  lessonsWithQuiz.forEach(lesson => {
    const { id, title_en, quiz_data } = lesson;
    
    let parsedData = quiz_data;
    if (typeof quiz_data === 'string') {
      try {
        parsedData = JSON.parse(quiz_data);
      } catch (e) {
        errors.push({ id, title_en, error: `Malformed JSON: ${e.message}` });
        return;
      }
    }

    if (!parsedData || typeof parsedData !== 'object') {
      errors.push({ id, title_en, error: 'quiz_data is not an object' });
      return;
    }

    // Check questions key
    if (!Array.isArray(parsedData.questions)) {
      errors.push({ id, title_en, error: 'questions is not an array' });
      return;
    }

    if (parsedData.questions.length === 0) {
      errors.push({ id, title_en, error: 'questions array is empty' });
      return;
    }

    parsedData.questions.forEach((q, index) => {
      totalQuestions++;
      const qPrefix = `Question ${index + 1}`;

      // Check fields: question_en, question_th
      if (typeof q.question_en !== 'string' || q.question_en.trim() === '') {
        errors.push({ id, title_en, error: `${qPrefix} missing or empty question_en` });
      }
      if (typeof q.question_th !== 'string' || q.question_th.trim() === '') {
        errors.push({ id, title_en, error: `${qPrefix} missing or empty question_th` });
      }

      // Check options
      if (!Array.isArray(q.options)) {
        errors.push({ id, title_en, error: `${qPrefix} options is not an array` });
      } else {
        if (q.options.length < 2) {
          errors.push({ id, title_en, error: `${qPrefix} has fewer than 2 options: ${q.options.length}` });
        }
        
        q.options.forEach((opt, optIndex) => {
          if (typeof opt !== 'string') {
            errors.push({ id, title_en, error: `${qPrefix} option ${optIndex} is not a string: ${typeof opt}` });
          } else if (opt.trim() === '') {
            errors.push({ id, title_en, error: `${qPrefix} option ${optIndex} is empty or whitespace` });
          }
        });

        // Check correct_index
        if (typeof q.correct_index !== 'number' || !Number.isInteger(q.correct_index)) {
          errors.push({ id, title_en, error: `${qPrefix} correct_index is not an integer: ${q.correct_index}` });
        } else if (q.correct_index < 0 || q.correct_index >= q.options.length) {
          errors.push({ id, title_en, error: `${qPrefix} correct_index ${q.correct_index} is out of bounds (options length: ${q.options.length})` });
        }
      }

      // Check explanations
      if (q.hasOwnProperty('explanation_en') && q.explanation_en !== null && typeof q.explanation_en !== 'string') {
        errors.push({ id, title_en, error: `${qPrefix} explanation_en is specified but is not a string or null: ${typeof q.explanation_en}` });
      }
      if (q.hasOwnProperty('explanation_th') && q.explanation_th !== null && typeof q.explanation_th !== 'string') {
        errors.push({ id, title_en, error: `${qPrefix} explanation_th is specified but is not a string or null: ${typeof q.explanation_th}` });
      }

      // Check for escaping, formatting, or truncation indicators
      const qStr = JSON.stringify(q);
      if (qStr.includes('\\\\"') || qStr.includes('\\\\t') || qStr.includes('\\\\n')) {
        warnings.push({ id, title_en, warning: `${qPrefix} contains potential double-escaped sequences (e.g. \\\\", \\\\n)` });
      }
      
      // Look for truncated questions/explanations
      if (q.question_en.endsWith('...') || q.question_en.endsWith('…')) {
        warnings.push({ id, title_en, warning: `${qPrefix} question_en ends in ellipse: "${q.question_en}"` });
      }
      if (q.explanation_en && (q.explanation_en.endsWith('...') || q.explanation_en.endsWith('…'))) {
        warnings.push({ id, title_en, warning: `${qPrefix} explanation_en ends in ellipse: "${q.explanation_en}"` });
      }
    });
  });

  log('\n--- VALIDATION RESULTS ---');
  log(`Total lessons evaluated: ${lessons.length}`);
  log(`Lessons with non-null quiz_data: ${lessonsWithQuiz.length}`);
  log(`Total questions validated: ${totalQuestions}`);
  log(`Errors found: ${errors.length}`);
  log(`Warnings found: ${warnings.length}`);

  if (errors.length > 0) {
    log('\n--- ERRORS ---');
    errors.forEach(e => log(`[ERROR] Lesson "${e.id}" (${e.title_en}): ${e.error}`));
  } else {
    log('\nNo errors found!');
  }

  if (warnings.length > 0) {
    log('\n--- WARNINGS ---');
    warnings.forEach(w => log(`[WARNING] Lesson "${w.id}" (${w.title_en}): ${w.warning}`));
  } else {
    log('\nNo warnings found!');
  }

  log('\n--- SAMPLE RECORDS (3 lessons) ---');
  const sampleLessons = lessonsWithQuiz.slice(0, 3);
  sampleLessons.forEach(sl => {
    log(`\nLesson ID: ${sl.id}`);
    log(`Title: ${sl.title_en}`);
    log(`Quiz Data:\n${JSON.stringify(sl.quiz_data, null, 2)}`);
  });

  const outputPath = 'C:\\Users\\UTHtest\\.gemini\\antigravity\\worktrees\\network\\fix-lesson-completion-logic\\.agents\\teamwork_preview_challenger_quiz_m2_2\\validate_results.txt';
  fs.writeFileSync(outputPath, logBuffer, 'utf-8');
  console.log(`\nOutput written to ${outputPath}`);
}

validate();
