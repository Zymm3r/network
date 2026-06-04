const fs = require('fs');
let sql = fs.readFileSync('src/app/data/seed.sql', 'utf8');
sql = sql.replace(/('ccna001-\d+\.jpg'|'wireshark-\d+\.jpg'|'python-\d+\.jpg'|'sec-\d+\.jpg'|'adv-\d+\.jpg')/g, (match) => {
    return match.replace("'", "'lesson-thumbnails/");
});
fs.writeFileSync('src/app/data/seed.sql', sql);
console.log('Done');
