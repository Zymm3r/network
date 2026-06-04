const fs = require('fs');

const brokenIds = [
  'lesson-ccna005-01', 'lesson-ccna003-01', 'lesson-ccna005-04',
  'lesson-ccna002-02', 'lesson-ts002-03', 'lesson-dev002-02',
  'lesson-ccna004-02', 'lesson-dev002-03', 'lesson-ccna002-04',
  'lesson-ts002-02', 'lesson-adv003-05', 'lesson-ts002-01'
];

const validPhotos = [
  '1558494949-ef010cbdcc31', '1544197150-b99a580bb7a8', '1451187580459-43490279c0fa',
  '1560732488-6b0df240254a', '1597852074816-d933c7d2b988', '1521542464131-cb30f7398bc6',
  '1629654297299-c8506221ca97', '1587620962725-abab7fe55159', '1614064641938-3bbee52942c7',
  '1518770660439-4636190af475', '1516321318423-f06f85e504b3', '1526374965328-7f61d4dc18c5'
];

let sqlMigration = `-- Migration: Fix 404 Unsplash images and add 5 new Git lessons\n\n`;

// 1. Fix 12 broken images
for (let i = 0; i < brokenIds.length; i++) {
  const lessonId = brokenIds[i];
  const photo = validPhotos[i];
  const url = `https://images.unsplash.com/photo-${photo}?w=600&q=80&auto=format`;
  sqlMigration += `UPDATE public.lessons SET thumbnail_url = '${url}' WHERE id = '${lessonId}';\n`;
}

// 2. Add 5 New Git Lessons
const newLessons = [
  {
    id: 'lesson-git-01',
    course_id: 'devnet-005',
    title_th: 'Introduction to Git',
    title_en: 'Introduction to Git',
    content_th: 'วิดีโอแนะนำพื้นฐานของ Git (init, add, commit)',
    content_en: 'Video tutorial on basic Git concepts (init, add, commit).',
    lesson_type: 'video',
    duration_minutes: 15,
    order_index: 1,
    video_url: 'https://www.youtube.com/watch?v=USjZcfj8yxE',
    thumbnail_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80&auto=format'
  },
  {
    id: 'lesson-git-02',
    course_id: 'devnet-005',
    title_th: 'GitHub & GitLab Workflows',
    title_en: 'GitHub & GitLab Workflows',
    content_th: 'เอกสารอธิบาย pull requests, branching และ code reviews',
    content_en: 'Text lesson explaining pull requests, branching, and code reviews.',
    lesson_type: 'reading',
    duration_minutes: 20,
    order_index: 2,
    video_url: null,
    thumbnail_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80&auto=format'
  },
  {
    id: 'lesson-git-03',
    course_id: 'devnet-005',
    title_th: 'Git Commands Knowledge Check',
    title_en: 'Git Commands Knowledge Check',
    content_th: 'แบบทดสอบคำสั่ง git status, git push และอื่นๆ',
    content_en: 'Quiz evaluating knowledge of git commands.',
    lesson_type: 'quiz',
    duration_minutes: 10,
    order_index: 3,
    video_url: null,
    thumbnail_url: 'https://images.unsplash.com/photo-1560732488-6b0df240254a?w=600&q=80&auto=format'
  },
  {
    id: 'lesson-git-04',
    course_id: 'devnet-005',
    title_th: 'Resolving a Merge Conflict',
    title_en: 'Resolving a Merge Conflict',
    content_th: 'แบบฝึกหัดสร้างและแก้ไข Merge Conflict ด้วยตนเอง',
    content_en: 'Hands-on lab instructions for causing and fixing a merge conflict.',
    lesson_type: 'exercise',
    duration_minutes: 25,
    order_index: 4,
    video_url: null,
    thumbnail_url: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=600&q=80&auto=format'
  },
  {
    id: 'lesson-git-05',
    course_id: 'devnet-005',
    title_th: 'CI/CD Pipelines for Network Code',
    title_en: 'CI/CD Pipelines for Network Code',
    content_th: 'วิดีโอสาธิต automated network testing ด้วย GitHub Actions',
    content_en: 'Video demonstrating automated network testing using GitHub Actions.',
    lesson_type: 'video',
    duration_minutes: 30,
    order_index: 5,
    video_url: 'https://www.youtube.com/watch?v=R8_veQiYBjI',
    thumbnail_url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&q=80&auto=format'
  }
];

sqlMigration += `\n`;
for (const l of newLessons) {
  const vid = l.video_url ? `'${l.video_url}'` : 'NULL';
  sqlMigration += `INSERT INTO public.lessons (id, course_id, title_th, title_en, content_th, content_en, lesson_type, duration_minutes, order_index, video_url, thumbnail_url, created_at, updated_at) VALUES ('${l.id}', '${l.course_id}', '${l.title_th}', '${l.title_en}', '${l.content_th}', '${l.content_en}', '${l.lesson_type}', ${l.duration_minutes}, ${l.order_index}, ${vid}, '${l.thumbnail_url}', NOW(), NOW());\n`;
}

const migrationFile = 'supabase/migrations/20260604000003_fix_images_and_add_git_lessons.sql';
fs.writeFileSync(migrationFile, sqlMigration);
console.log(`Migration written to ${migrationFile}`);

// 3. Clean up seed.sql and re-insert correctly
let seedSql = fs.readFileSync('src/app/data/seed.sql', 'utf8');

// First, remove the bad insertBlock we added last time. 
// It starts with: -- GIT LESSONS (devnet-005)
// And ends right before -- QUIZZES
seedSql = seedSql.replace(/\n-- GIT LESSONS \(devnet-005\)[\s\S]*?(?=-- QUIZZES)/, '');

// The previous script might have left an extra trailing comma or removed the semicolon before -- QUIZZES
// Let's normalize it to just have the semicolon before -- QUIZZES if needed, but since we are inserting again, we will do it correctly.
if (seedSql.includes('NOW()),-- QUIZZES')) {
  seedSql = seedSql.replace(/NOW\(\)\),-- QUIZZES/g, 'NOW()),\n-- QUIZZES');
}
if (!seedSql.includes('NOW());\n-- QUIZZES') && !seedSql.includes('-- GIT LESSONS')) {
    // Make sure the last lesson statement ends properly. Let's just insert before `-- QUIZZES`.
    // Actually we can just do a regex replace on the last tuple:
    seedSql = seedSql.replace(/NOW\(\), NOW\(\)\);(\s*)-- QUIZZES/, 'NOW(), NOW()),$1-- QUIZZES');
}

let insertBlock = `\n-- GIT LESSONS (devnet-005)\n`;
for (const l of newLessons) {
  const vid = l.video_url ? `'${l.video_url}'` : 'NULL';
  insertBlock += `('${l.id}', '${l.course_id}', '${l.title_th}', '${l.title_en}', '${l.content_th}', '${l.content_en}', '${l.lesson_type}', ${l.duration_minutes}, ${l.order_index}, ${vid}, '${l.thumbnail_url}', NOW(), NOW()),\n`;
}

// Ensure the last comma becomes a semicolon
insertBlock = insertBlock.slice(0, -2) + `;\n`;

seedSql = seedSql.replace(/NOW\(\), NOW\(\)\),(\s*)-- QUIZZES/, `NOW(), NOW()),${insertBlock}$1-- QUIZZES`);

fs.writeFileSync('src/app/data/seed.sql', seedSql);
console.log('Updated seed.sql');
