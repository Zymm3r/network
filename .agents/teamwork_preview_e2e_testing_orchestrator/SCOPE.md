# Scope: E2E Test Suite Creation

## Architecture
- Directory `e2e/` for playwright test specs
- Opaque-box UI verification only
- Supabase seeding where required

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Tier 1 Tests | Feature coverage (>=5 per feature) | none | PLANNED |
| 2 | Tier 2 Tests | Boundary/Corner cases (>=5 per feature) | none | PLANNED |
| 3 | Tier 3 Tests | Cross-feature interactions | none | PLANNED |
| 4 | Tier 4 Tests | Real-world application scenarios | none | PLANNED |

## Interface Contracts
### Tests ↔ Application
- Uses standard playwright UI selectors (roles, text, test-ids).
- Does not import application source code directly.
