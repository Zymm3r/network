const fs = require('fs');
const path = require('path');

const migrationsDir = 'C:/Users/UTHtest/.gemini/antigravity/worktrees/network/fix-lesson-completion-logic/supabase/migrations';

try {
  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql'));
  const allLessonIds = new Set();

  files.forEach(file => {
    const filePath = path.join(migrationsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Find any mention of WHERE id = '...' in updates of public.lessons
    // or INSERT INTO public.lessons (id, ...) VALUES ('...', ...)
    
    // Let's use a regex to find all single-quoted IDs following WHERE id =
    const whereIdMatches = content.matchAll(/WHERE\s+id\s*=\s*'([^']+)'/gi);
    for (const match of whereIdMatches) {
      if (match[1].startsWith('lesson-') || match[1].startsWith('devnet-')) {
        allLessonIds.add(match[1]);
      }
    }

    // Let's also find all single-quoted IDs in INSERT statements
    const insertMatches = content.matchAll(/INSERT\s+INTO\s+(?:public\.)?lessons\s*\([^)]*\)\s*VALUES\s*\(\s*'([^']+)'/gi);
    for (const match of insertMatches) {
      allLessonIds.add(match[1]);
    }
  });

  console.log(`Found a total of ${allLessonIds.size} unique lesson IDs referenced across all migration files:`);
  const sortedIds = Array.from(allLessonIds).sort();
  console.log(JSON.stringify(sortedIds, null, 2));

  // Now, check the quiz backfill file specifically
  const backfillPath = path.join(migrationsDir, '20260714073717_backfill_lesson_quizzes.sql');
  const backfillContent = fs.readFileSync(backfillPath, 'utf8');
  
  const backfillIds = new Set();
  const backfillWhereMatches = backfillContent.matchAll(/WHERE\s+id\s*=\s*'([^']+)'/gi);
  for (const match of backfillWhereMatches) {
    backfillIds.add(match[1]);
  }

  console.log(`\nBackfill targets ${backfillIds.size} unique lessons.`);

  const missing = [];
  sortedIds.forEach(id => {
    if (!backfillIds.has(id)) {
      missing.push(id);
    }
  });

  if (missing.length > 0) {
    console.log(`\nReferenced lessons NOT backfilled with quiz data (${missing.length}):`);
    missing.forEach(id => console.log(`- ${id}`));
  } else {
    console.log('\nPerfect coverage! All referenced lessons are covered by the quiz backfill migration.');
  }

} catch (err) {
  console.error(`Error: ${err.message}`);
}
