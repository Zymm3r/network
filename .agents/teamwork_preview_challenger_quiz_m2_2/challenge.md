## Challenge Summary

**Overall risk assessment**: LOW

## Challenges

### Low Challenge 1: Absence of Database-Level Schema Validation for `quiz_data`

- Assumption challenged: The system assumes that all `quiz_data` in the database will always conform to the `LessonQuizData` schema.
- Attack scenario: If a developer manually updates the database or a bug in a future migration inserts a malformed JSON payload into `quiz_data`, the client-side code will crash when reading it because Postgres allows any valid JSON by default for the `jsonb` type.
- Blast radius: Frontend client crashes when visiting lessons with malformed quiz data (specifically if `questions` is null, not an array, or missing required fields).
- Mitigation: Add a Postgres CHECK constraint using a database function or trigger to validate the structure of `quiz_data` against the `LessonQuizData` schema at the database level.

### Low Challenge 2: Duplicate Options in Quiz Questions

- Assumption challenged: The choices in the `options` array are assumed to be distinct.
- Attack scenario: A lesson could have quiz data populated with duplicate options (e.g. `["Option A", "Option B", "Option A", "Option C"]`). This would confuse users when answering the quiz, as multiple options show the exact same text.
- Blast radius: Poor user experience / confusion for students taking the quiz, although technically valid according to the TypeScript interface.
- Mitigation: Add validation to verify that all elements in the `options` array are unique.

## Stress Test Results

- **Complete database parsing test** -> All 73 records queried and parsed -> Successful parsing of all JSON payloads with zero parsing failures -> PASS
- **Structural compliance test** -> All 365 questions checked against `LessonQuizData` -> All questions contain required properties (`question_en`, `question_th`, `options`, `correct_index`) -> PASS
- **`correct_index` bounds test** -> All 365 questions checked for bounds `0 <= correct_index < options.length` -> No indices out of bounds -> PASS
- **Empty options test** -> Options checked for empty or whitespace-only strings -> No empty options found -> PASS
- **Formatting / Truncation check** -> Check for double-escaped formatting sequences or trailing ellipses -> No anomalies detected -> PASS

## Unchallenged Areas

- **Frontend execution behavior under network failure** — Out of scope.
- **Authentication validation during quiz submission** — Out of scope.
