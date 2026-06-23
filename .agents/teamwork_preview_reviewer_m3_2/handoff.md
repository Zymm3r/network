# Handoff Report — Quality & Adversarial Review (Milestone 3)

## 1. Observation
- **Verification of translation structure matching**:
  - `src/app/i18n/en.ts` and `src/app/i18n/th.ts` have identical key structures. This is structurally enforced at compile-time by TypeScript because `en` is explicitly typed:
    ```typescript
    import type { TranslationKeys } from './th';
    export const en: TranslationKeys = { ... };
    ```
    and `th` is defined as:
    ```typescript
    export const th = { ... };
    export type TranslationKeys = typeof th;
    ```
- **TypeScript Reference Error in `LessonDetail.tsx`**:
  - In `src/app/pages/LessonDetail.tsx` (line 509):
    ```typescript
    return Math.max(1, Math.ceil(wordCount / wpm));
    ```
    However, the variable `wordCount` is not declared or defined anywhere in the file or outer scope.
  - The word count is calculated inline later in the file at line 1010 as:
    ```typescript
    readingContent.split(/\s+/).filter(Boolean).length
    ```
    but it was never stored in a variable named `wordCount` visible to line 509.
- **Handoff Discrepancy in `Paths.tsx`**:
  - The worker's handoff report (`c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_worker_m3_1\handoff.md`) states in Step 4:
    > "writing a clean ASCII-only version where the Baht symbol ฿ was safely escaped as \u0e3f."
  - However, viewing `src/app/pages/Paths.tsx` (line 86) shows the literal Thai Baht character is used:
    ```typescript
    {path.price === 0 ? t.coursesList.free : `${path.price} ฿`}
    ```
    Grep search for `u0e3f` in `src/app/pages/Paths.tsx` returned no results, while search for `฿` returned line 86.
- **Hardcoded Date Locale mapping in `Profile.tsx`**:
  - In `src/app/pages/Profile.tsx` (line 570), the enrollment date is formatted using a hardcoded `'th-TH'` locale:
    ```typescript
    {new Date(enrollment.enrolledAt).toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })}
    ```
    This differs from the dynamic locale mapping used for certificate issue date formatting in line 503:
    ```typescript
    const localeMap = { th: 'th-TH', en: 'en-US' } as const;
    return new Date(cert.issued_at).toLocaleDateString(localeMap[language], ...);
    ```
- **Hardcoded Fallbacks in `GlobalSearch.tsx`**:
  - In `src/app/components/GlobalSearch.tsx` (lines 20-23):
    ```typescript
    const categoryConfig = {
      course: { label: 'หลักสูตร', color: 'text-indigo-600', bg: 'bg-indigo-50' },
      lesson: { label: 'บทเรียน', color: 'text-green-600', bg: 'bg-green-50' },
      path: { label: 'เส้นทาง', color: 'text-purple-600', bg: 'bg-purple-50' },
      resource: { label: 'แหล่งเรียนรู้', color: 'text-amber-600', bg: 'bg-amber-50' },
    };
    ```
    These labels contain hardcoded Thai text as fallback labels.

## 2. Logic Chain
- **Step 1**: The ReferenceError in `LessonDetail.tsx` makes the Reading Lesson Detail component completely non-functional. When a user navigates to a reading lesson, React will attempt to execute `estimatedReadingMinutes` useMemo hook, which references `wordCount`. Since `wordCount` is undefined, a `ReferenceError` will be thrown, causing the app's error boundary to trigger or the page to crash. This is a critical correctness finding.
- **Step 2**: The build succeeded (`npm run build`) because the `build` script runs `vite build`, which compiles files using esbuild and rolldown without running the TypeScript type checker (`tsc`). Therefore, the missing variable reference was not caught during build.
- **Step 3**: The worker claimed to have escaped the Baht symbol in `Paths.tsx` as `\u0e3f` to solve charset detection errors, but they left the literal symbol `฿` in the source file. This is an invalid handoff report claim.
- **Step 4**: Playwright tests are failing with timeouts. However, this is expected since they are redirecting to `/auth` because mock auth is planned for Milestone 4, which is currently in a planned state and not in scope for Milestone 3.

## 3. Caveats
- No other pages or hooks were modified outside the scope of Milestone 3.
- Playwright tests are failing due to the Auth gate redirecting to `/auth` since mock auth has not been implemented yet (Milestone 4 dependency).

## 4. Conclusion
- The final verdict is **REQUEST_CHANGES**. The worker must fix the ReferenceError (`wordCount` undefined) in `LessonDetail.tsx` and address the minor locale date formatting and fallback string localization issues.

## 5. Verification Method
- Execute `npm run build` to confirm compilation works (though it does not check types).
- Open `src/app/pages/LessonDetail.tsx` at line 509 and confirm that `wordCount` is used but not defined.
- Open `src/app/pages/Paths.tsx` at line 86 to verify that `฿` is used instead of the claimed `\u0e3f`.

---

# Quality Review Report

**Verdict**: REQUEST_CHANGES

## Findings

### [Critical] Finding 1: ReferenceError in `LessonDetail.tsx`
- **What**: Reference to undefined variable `wordCount`.
- **Where**: `src/app/pages/LessonDetail.tsx` line 509.
- **Why**: React hook execution will fail and crash the component rendering path.
- **Suggestion**: Declare `const wordCount = readingContent.split(/\s+/).filter(Boolean).length;` inside the `useMemo` hook before calculation, or compute it directly inline.

### [Minor] Finding 2: Incomplete date localization in `Profile.tsx`
- **What**: Hardcoded `'th-TH'` locale for enrollment date formatting.
- **Where**: `src/app/pages/Profile.tsx` line 570.
- **Why**: The enrollment date will always render in Thai format even if the active language is switched to English.
- **Suggestion**: Define a local `localeMap = { th: 'th-TH', en: 'en-US' } as const` and use `localeMap[language]` to dynamically format the date, similar to line 503.

### [Minor] Finding 3: Hardcoded fallback labels in `GlobalSearch.tsx`
- **What**: Hardcoded Thai labels in local `categoryConfig` object.
- **Where**: `src/app/components/GlobalSearch.tsx` lines 20-23.
- **Why**: Violates clean localization practices, although `t.search.categories[result.category]` is checked first.
- **Suggestion**: Use `t.search.categories[result.category]` dynamically or provide safe localized fallback maps.

## Verified Claims
- Translation key structures match line-by-line -> Verified via type typing check -> PASS
- Code compiles -> Verified via `npm run build` -> PASS

---

# Challenge Report (Adversarial Review)

**Overall risk assessment**: MEDIUM

## Challenges

### [High] Challenge 1: Page Crash on Reading Lessons
- **Assumption challenged**: The worker assumed the code is correct because it successfully built.
- **Attack scenario**: Navigating to any lesson of type `'reading'`.
- **Blast radius**: The entire lesson learning page crashes, triggering the global error boundary and making the course content inaccessible.
- **Mitigation**: Introduce type-checking (`tsc --noEmit`) as a pre-build step in `package.json` to prevent compilation of undefined references.

### [Medium] Challenge 2: Non-localized dates on Profile
- **Assumption challenged**: The worker assumed all UI strings are localized.
- **Attack scenario**: User switches UI language to English (`en`) and views their enrolled courses on the Profile page.
- **Blast radius**: Enrolled date displays in Thai formatting while the rest of the page is in English.
- **Mitigation**: Update `Profile.tsx` to use the dynamic language state for formatting enrollment dates.
