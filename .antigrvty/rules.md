# MEMORY RULE: GITIGNORE-FIRST

Before any project analysis:

1. Read `.gitignore` first.
2. Treat ignored files/folders as non-project context.
3. Never scan ignored files unless explicitly requested.
4. Never index:
   - `node_modules`
   - `dist`
   - `build`
   - `coverage`
   - `.git`
   - `logs`
   - cache folders
   - generated test artifacts
5. Respect `.rooignore`, `.cursorignore`, `.clineignore` if present.
6. Exclude ignored files from:
   - code analysis
   - refactoring
   - embeddings
   - project summaries
   - architecture reviews
7. When searching project:
   - search only tracked source files.
8. Before large scans:
   - report ignored file count.
9. Prefer smallest possible context window.
10. Minimize token usage at all times.

If a file is ignored: assume it is irrelevant unless user explicitly requests it.

---

# TOKEN OPTIMIZATION MODE

Always:
1. Read `.gitignore` first
2. Read `package.json` second
3. Read current task files third

Never scan entire repository unless required.

Priority:
`Task files` -> `Imported files` -> `Local dependencies` -> `Project-wide search (last resort)`

**Goal**: Maximum accuracy with minimum token consumption.