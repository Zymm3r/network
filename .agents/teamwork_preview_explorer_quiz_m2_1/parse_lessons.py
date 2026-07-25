import os
import re
import json

project_root = r"C:\Users\UTHtest\.gemini\antigravity\worktrees\network\fix-lesson-completion-logic"
migrations_dir = os.path.join(project_root, "supabase", "migrations")
seed_sql_path = os.path.join(project_root, "src", "app", "data", "seed.sql")

lessons = {}

# Clean SQL quotes
def clean_sql_string(val):
    if not val:
        return ""
    val = val.strip()
    if val.startswith("'") and val.endswith("'"):
        val = val[1:-1]
    # Replace escaped single quotes
    val = val.replace("''", "'")
    return val

# Parse seed.sql
print("Parsing seed.sql...")
try:
    with open(seed_sql_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Simple regex to find the INSERT INTO lessons VALUES block
    # We can match everything between INSERT INTO lessons ... VALUES and the next semicolon
    insert_pattern = re.compile(r"INSERT INTO lessons\s*\([^)]+\)\s*VALUES\s*(.*?);", re.DOTALL | re.IGNORECASE)
    match = insert_pattern.search(content)
    if match:
        values_block = match.group(1)
        # Split values block by rows, which are typically formatted like ('val', 'val', ...),
        # We can split by '), ('
        # To be safe, we split by '), \n(' or similar, or use a state machine
        in_row = False
        row_content = ""
        rows = []
        i = 0
        while i < len(values_block):
            char = values_block[i]
            if char == '(' and not in_row:
                in_row = True
                row_content = ""
            elif char == ')' and in_row:
                in_row = False
                rows.append(row_content)
            elif in_row:
                row_content += char
            i += 1
        
        for row in rows:
            # Parse columns, respecting quotes
            cols = []
            curr = ""
            in_quote = False
            i = 0
            while i < len(row):
                c = row[i]
                if c == "'" and i + 1 < len(row) and row[i+1] == "'":
                    curr += "'"
                    i += 2
                    continue
                elif c == "'":
                    in_quote = not in_quote
                    curr += "'"
                elif c == "," and not in_quote:
                    cols.append(curr.strip())
                    curr = ""
                else:
                    curr += c
                i += 1
            cols.append(curr.strip())
            
            if len(cols) >= 7:
                lid = clean_sql_string(cols[0])
                title_th = clean_sql_string(cols[2])
                title_en = clean_sql_string(cols[3])
                content_th = clean_sql_string(cols[4])
                content_en = clean_sql_string(cols[5])
                ltype = clean_sql_string(cols[6])
                lessons[lid] = {
                    "id": lid,
                    "title_th": title_th,
                    "title_en": title_en,
                    "content_th": content_th,
                    "content_en": content_en,
                    "lesson_type": ltype,
                    "source": "seed.sql"
                }
except Exception as e:
    print(f"Error parsing seed.sql: {e}")

# Parse migrations
print("Parsing migrations...")
migration_files = sorted([f for f in os.listdir(migrations_dir) if f.endswith(".sql")])

for file in migration_files:
    file_path = os.path.join(migrations_dir, file)
    with open(file_path, "r", encoding="utf-8") as f:
        sql = f.read()
    
    # Let's split by statement (ignoring semicolons in quotes)
    statements = []
    current = ""
    in_quote = False
    i = 0
    while i < len(sql):
        c = sql[i]
        if c == "'" and i + 1 < len(sql) and sql[i+1] == "'":
            current += "''"
            i += 2
            continue
        elif c == "'":
            in_quote = not in_quote
            current += "'"
        elif c == ";" and not in_quote:
            statements.append(current)
            current = ""
        else:
            current += c
        i += 1
    if current.strip():
        statements.append(current)
        
    for stmt in statements:
        stmt = stmt.strip()
        stmt_upper = stmt.upper()
        if stmt_upper.startswith("INSERT INTO PUBLIC.LESSONS") or stmt_upper.startswith("INSERT INTO LESSONS"):
            # Find VALUES
            val_match = re.search(r"VALUES\s+(.*)$", stmt, re.DOTALL | re.IGNORECASE)
            if val_match:
                vals = val_match.group(1)
                in_row = False
                row_content = ""
                rows = []
                j = 0
                while j < len(vals):
                    char = vals[j]
                    if char == '(' and not in_row:
                        in_row = True
                        row_content = ""
                    elif char == ')' and in_row:
                        in_row = False
                        rows.append(row_content)
                    elif in_row:
                        row_content += char
                    j += 1
                for row in rows:
                    cols = []
                    curr = ""
                    in_quote = False
                    j = 0
                    while j < len(row):
                        c = row[j]
                        if c == "'" and j + 1 < len(row) and row[j+1] == "'":
                            curr += "'"
                            j += 2
                            continue
                        elif c == "'":
                            in_quote = not in_quote
                            curr += "'"
                        elif c == "," and not in_quote:
                            cols.append(curr.strip())
                            curr = ""
                        else:
                            curr += c
                        j += 1
                    cols.append(curr.strip())
                    if len(cols) >= 7:
                        lid = clean_sql_string(cols[0])
                        title_th = clean_sql_string(cols[2])
                        title_en = clean_sql_string(cols[3])
                        content_th = clean_sql_string(cols[4])
                        content_en = clean_sql_string(cols[5])
                        ltype = clean_sql_string(cols[6])
                        lessons[lid] = {
                            "id": lid,
                            "title_th": title_th,
                            "title_en": title_en,
                            "content_th": content_th,
                            "content_en": content_en,
                            "lesson_type": ltype,
                            "source": file
                        }
        elif stmt_upper.startswith("UPDATE PUBLIC.LESSONS") or stmt_upper.startswith("UPDATE LESSONS"):
            # Update statement
            # UPDATE [public.]lessons SET ... WHERE id = '...';
            where_match = re.search(r"WHERE\s+id\s*=\s*'([^']+)'", stmt, re.IGNORECASE)
            if not where_match:
                continue
            lid = where_match.group(1)
            if lid not in lessons:
                lessons[lid] = {
                    "id": lid,
                    "title_th": "",
                    "title_en": "",
                    "content_th": "",
                    "content_en": "",
                    "lesson_type": "",
                    "source": file
                }
            
            # Extract SET assignments
            set_match = re.search(r"SET\s+(.*?)\s+WHERE", stmt, re.DOTALL | re.IGNORECASE)
            if not set_match:
                continue
            set_part = set_match.group(1)
            
            # Parse SET assignments
            assignments = {}
            j = 0
            in_quote = False
            curr_key = ""
            curr_val = ""
            in_val = False
            while j < len(set_part):
                c = set_part[j]
                if c == "'" and j + 1 < len(set_part) and set_part[j+1] == "'":
                    if in_val:
                        curr_val += "''"
                    j += 2
                    continue
                elif c == "'":
                    in_quote = not in_quote
                    if in_val:
                        curr_val += "'"
                    j += 1
                    continue
                elif c == "=" and not in_quote and not in_val:
                    in_val = True
                    j += 1
                    continue
                elif c == "," and not in_quote and in_val:
                    assignments[curr_key.strip()] = curr_val.strip()
                    curr_key = ""
                    curr_val = ""
                    in_val = False
                    j += 1
                    continue
                
                if in_val:
                    curr_val += c
                else:
                    curr_key += c
                j += 1
            if curr_key.strip() and in_val:
                assignments[curr_key.strip()] = curr_val.strip()
                
            for col, val in assignments.items():
                col_name = col.lower().strip()
                val_cleaned = clean_sql_string(val)
                if col_name == "title_en":
                    lessons[lid]["title_en"] = val_cleaned
                elif col_name == "title_th":
                    lessons[lid]["title_th"] = val_cleaned
                elif col_name == "content_en":
                    lessons[lid]["content_en"] = val_cleaned
                elif col_name == "content_th":
                    lessons[lid]["content_th"] = val_cleaned
                elif col_name == "lesson_type":
                    lessons[lid]["lesson_type"] = val_cleaned

print(f"Total unique lessons parsed: {len(lessons)}")
with open(os.path.join(os.path.dirname(__file__), "lessons_extracted.json"), "w", encoding="utf-8") as f:
    json.dump(lessons, f, indent=2, ensure_ascii=False)
print("Saved to lessons_extracted.json")
