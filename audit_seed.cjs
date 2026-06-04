const fs = require('fs');
const sql = fs.readFileSync('src/app/data/seed.sql', 'utf8');

const lessonsMatch = sql.match(/INSERT INTO lessons \([^)]+\) VALUES\s*([\s\S]*?);/i);
if (lessonsMatch) {
  const valuesStr = lessonsMatch[1];
  const tuples = valuesStr.split(/\),\s*(?=\()/);
  console.log(`Found ${tuples.length} lessons`);
  let count = 0;
  for (let i = 0; i < tuples.length; i++) {
    const t = tuples[i].replace(/^\(|\)$/g, '');
    const cols = t.split(/,\s*(?=(?:[^']*'[^']*')*[^']*$)/);
    if(cols.length < 11) continue;
    
    const id = cols[0];
    const type = cols[6];
    const video = cols[9];
    const thumb = cols[10];
    
    if (video.includes('example.com') || thumb.includes('/images/')) {
        console.log(`${id} | ${type} | ${video} | ${thumb}`);
        count++;
    }
  }
  console.log(`Found ${count} remaining placeholder lessons.`);
} else {
  console.log('No lessons INSERT found');
}
