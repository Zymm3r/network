You are working on an existing React + TypeScript + Vite networking education platform migrated from a hotel template.

Tech stack:

* React
* TypeScript
* Vite
* Tailwind
* shadcn/ui
* Supabase

Current status:

* App runs successfully on localhost:5173
* Supabase is connected
* Existing schema is the source of truth
* lessons/enrollments tables do NOT exist yet
* Some hooks currently use temporary mock fallbacks
* Main goal is to stabilize and polish the user experience

Rules:

* Do NOT redesign the architecture
* Do NOT break existing routing
* Do NOT remove Supabase integration
* Preserve existing working UI/components where possible
* Prefer incremental fixes over massive rewrites
* Keep TypeScript types compatible with current schema
* Avoid introducing unnecessary dependencies

Priority:

1. Runtime stability
2. Good UX/UI
3. Realistic networking education content
4. Clean responsive design
5. Future scalability

Before making changes:

* analyze current implementation first
* explain root causes briefly
* then apply focused fixes
