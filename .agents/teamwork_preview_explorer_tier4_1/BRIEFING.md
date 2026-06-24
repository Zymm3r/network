# BRIEFING — 2026-06-08T14:45:41Z

## Mission
Plan the implementation of Tier 4 E2E Tests (e2e/tier4.spec.ts) covering the 3 Real-World Application Scenarios from TEST_INFRA.md.

## 🔒 My Identity
- Archetype: Explorer
- Roles: Read-only investigation, Test Planning, Synthesize findings
- Working directory: c:\Users\UTHtest\Downloads\app.hotel\.agents\teamwork_preview_explorer_tier4_1
- Original parent: a80b3cb3-f968-4b79-8d68-1e719ec1a9cd
- Milestone: Plan Tier 4 E2E Tests

## 🔒 Key Constraints
- Read-only investigation — do NOT implement
- Do not assume specific UI class names; define Playwright steps, locators based on visible text, and logical assertions.
- Network Mode: CODE_ONLY

## Current Parent
- Conversation ID: a80b3cb3-f968-4b79-8d68-1e719ec1a9cd
- Updated: not yet

## Investigation State
- **Explored paths**: c:\Users\UTHtest\Downloads\app.hotel\TEST_INFRA.md, c:\Users\UTHtest\Downloads\app.hotel\.agents\e2e_test_tier4\SCOPE.md, c:\Users\UTHtest\Downloads\app.hotel\e2e\tier4.spec.ts
- **Key findings**: The existing e2e/tier4.spec.ts file contains legacy code for a different app (Python e-learning) and must be completely replaced. The test plan must cover 3 specific scenarios: CCTV (NVR->IP Camera+Training), Network (LAN->AP+Completion%), and Rapid Tab Switching (Modal/Simulator state isolation).
- **Unexplored areas**: None required for planning.

## Key Decisions Made
- Replace the existing `tier4.spec.ts` entirely.
- Use generic Playwright selectors (`getByRole`, `getByText`) because exact UI class names are unknown.
- Define a 3-scenario structure corresponding to the `TEST_INFRA.md` Real-World Application Scenarios matrix.

## Artifact Index
- handoff.md — Detailed test plan and implementation guide for the implementer agent.
