import json

path = r"C:\Users\UTHtest\.gemini\antigravity\worktrees\network\fix-lesson-completion-logic\.agents\teamwork_preview_explorer_m2_2\lessons_extracted.json"
data = json.load(open(path, "r", encoding="utf-8"))

structure_counts = {
    "headers": 0,
    "code_blocks": 0,
    "lists": 0,
    "tables": 0
}

lengths = []

for l in data:
    content = l["content_en"] or ""
    lengths.append(len(content))
    if "##" in content or "#" in content:
        structure_counts["headers"] += 1
    if "```" in content:
        structure_counts["code_blocks"] += 1
    if "- " in content or "* " in content:
        structure_counts["lists"] += 1
    if "|" in content:
        structure_counts["tables"] += 1

print(f"Total lessons: {len(data)}")
print(f"Min length: {min(lengths)}")
print(f"Max length: {max(lengths)}")
print(f"Avg length: {sum(lengths)/len(lengths):.2f}")
print("Structure Counts:")
for k, v in structure_counts.items():
    print(f"  {k}: {v} ({v/len(data)*100:.1f}%)")

print("\nSample lesson content (lesson-ccna001-01):")
sample = next(x for x in data if x["id"] == "lesson-ccna001-01")
print(sample["content_en"][:400] + "...")
