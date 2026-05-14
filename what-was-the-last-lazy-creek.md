# Hotel App → Networking Education Platform Migration Plan

## Context
Migration of existing React hotel management app to a Thai/English bilingual networking education platform.

---

## 1. Project Structure Summary

```
src/
├── main.tsx                    # Entry point
├── app/
│   ├── App.tsx                 # Root component
│   ├── routes.tsx              # React Router config
│   ├── components/
│   │   ├── ui/                # 40+ shadcn/ui components (Radix primitives)
│   │   ├── cards/             # PackageCard, ActivityCard, ScheduleCard, NearbyCard
│   │   ├── layout/            # AppLayout, Sidebar
│   │   └── *.tsx              # StatusBadge, FilterBar, DetailPanel, GlobalSearch
│   ├── pages/                 # Dashboard, Packages, Schedules, Activities, NearbyPlaces
│   └── data/mockData.ts       # Static mock data (no API)
└── styles/
```

---

## 2. Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Build | Vite 6.3.5 |
| Routing | React Router 7.13.0 |
| UI | shadcn/ui (40+ Radix components) |
| Styling | Tailwind CSS 4.1.12 + tw-animate-css |
| Icons | Lucide React |
| Forms | React Hook Form |
| Charts | Recharts |
| State | React hooks (useState, useMemo) - **no global state management** |

---

## 3. Routing System

- **Router**: React Router v7 (createBrowserRouter)
- **Layout**: AppLayout wraps all routes
- **Routes**:
  - `/` → Dashboard
  - `/packages` → Hotel packages list
  - `/schedules` → Transport schedules
  - `/activities` → Activities catalog
  - `/nearby` → Nearby places (cafes, restaurants, etc.)

---

## 4. Reusable UI Components (Keep)

**Layout:**
- `AppLayout.tsx` - Main layout wrapper
- `Sidebar.tsx` - Navigation sidebar

**Cards:**
- `PackageCard.tsx` - Hotel package display
- `ActivityCard.tsx` - Activity display
- `ScheduleCard.tsx` - Transport schedule display
- `NearbyCard.tsx` - Nearby place display

**Shared:**
- `StatusBadge.tsx` - Availability status badges
- `CustomerTypeBadge.tsx` - Customer type pills
- `RatingStars.tsx` - Star ratings
- `QuickCopyButton.tsx` - Copy-to-clipboard
- `DetailPanel.tsx` - Detail view panel
- `FilterBar.tsx` - Filter controls
- `GlobalSearch.tsx` - Global search overlay

**shadcn/ui primitives (40+) - All usable:**
- Dialog, Drawer, Sheet, Popover, Dropdown
- Select, Combobox (cmdk)
- Table, Card, Avatar
- Button, Input, Textarea, Checkbox, Switch, Radio
- Tabs, Accordion, Collapsible
- Tooltip, Toast (sonner), Alert
- Form (react-hook-form)
- Calendar (react-day-picker)
- Carousel (embla-carousel-react)
- Resizable panels

---

## 5. Components Needing Replacement

| Component | Reason |
|----------|--------|
| `mockData.ts` | Replace with Supabase data fetching |
| Dashboard stats | Repurpose for learning metrics |
| Sidebar nav | Replace with course/lesson navigation |
| PackageCard | → CourseCard |
| ActivityCard | → LessonCard or QuizCard |
| ScheduleCard | → ScheduleCard (reuse for class schedule) |
| NearbyCard | → ResourceCard (nearby libraries, cafes) |
| FilterBar | → CourseFilters (level, topic, language) |

---

## 6. Data Models → New Schema

| Current | → | New |
|---------|---|-----|
| HotelPackage | → | Course |
| Activity | → | Lesson/Module |
| TransportSchedule | → | ClassSchedule |
| NearbyPlace | → | StudyResource (libraries, cafes) |
| StaffUser | → | User (student/instructor) |
| AvailabilityStatus | → | EnrollmentStatus |

---

## 7. Recommended Architecture

```
src/
├── app/
│   ├── routes.tsx              # /courses, /lessons, /schedule, /resources, /profile
│   ├── components/
│   │   ├── ui/                # Keep all shadcn/ui
│   │   ├── course/            # NEW: CourseCard, CourseDetail, CourseFilters
│   │   ├── lesson/            # NEW: LessonCard, VideoPlayer, Quiz
│   │   ├── schedule/          # NEW: ScheduleView, Calendar
│   │   ├── resources/         # NEW: ResourceCard, MapView
│   │   └── layout/            # Keep: Sidebar, AppLayout
│   ├── pages/                 # NEW: Courses, Lessons, Schedule, Resources, Profile
│   ├── hooks/                 # NEW: useCourses, useLessons, useAuth
│   ├── lib/
│   │   ├── supabase.ts       # NEW: Supabase client
│   │   └── utils.ts           # Keep
│   └── i18n/                  # NEW: Thai/English translations
```

---

## 8. Supabase Integration

- **Auth**: User login/signup
- **Database**: Courses, Lessons, Progress, Users, Resources tables
- **Realtime**: Not needed initially
- **Storage**: Course images, thumbnails

---

## 9. Migration Steps

### Phase 1: Foundation
1. Add `@supabase/supabase-js` to dependencies
2. Create `lib/supabase.ts` client
3. Add Supabase auth hooks

### Phase 2: Data Layer
1. Create Supabase tables (courses, lessons, enrollments, resources)
2. Replace mockData.ts with Supabase queries
3. Add loading/skeleton states

### Phase 3: UI Migration
1. Create CourseCard from PackageCard template
2. Create LessonCard from ActivityCard template
3. Build CourseFilters from FilterBar
4. Add bilingual support (Thai/English toggle)

### Phase 4: New Features
1. Progress tracking (from Dashboard stats)
2. Video/quiz components
3. Study resource map

### Phase 5: Polish
1. Remove unused hotel-specific components
2. Add course categories and search
3. Optimize performance

---

## 10. Migration Plan (Confirmed)

**Scope**: Full migration - adapt all UI components to education platform
**Language**: Thai primary, English secondary

### Next Steps:
1. Add `@supabase/supabase-js` 
2. Create Supabase client and auth hooks
3. Define schema: courses, lessons, progress, resources, users
4. Migrate pages: Hotel → Education
5. Add Thai/English i18n layer
6. Replace mockData with Supabase queries

---

## Verification
- Run `npm run dev` to test build
- Confirm all 5 pages accessible
- Test Supabase connection (or create mock)