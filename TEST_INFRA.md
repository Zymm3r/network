# E2E Test Infra: Wiring Simulator & Training Media

## Test Philosophy
- Opaque-box, requirement-driven. No dependency on implementation design.
- Methodology: Category-Partition + BVA + Pairwise + Workload Testing.

## Feature Inventory
| # | Feature | Source (requirement) | Tier 1 | Tier 2 | Tier 3 |
|---|---------|---------------------|:------:|:------:|:------:|
| 1 | F1: Equipment Tabs Navigation | ORIGINAL_REQUEST R1 | 5      | 5      | ✓      |
| 2 | F2: Training Media Modal | ORIGINAL_REQUEST R1, R3 | 5      | 5      | ✓      |
| 3 | F3: Simulator UI & Status | ORIGINAL_REQUEST R2 | 5      | 5      | ✓      |
| 4 | F4: Simulator Scenarios | ORIGINAL_REQUEST R2 | 5      | 5      | ✓      |

## Test Architecture
- Test runner: `playwright` with standard configuration in `playwright.config.ts`.
- Test case format: End-to-end tests driving a chromium browser against the local UI.
- Directory layout: `e2e/` folder contains test spec files.
- Verification: Playwright UI assertions, verifying training content and simulator functionality without depending on frontend state architecture. Database seeded via Supabase CLI if necessary, but UI tests only verify user-visible state.

## Real-World Application Scenarios (Tier 4)
| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | User navigates to CCTV product, uses NVR->IP Camera simulator, then views training. | F1, F2, F3, F4 | High |
| 2 | User navigates to Network product, tests LAN->AP simulator, verifies completion %. | F1, F3, F4 | Medium |
| 3 | User switches rapidly between tabs verifying modal states and simulator resets. | F1, F2, F3 | High |

## Coverage Thresholds
- Tier 1: ≥5 per feature (Total 20 tests min)
- Tier 2: ≥5 per feature where boundaries exist (Total 20 tests min)
- Tier 3: pairwise coverage of major interactions (Total ~6 tests)
- Tier 4: ≥3 realistic application scenarios
