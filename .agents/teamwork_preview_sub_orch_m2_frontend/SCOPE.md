# Scope: Milestone 2 - Frontend MVP

## Architecture
- `WiringSimulator.tsx`: Handles device connection logic, maps ports/cables dynamically based on `product.category`.
- `EquipmentDetailTabs.tsx`: Integrates the simulator and displays training videos from `training_lessons`.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 2 | Frontend MVP | Update `WiringSimulator.tsx` and `EquipmentDetailTabs.tsx` | none | DONE |

## Interface Contracts
### `EquipmentDetailTabs.tsx` ↔ `WiringSimulator.tsx`
- `EquipmentDetailTabs` must pass `productCategory: string` (via `product.category`) to `WiringSimulator`.
- `WiringSimulator` must use `productCategory` to dynamically render the correct scenario:
  - Power Supply → CCTV Camera
  - LAN Cable → Access Point
  - NVR → IP Camera
- Show connection status, validation feedback, and completion percentage in `WiringSimulator`.
- `EquipmentDetailTabs` must have no placeholder buttons with no actions.
