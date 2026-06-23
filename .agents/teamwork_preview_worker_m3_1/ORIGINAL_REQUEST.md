## 2026-06-23T02:53:30Z
You are a Worker agent (worker_m3_1). Your working directory is c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_worker_m3_1.
Your task is to implement Milestone 3 (UI Translation & Switcher) for the UTech i18n project.
You must adhere to the UTech Standards Guide (c:\Users\UTHtest\Downloads\app.hotel\.agents\skills\utech-standards\SKILL.md).

Specifically, perform these tasks:
1. Overwrite the file `PROJECT.md` at the project root (`c:\Users\UTHtest\Downloads\app.hotel\PROJECT.md`) with the contents of our new project plan located at `c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_orchestrator_i18n_1\PROJECT.md`. This is critical so that future subagents can read the correct milestones.
2. Read the following analysis reports carefully:
   - `c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_explorer_m1_1\analysis.md` (Contains exact strings, file paths, and key mappings for R1 UI translation).
   - `c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_explorer_m1_3\analysis.md` (Contains additional gaps like `CourseCard.tsx`, `Lessons.tsx`, `LessonCard.tsx`, `Paths.tsx`, `GlobalSearch.tsx` and persistence).
3. Update `src/app/i18n/th.ts` and `src/app/i18n/en.ts` with all the proposed additions from both analysis reports. Ensure that their key structures are completely identical.
4. Update the frontend files to consume the translations using `useI18n()` and `t.category.key`, eliminating all hardcoded Thai/English UI strings and inline language ternaries:
   - Equipment features: `src/features/equipment/components/EquipmentDetailTabs.tsx`, `src/features/equipment/pages/EquipmentDetailPage.tsx`, `src/features/equipment/pages/EquipmentPage.tsx`, `src/features/equipment/components/EquipmentCard.tsx`, `src/features/equipment/components/EquipmentGrid.tsx`, `src/features/equipment/components/WiringSimulator.tsx`
   - Other Pages & Components: `src/app/pages/Dashboard.tsx`, `src/app/pages/Profile.tsx`, `src/app/pages/Auth.tsx`, `src/app/pages/VerifyCertificate.tsx`, `src/app/pages/Courses.tsx`, `src/app/components/layout/Sidebar.tsx`, `src/app/pages/LessonDetail.tsx`
   - Gaps identified in analysis: `src/app/components/course/CourseCard.tsx`, `src/app/pages/Lessons.tsx`, `src/app/components/lesson/LessonCard.tsx`, `src/app/pages/Paths.tsx`, `src/app/components/GlobalSearch.tsx`.
5. Run `npm run build` to verify there are no compilation or TypeScript errors.

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Produce a handoff report in `c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_worker_m3_1\handoff.md` and report your completion back.
