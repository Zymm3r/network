import os

search_dir = r"C:\Users\UTHtest\.gemini\antigravity"
query = "netvfzmdewatfnmejcrz"

print(f"Searching for '{query}' in {search_dir}...")
count = 0

# We will ignore worktrees to avoid finding our own project files
for root, dirs, files in os.walk(search_dir):
    if "worktrees" in root or "annotations" in root or "implicit" in root or "html_artifacts" in root:
        continue
    for file in files:
        if file.endswith(".log") or file.endswith(".txt") or file.endswith(".json") or file.endswith(".pbtxt") or file.endswith(".xml") or file.endswith(".ini") or file.endswith(".toml"):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                if query in content:
                    print(f"Found in: {path}")
                    count += 1
                    # print some lines around it
                    lines = content.splitlines()
                    for idx, line in enumerate(lines):
                        if query in line:
                            start = max(0, idx - 2)
                            end = min(len(lines), idx + 3)
                            print(f"  Lines {start+1}-{end}:")
                            for i in range(start, end):
                                print(f"    {i+1}: {lines[i]}")
            except Exception as e:
                pass

print(f"Search completed. Found {count} occurrences.")
