import os
import re

migrations_dir = r"C:\Users\UTHtest\.gemini\antigravity\worktrees\network\fix-lesson-completion-logic\supabase\migrations"
seed_file = r"C:\Users\UTHtest\.gemini\antigravity\worktrees\network\fix-lesson-completion-logic\src\app\data\seed.sql"

lessons = {}

def parse_file(path):
    with open(path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
        
        # Find all inserts
        # Since inserts can be multi-line or single-line, let's look for matches
        for match in re.finditer(r"INSERT\s+INTO\s+(?:public\.)?lessons\s*\(([^)]+)\)\s*VALUES\s*(.+?);", content, re.IGNORECASE | re.DOTALL):
            columns = [c.strip() for c in match.group(1).split(",")]
            val_str = match.group(2)
            
            # Find individual row values inside ( ... ), ( ... )
            # Values string can be: ('lesson-git-01', ...), ('lesson-git-02', ...)
            # Let's split them by parsing parentheses
            rows_str = []
            current = []
            in_quote = False
            paren_depth = 0
            for char in val_str:
                if char == "'":
                    in_quote = not in_quote
                    current.append(char)
                elif char == "(" and not in_quote:
                    paren_depth += 1
                    if paren_depth == 1:
                        # start of row
                        current = []
                    else:
                        current.append(char)
                elif char == ")" and not in_quote:
                    paren_depth -= 1
                    if paren_depth == 0:
                        rows_str.append("".join(current).strip())
                    else:
                        current.append(char)
                else:
                    if paren_depth > 0:
                        current.append(char)
            
            for row_val in rows_str:
                # Split row_val by comma
                parts = []
                current_part = []
                in_quote = False
                for char in row_val:
                    if char == "'":
                        in_quote = not in_quote
                        current_part.append(char)
                    elif char == "," and not in_quote:
                        parts.append("".join(current_part).strip())
                        current_part = []
                    else:
                        current_part.append(char)
                parts.append("".join(current_part).strip())
                
                cleaned_parts = []
                for p in parts:
                    if p.startswith("'") and p.endswith("'"):
                        cleaned_parts.append(p[1:-1].replace("''", "'"))
                    else:
                        cleaned_parts.append(p)
                
                row = dict(zip(columns, cleaned_parts))
                id_ = row.get("id")
                if id_:
                    lessons[id_] = {
                        "id": id_,
                        "title": row.get("title_en") or row.get("title_th"),
                        "content_en": row.get("content_en")
                    }
                    
        # Find all updates
        for match in re.finditer(r"UPDATE\s+(?:public\.)?lessons\s+SET\s+(.+?)\s+WHERE\s+id\s*=\s*'([^']+)';", content, re.IGNORECASE | re.DOTALL):
            set_clause = match.group(1)
            id_ = match.group(2)
            
            if id_ not in lessons:
                lessons[id_] = {"id": id_, "title": None, "content_en": None}
            
            # Extract content_en from set clause if present
            content_en_match = re.search(r"content_en\s*=\s*\$\$(.*?)\$\$", set_clause, re.DOTALL)
            if not content_en_match:
                content_en_match = re.search(r"content_en\s*=\s*'(.*?)'", set_clause, re.DOTALL)
            if content_en_match:
                lessons[id_]["content_en"] = content_en_match.group(1).replace("''", "'")
                
            title_match = re.search(r"title_en\s*=\s*'(.*?)'", set_clause, re.DOTALL)
            if title_match:
                lessons[id_]["title"] = title_match.group(1).replace("''", "'")

# Parse seed.sql first
parse_file(seed_file)

# Parse all migrations in order
for file in sorted(os.listdir(migrations_dir)):
    if not file.endswith(".sql"):
        continue
    parse_file(os.path.join(migrations_dir, file))

print(f"Total unique lessons found: {len(lessons)}")
for id_, l in sorted(lessons.items()):
    title = l["title"]
    content_len = len(l["content_en"]) if l["content_en"] else None
    print(f"{id_} | {title} | {content_len}")
