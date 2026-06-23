# LanguageSwitcher, State Persistence (R3), and E2E Verification Report

## Summary
The learning platform implements a client-side `LanguageSwitcher` component backed by a React Context-based `I18nProvider`. State persistence is managed through `localStorage`. Although core entity hooks (Courses, Lessons, Paths) fetch both Thai and English columns (`*`) allowing instant dynamic switching of entity names/descriptions upon context updates, there are widespread omissions of hardcoded Thai UI strings and static label mappings across multiple components and pages (including a database query bug in global search). The Playwright E2E test suite currently lacks any language verification and fails on clean environments due to unhandled `/auth` redirection.

---

## 1. LanguageSwitcher Design & State Persistence Flow

### Implementation Details
- **Component Location**: `src/app/components/LanguageSwitcher.tsx`
- **Hook Location**: `src/app/i18n/index.tsx` (exposes `useI18n()` hook and `I18nProvider`).
- **How it works**:
  - `LanguageSwitcher` renders a Radix-based `<DropdownMenu>` containing options for English (🇺🇸) and Thai (🇹🇭).
  - It subscribes to the `useI18n()` context to get the current `language` and the `setLanguage` callback.
  - The `I18nProvider` wraps the React router in `src/app/App.tsx`.
- **State Initialization & LocalStorage**:
  - The provider initializes React state by reading from `localStorage`:
    ```typescript
    const [language, setLanguage] = useState<Language>(() => {
      const stored = localStorage.getItem('language');
      return (stored === 'en' || stored === 'th') ? stored : 'th';
    });
    ```
  - When the language is changed, it writes to `localStorage` and updates the React state:
    ```typescript
    const handleSetLanguage = useCallback((lang: Language) => {
      setLanguage(lang);
      localStorage.setItem('language', lang);
    }, []);
    ```
- **SSR (Server-Side Rendering) Assessment**:
  - In Next.js or other SSR setups, direct access to `localStorage` during initial render causes a `ReferenceError: localStorage is not defined` or hydration mismatch warnings.
  - However, because this application is a **pure Client-Side Rendered (CSR) SPA** powered by Vite (confirmed via `package.json` and `vite.config.ts`), it runs exclusively in the browser. Therefore, direct access to `localStorage` in the state initializer is safe and correct.

---

## 2. Dynamic Translation & Database Query Assessment

### Core Database Queries and Hooks
Core hooks (`useCourses`, `useLessons`, `usePaths`) query Supabase selecting all columns (`*`).
- **Data Query Behavior**: The fetched data contains both language fields (e.g. `name_th`/`name_en`, `description_th`/`description_en`, `title_th`/`title_en`).
- **Re-rendering / Dynamism**: When the language is toggled, the components referencing these hooks (e.g., `Courses`, `Paths`, `Lessons`) re-render because they consume `useI18n()`. They compute the localized title/description on the fly:
  - `const name = language === 'th' ? course.name_th : course.name_en;`
  - Because of this, **no database refetching is necessary**, and they update instantly.

### Key Translation Omissions (Hardcoded Thai UI Strings)
There are multiple components and pages where Thai text is hardcoded in the markup or in static maps, preventing proper translation when switched to English:

1. **`src/app/components/course/CourseCard.tsx`**:
   - Hardcoded lesson count suffix: `{course.min_modules || 1} บท` (should use translation for "lessons" or "modules").
   - Hardcoded duration: `{course.minutes_per_lesson} นาที` (should use translation for "minutes").
   - Hardcoded lesson suffix: `/บท` (should use translation for "/lesson").
   - Hardcoded pricing: `ฟรี` (should use translation for "Free").
2. **`src/app/pages/Courses.tsx`**:
   - Subtitle: `เรียนรู้การสร้างเครือข่ายตั้งแต่พื้นฐานสู่การปฏิบัติ`
   - Filter label: `หลักสูตรทั้งหมด`
   - Empty state text: `ยังไม่มีหลักสูตร` / `กรองหรือล้างตัวกรองเพื่อดูหลักสูตรอื่น`
3. **`src/app/pages/Lessons.tsx`**:
   - Header title & description: `แบบฝึกหัด` / `ฝึกฝนทักษะการสร้างเครือข่าย`
   - Stats labels: `ทั้งหมด`, `เสร็จสิ้น`, `กำลังทำ`
   - Tab triggers: `lessonTypes` array has hardcoded Thai labels (`ทั้งหมด`, `วิดีโอ`, `แบบทดสอบ`, `แบบฝึกหัด`, `เอกสาร`).
   - Empty state: `ไม่พบเนื้อหา`
4. **`src/app/components/lesson/LessonCard.tsx`**:
   - `lessonTypeLabels` static map defines hardcoded Thai names (`วิดีโอ`, `แบบทดสอบ`, `แบบฝึกหัด`, `เอกสาร`).
   - Lesson duration: `{lesson.duration_minutes} นาที`
   - Button text: `isCompleted ? 'ทบทวน' : 'เริ่มทำ'`
