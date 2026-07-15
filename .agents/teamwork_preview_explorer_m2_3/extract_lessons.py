import os
import re
import json

migrations_dir = r"C:\Users\UTHtest\.gemini\antigravity\worktrees\network\fix-lesson-completion-logic\supabase\migrations"
seed_path = r"C:\Users\UTHtest\.gemini\antigravity\worktrees\network\fix-lesson-completion-logic\src\app\data\seed.sql"

lessons = {}

# Helper to normalize and add/update a lesson
def update_lesson(lesson_id, title_en=None, content_en=None):
    if lesson_id not in lessons:
        lessons[lesson_id] = {"id": lesson_id, "title_en": None, "content_en": None}
    if title_en:
        lessons[lesson_id]["title_en"] = title_en.strip()
    if content_en:
        # Resolve dollar quotes if present
        if content_en.startswith("$$") and content_en.endswith("$$"):
            content_en = content_en[2:-2]
        lessons[lesson_id]["content_en"] = content_en.strip()

# 1. Parse seed.sql
print("Parsing seed.sql...")
if os.path.exists(seed_path):
    with open(seed_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Parse INSERT INTO lessons
    # Pattern to find the INSERT statement values block
    insert_match = re.search(r"INSERT INTO lessons \([^)]*\) VALUES\s*(.*?);", content, re.DOTALL | re.IGNORECASE)
    if insert_match:
        values_block = insert_match.group(1)
        # Parse individual tuples: ('id', 'course_id', 'title_th', 'title_en', 'content_th', 'content_en', ...)
        # We can extract strings within single quotes, paying attention to escaped quotes
        # Since it's a regular structure: ('id','course','title_th','title_en','content_th','content_en',...)
        # We can split by values pattern
        tuples = re.findall(r"\(([^)]+)\)", values_block)
        for t in tuples:
            # simple parse by comma-splitting after resolving quote groupings
            # Since it's a seed file, let's use a regex to match single quoted strings
            parts = re.findall(r"'((?:[^'\\]|\\.)*)'", t)
            if len(parts) >= 6:
                lid = parts[0]
                title_en = parts[3]
                content_en = parts[5]
                update_lesson(lid, title_en=title_en, content_en=content_en)
                # print(f"Seed lesson found: {lid} - {title_en}")

# 2. Parse all migrations
print("Parsing migrations...")
sql_files = sorted([f for f in os.listdir(migrations_dir) if f.endswith(".sql")])

for file_name in sql_files:
    file_path = os.path.join(migrations_dir, file_name)
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Check for INSERT INTO public.lessons
    inserts = re.findall(r"INSERT INTO public\.lessons \([^)]*\) VALUES\s*\(([^)]+)\);", content, re.DOTALL | re.IGNORECASE)
    for ins in inserts:
        parts = re.findall(r"'((?:[^'\\]|\\.)*)'", ins)
        if len(parts) >= 6:
            lid = parts[0]
            title_en = parts[3]
            content_en = parts[5]
            update_lesson(lid, title_en=title_en, content_en=content_en)
            # print(f"Migration insert found in {file_name}: {lid} - {title_en}")

    # Check for UPDATE public.lessons or UPDATE lessons
    # Pattern 1: UPDATE public.lessons SET content_en = '...' WHERE id = '...';
    # Pattern 2: UPDATE public.lessons SET content_th = '...', content_en = '...' WHERE id = '...';
    # Or setting content_en with dollar-quotes: content_en = $$...$$
    
    # We can search for all UPDATE statements targeting lessons
    updates = re.finditer(r"UPDATE\s+(?:public\.)?lessons\s+SET\s+(.*?)\s+WHERE\s+id\s*=\s*'([^']+)';", content, re.DOTALL | re.IGNORECASE)
    for match in updates:
        set_clause = match.group(1)
        lid = match.group(2)
        
        # Try to extract content_en
        # It could be single quoted or dollar quoted
        content_en_match = re.search(r"content_en\s*=\s*('\s*(?:[^'\\]|\\.|'')*'\s*|\$\$(.*?)\$\$)", set_clause, re.DOTALL | re.IGNORECASE)
        title_en_match = re.search(r"title_en\s*=\s*('\s*(?:[^'\\]|\\.|'')*'\s*|\$\$(.*?)\$\$)", set_clause, re.DOTALL | re.IGNORECASE)
        
        title_en = None
        content_en = None
        
        if title_en_match:
            val = title_en_match.group(1)
            if val.startswith("$$"):
                title_en = title_en_match.group(2)
            else:
                title_en = val[1:-1].replace("''", "'")
                
        if content_en_match:
            val = content_en_match.group(1)
            if val.startswith("$$"):
                content_en = content_en_match.group(2)
            else:
                content_en = val[1:-1].replace("''", "'")
                
        if title_en or content_en:
            update_lesson(lid, title_en=title_en, content_en=content_en)
            # print(f"Migration update found in {file_name}: {lid}")

# 3. Save to a file for analysis
output_path = r"C:\Users\UTHtest\.gemini\antigravity\worktrees\network\fix-lesson-completion-logic\.agents\teamwork_preview_explorer_m2_3\lessons_extracted.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(list(lessons.values()), f, indent=2, ensure_ascii=False)

print(f"Extraction completed. Total lessons found: {len(lessons)}")
print(f"Saved to: {output_path}")
