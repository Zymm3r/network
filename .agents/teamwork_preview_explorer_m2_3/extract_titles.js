import fs from 'fs';
import path from 'path';

const migrationsDir = 'C:\\Users\\UTHtest\\.gemini\\antigravity\\worktrees\\network\\fix-lesson-completion-logic\\supabase\\migrations';
const extractedPath = 'C:\\Users\\UTHtest\\.gemini\/\/antigravity\\worktrees\\network\\fix-lesson-completion-logic\\.agents\\teamwork_preview_explorer_m2_3\\lessons_extracted.json';

const lessons = JSON.parse(fs.readFileSync(extractedPath, 'utf8'));
const lessonsMap = {};
lessons.forEach(l => {
  lessonsMap[l.id] = l;
});

const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort();

const commentRegex = /--\s*(lesson-[a-zA-Z0-9-_]+)\s*\|\s*(.+)/g;

for (const file of files) {
  const filePath = path.join(migrationsDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  let m;
  while ((m = commentRegex.exec(content)) !== null) {
    const id = m[1].trim();
    const title = m[2].trim();
    
    if (lessonsMap[id]) {
      // If we don't have a title_en, or it's empty, use this parsed title
      if (!lessonsMap[id].title_en) {
        lessonsMap[id].title_en = title;
        console.log(`Associated title for ${id}: ${title}`);
      }
    } else {
      // Create new lesson entry
      lessonsMap[id] = { id, title_en: title, content_en: null };
      console.log(`Created new lesson entry from comment ${id}: ${title}`);
    }
  }
}

// Fallback: If title_en is still missing, try to parse it from the first line of content_en (e.g. ## Title)
Object.values(lessonsMap).forEach(l => {
  if (!l.title_en && l.content_en) {
    const firstLine = l.content_en.split('\n')[0];
    if (firstLine.startsWith('## ')) {
      l.title_en = firstLine.substring(3).trim();
      console.log(`Fallback title for ${l.id} from content: ${l.title_en}`);
    }
  }
});

// Save the updated list
fs.writeFileSync(extractedPath, JSON.stringify(Object.values(lessonsMap), null, 2), 'utf8');
console.log(`Updated lessons saved. Total: ${Object.keys(lessonsMap).length}`);
