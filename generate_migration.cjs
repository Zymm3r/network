const fs = require('fs');
const articles = require('./researched_articles.cjs');

// Estimate duration based on character length
// English: ~230 WPM, avg word 5 chars = 1150 chars/min
// Thai: ~180 WPM, avg word 4 chars = 720 chars/min
function calculateReadingTime(content_th, content_en) {
  const min_th = Math.ceil(content_th.length / 720);
  const min_en = Math.ceil(content_en.length / 1150);
  return Math.max(min_th, min_en, 2); // Minimum 2 minutes
}

let sql = `-- Migration: Update reading lesson content\n\n`;

for (const article of articles) {
  const duration = calculateReadingTime(article.content_th, article.content_en);
  
  // Escape single quotes for SQL
  const safeTh = article.content_th.replace(/'/g, "''");
  const safeEn = article.content_en.replace(/'/g, "''");
  
  sql += `UPDATE lessons \n`;
  sql += `SET content_th = '${safeTh}', \n`;
  sql += `    content_en = '${safeEn}', \n`;
  sql += `    duration_minutes = ${duration} \n`;
  sql += `WHERE id = '${article.id}' AND lesson_type = 'reading';\n\n`;
}

fs.writeFileSync('migration.sql', sql, 'utf8');
console.log('Successfully generated migration.sql');
