# Progress Update
Last visited: 2026-06-06T14:31:30Z

- Initialized working directory.
- Searched and viewed `usePython.ts`, `ExerciseCard.tsx`, and `pythonWorker.ts`.
- Analyzed the OOM bug in `pythonWorker.ts`: identified that `s` string must be truncated directly at the beginning of `write` method to prevent memory bypass.
- Analyzed eager loading bug in `ExerciseCard.tsx`: identified the `useEffect` that calls `initWorker()` on mount.
- Analyzed the UX flaw in `ExerciseCard.tsx`: identified that `TerminalLine` for test cases does not show `tc.actual` when the test fails.
- Preparing the `handoff.md` with detailed instructions on how to patch the issues.
