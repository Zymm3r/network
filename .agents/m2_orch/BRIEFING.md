# BRIEFING — 2026-06-06T15:08:00+07:00

## Mission
Sub-orchestrator for M2: Supabase Persistence. Integrate exercise attempts and scoring into Supabase. Save attempt, pass/fail status, score, timestamp, and progress to Supabase without freezing UI.

## 🔒 My Identity
- Archetype: sub-orchestrator
- Roles: orchestrator, user_liaison, human_reporter, successor
- Working directory: C:\Users\UTHtest\Downloads\app.hotel\.agents\m2_orch
- Original parent: main agent
- Original parent conversation ID: bad9875b-ba72-4f1f-8fa1-d77beb4b47c6

## 🔒 My Workflow
- **Pattern**: Iteration loop (Explorer -> Worker -> Reviewer -> Gate)
- **Scope document**: C:\Users\UTHtest\Downloads\app.hotel\.agents\m2_orch\SCOPE.md
1. **Decompose**: Fit within single iteration loop as per request.
2. **Dispatch & Execute**:
   - **Direct (iteration loop)**: Explorer -> Worker -> Reviewer -> Challenger -> Auditor -> gate
3. **On failure** (in this order):
   - Retry: nudge stuck agent or re-send task
   - Replace: spawn fresh agent with partial progress
   - Skip: proceed without (only if non-critical)
   - Redistribute: split stuck agent's remaining work
   - Redesign: re-partition decomposition
   - Escalate: report to parent (sub-orchestrators only, last resort)
4. **Succession**: at 16 spawns, write handoff.md, spawn successor
- **Work items**:
  1. Iteration Loop for M2 [pending]
- **Current phase**: 2
- **Current focus**: Running Explorer

## 🔒 Key Constraints
- NEVER write, modify, or create source code files directly.
- NEVER run build/test commands yourself.
- MUST explicitly instruct subagents to load the Supabase skill located at c:\Users\UTHtest\Downloads\app.hotel\.agents\skills\supabase\SKILL.md
- Use Explorer -> Worker -> Reviewer -> Gate loop.
- Never reuse a subagent after it has delivered its handoff — always spawn fresh.

## Current Parent
- Conversation ID: bad9875b-ba72-4f1f-8fa1-d77beb4b47c6
- Updated: 2026-06-06T15:08:00+07:00

## Key Decisions Made
- Setting up the iteration loop for M2.

## Team Roster
| Agent | Type | Work Item | Status | Conv ID |
|-------|------|-----------|--------|---------|
| Explorer 1 | teamwork_preview_explorer | Investigate Supabase integration | in-progress | 1a41052e-c306-4513-9e71-bc7d635ed38f |
| Explorer 2 | teamwork_preview_explorer | Investigate Supabase integration | in-progress | e3e4da11-a148-49bd-b58c-73c1fed757e7 |
| Explorer 3 | teamwork_preview_explorer | Investigate Supabase integration | in-progress | d73523e5-e714-48d1-a8dd-036a8233f47e |

## Succession Status
- Succession required: no
- Spawn count: 3 / 16
- Pending subagents: none
- Predecessor: none
- Successor: not yet spawned

## Active Timers
- Heartbeat cron: not started
- Safety timer: none
- On succession: kill all timers before spawning successor
- On context truncation: run `manage_task(Action="list")` — re-create if missing

## Artifact Index
- C:\Users\UTHtest\Downloads\app.hotel\.agents\m2_orch\SCOPE.md — scope description
- C:\Users\UTHtest\Downloads\app.hotel\.agents\m2_orch\progress.md — progress tracking
