# Original User Request

## Initial Request — 2026-06-08T14:37:44Z

# Teamwork Project Prompt — Draft

> Status: Launched
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Implement a Wiring Simulator MVP, functional training media modals, and fix unclickable tabs for the Equipment Catalog.

Working directory: c:\Users\UTHtest\Downloads\app.hotel
Integrity mode: development

## Requirements

### R1. EquipmentDetailTabs Updates
Update `EquipmentDetailTabs.tsx` to include functional button actions, a Training modal/video player, and a new modular Simulator tab.

### R2. Wiring Simulator MVP
Create a simple clickable MVP simulator (`WiringSimulator.tsx`) where users can connect devices. Include these initial simulation scenarios:
- Power Supply → CCTV Camera
- LAN Cable → Access Point
- NVR → IP Camera
The simulator must show connection status, validation feedback, and completion percentage. The simulator must dynamically map the correct scenario based on the `product.category` (e.g., 'CCTV' -> NVR/IP Camera scenario, 'Network' -> LAN/AP scenario).

### R3. Training Media Database Migration
Create an idempotent SQL migration to seed `training_lessons` with placeholder YouTube training videos, linked to existing `training_courses` records. Do not modify existing production data outside of migrations.

## Acceptance Criteria

### Verification
- [ ] Training tab displays at least one playable lesson.
- [ ] Simulator tab is fully functional without requiring external services.
- [ ] Equipment page contains no placeholder buttons with no actions.
- [ ] All seeded content loads from Supabase, not hardcoded frontend data.

## Follow-up — 2026-07-14T07:30:40Z

# Teamwork Project Prompt — Draft

> Status: Ready for launch — awaiting user approval.
> Goal: Craft prompt → get user approval → delegate to teamwork_preview

Refactor the application to support per-lesson quizzes and auto-generate 5 quiz questions for each of the 73 lessons based on their English content.

Working directory: C:\Users\UTHtest\.gemini\antigravity\worktrees\network\fix-lesson-completion-logic
Integrity mode: development

## Requirements

### R1. Database Schema Migration
Create a Supabase SQL migration file that adds a `quiz_data` column of type `jsonb` to the `lessons` table.

### R2. Data Generation
Connect to the Supabase database or use the MCP tool to read the `content_en` for all 73 lessons from the `lessons` table. For each lesson, generate exactly 5 relevant multiple-choice quiz questions based on the content. Format the output as a JSON array matching the existing `QuizQuestion` interface structure (id, question, choices, correctIndex, explanation, hint).

### R3. Data Insertion Migration
Create one or more Supabase SQL migration files containing `UPDATE lessons SET quiz_data = '...' WHERE id = '...';` for all 73 lessons to insert the generated JSON data.

### R4. UI Integration
- Update `src/app/types/index.ts` to include `quiz_data?: any` (or proper type) in the `Lesson` interface.
- Update `src/app/components/QuizCard.tsx` to accept a `lesson` object instead of (or in addition to) `courseId`, and use `lesson.quiz_data` as the source of truth for the quiz questions. If `lesson.quiz_data` is empty, fallback gracefully.
- Update `src/app/pages/LessonDetail.tsx` to pass the `lesson` object to the `QuizCard` component.

## Acceptance Criteria

### Schema Updates
- [ ] A migration file exists in `supabase/migrations/` that adds the `quiz_data` JSONB column to the `lessons` table.

### Data Completeness
- [ ] SQL Migration files exist containing valid `UPDATE` statements for all 73 lessons.
- [ ] Each UPDATE statement contains a valid JSON array of 5 questions.

### Application Logic
- [ ] The `QuizCard` component successfully reads and displays questions from `lesson.quiz_data`.
- [ ] The application compiles without TypeScript errors (`npx tsc --noEmit` or `npm run build`).

## Follow-up — 2026-07-14T14:56:17Z

The server restarted and you were stopped due to API quota limits. The quota has now reset. Please resume your task of generating 5 quiz questions based on content_en for each of the 73 lessons and creating the SQL data insertion migration files. Also, ensure you complete the UI Integration (updating types/index.ts, QuizCard.tsx, and LessonDetail.tsx) as defined in the original prompt.