5. **`src/app/pages/Paths.tsx`**:
   - `pathTypeLabels` static map defines hardcoded Thai names (`ลำดับ`, `เส้นทาง`, `เลือกเอง`).
   - Header title & description: `เส้นทางการเรียนรู้` / `เลือกเส้นทางที่เหมาะกับคุณ`
   - Path details: `{courseCount} หลักสูตร` / `ฟรี`
   - Button text: `เริ่มเรียน`
   - Progress Summary card: `เส้นทางการเรียนรู้ของคุณ`, `ติดตามความก้าวหน้าในเส้นทางที่คุณเลือก`, `1/3 เส้นทางที่เริ่มต้น`
6. **`src/app/hooks/useGlobalSearch.ts` and `src/app/components/GlobalSearch.tsx`**:
   - **Database Schema Bug**: The hook queries `learning_paths` selecting `name` (`select('id, name').ilike('name', ...)`). However, the table `learning_paths` does not have a `name` column; it only has `name_th` and `name_en`. This causes an SQL error when searching.
   - **Search Language Omission**: `useGlobalSearch` is not subscribed to `useI18n()`. It always returns Thai subtitles (`บทเรียน`, `หลักสูตร`, etc.) and maps titles to `title_th || title_en` regardless of current language.
   - **GlobalSearch UI Omissions**: The search placeholder is hardcoded: `placeholder="ค้นหาหลักสูตร บทเรียน..."`. The dropdown configuration (`categoryConfig`) has hardcoded Thai labels.

---

## 3. E2E Playwright Verification Requirements

### Current E2E Tests Analysis
- The existing spec files (`challenger.spec.ts`, `tier1.spec.ts` to `tier4.spec.ts`) focus on code runner limits, equipment navigation, training media modal, and wiring simulator scenarios.
- None of the existing E2E tests verify the i18n switcher, text translation, or persistence.
- **Redirection Blocker**: All tests navigating to `/` or `/equipment/*` fail/timeout in clean or CI environments because they lack an authenticated Supabase session and get redirected to `/auth` by `AppLayout.tsx`.

### Proposed E2E Verification Plan for i18n
To test language switching and state persistence, a new spec file `e2e/i18n.spec.ts` should be introduced. It must mock the Supabase Auth REST calls to bypass the `/auth` redirect during application tests.

#### Mocking Auth endpoints in Playwright:
```typescript
test.beforeEach(async ({ page }) => {
  // Mock User retrieval
  await page.route('**/auth/v1/user*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        id: 'test-user-id',
        email: 'test@example.com',
        user_metadata: { role: 'student', full_name_th: 'ผู้ใช้ ทดสอบ', full_name_en: 'Test User' },
      }),
    });
  });

  // Mock Session retrieval
  await page.route('**/auth/v1/session*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        access_token: 'mock-access',
        token_type: 'bearer',
        expires_in: 3600,
        user: { id: 'test-user-id', email: 'test@example.com', user_metadata: { role: 'student' } },
      }),
    });
  });
});
```

#### Test Cases to Implement:
1. **Login Page Translation Toggle (Pre-auth)**:
   - Navigate to `/auth`.
   - Verify welcome text defaults to Thai (`ยินดีต้อนรับ`).
   - Click the "English" link button at the bottom.
   - Assert the welcome text immediately changes to `Welcome` without page reload.
   - Reload the page, and verify the text remains `Welcome` (persistence check).
   - Click the "ภาษาไทย" link button, and verify it translates back to Thai.
2. **Authenticated App Translation (Post-auth)**:
   - Navigate to `/courses` (with mocked auth).
   - Verify sidebar navigation links default to Thai (`หลักสูตร`, `แบบฝึกหัด`, etc.).
   - Locate the `LanguageSwitcher` button inside the sidebar (displays `ภาษาไทย` initially).
   - Click the switcher, select `🇺🇸 English` from the Radix dropdown.
   - Verify the sidebar links dynamically update (e.g., `Courses`, `Practice Labs`).
3. **Database Entity Translation**:
   - Mock a database request to `/rest/v1/courses*` returning a course with `name_th: "เครือข่ายพื้นฐาน"` and `name_en: "Networking Basics"`.
   - When language is Thai, verify the course card shows "เครือข่ายพื้นฐาน".
   - Switch language to English via the sidebar switcher.
   - Verify the course card text dynamically changes to "Networking Basics" without database refetching.
4. **LocalStorage Persistence**:
   - Switch language to English.
   - Reload the page.
   - Verify that the app loads directly in English (e.g. sidebar navigation, welcome prompts, and localstorage value `'language'` equals `'en'`).

---

## 4. Build and Test Instructions

### Build Command
To build the application for production deployment, run the following command in the project root:
```bash
npm run build
```
*Result:* This triggers `vite build` (using Rolldown and esbuild) and outputs minified static assets in `dist/`. Build normally completes in ~2.5 seconds.

### Test Command
To execute the existing Playwright end-to-end tests:
```bash
npx playwright test
```
*Note:* As observed, the tests currently fail on fresh runs because they lack authenticated session states. Resolving this requires implementing the Supabase auth endpoints mocks in `test.beforeEach` across the specs.
