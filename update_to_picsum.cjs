const fs = require('fs');

let sqlMigration = `-- Migration: Convert all thumbnails to use unique Picsum seeds\n\n`;

let seedSql = fs.readFileSync('src/app/data/seed.sql', 'utf8');

// The lessons block starts at `INSERT INTO lessons ... VALUES` and ends with `;`
// Let's extract all lesson IDs from seedSql to generate the UPDATE statements.
// Each lesson insert line looks roughly like: ('lesson-id', 'course-id', ...
const lessonRegex = /\('(lesson-[^']+)'/g;
let match;
const lessonIds = [];

while ((match = lessonRegex.exec(seedSql)) !== null) {
    lessonIds.push(match[1]);
}

console.log(`Found ${lessonIds.length} lessons in seed.sql`);

for (const id of lessonIds) {
    const picsumUrl = `https://picsum.photos/seed/${id}/600/400`;
    sqlMigration += `UPDATE public.lessons SET thumbnail_url = '${picsumUrl}' WHERE id = '${id}';\n`;
}

const migrationFile = 'supabase/migrations/20260604000004_update_thumbnails_to_picsum.sql';
fs.writeFileSync(migrationFile, sqlMigration);
console.log(`Migration written to ${migrationFile}`);

// Replace all occurrences of https://images.unsplash.com/... or lesson-thumbnails/... in the lessons block of seed.sql
// We can use a replacer function on the lesson tuples
// Find lines starting with `('lesson-`
const tupleRegex = /\('lesson-[^']+',[\s\S]*?\)(?=,|;)/g;

seedSql = seedSql.replace(tupleRegex, (tupleMatch) => {
    // extract the lesson ID
    const idMatch = tupleMatch.match(/\('([^']+)'/);
    if (!idMatch) return tupleMatch;
    const lessonId = idMatch[1];
    const picsumUrl = `https://picsum.photos/seed/${lessonId}/600/400`;

    // The tuple has values separated by commas.
    // The thumbnail_url is the 3rd to last column.
    // Let's parse columns safely
    let cols = tupleMatch.split(/,\s*(?=(?:[^']*'[^']*')*[^']*$)/);
    if (cols.length >= 11) {
        cols[cols.length - 3] = `'${picsumUrl}'`; // 3rd from end is thumbnail_url
        return cols.join(', ');
    }
    return tupleMatch;
});

fs.writeFileSync('src/app/data/seed.sql', seedSql);
console.log('Updated seed.sql');
