# 2026-06-08T14:43:00Z - Exploration of Frontend MVP Updates

## Observation
1. In `src/features/equipment/components/EquipmentDetailTabs.tsx` at line 137, `WiringSimulator` is invoked as `<WiringSimulator productName={data.product?.name || "อุปกรณ์เครือข่าย"} />`. It does not pass `productCategory`.
2. In `src/features/equipment/components/WiringSimulator.tsx` at line 23-34, `ports` and `cables` are hardcoded to a generic scenario. There is no `productCategory` prop accepted or used.
3. In `src/features/equipment/components/WiringSimulator.tsx` at line 59, it calculates `isComplete` but does not calculate or display a completion percentage.
4. In `src/features/equipment/components/EquipmentDetailTabs.tsx`, all buttons have actions attached (e.g. `doc.file_url` alerts if missing, `handleStartTraining` alerts if no videos). There are no dead placeholder buttons, though it would be safer to disable buttons when links are unavailable to strictly comply with "no placeholder buttons with no actions".

## Logic Chain
1. To satisfy the requirement "EquipmentDetailTabs must pass productCategory ... to WiringSimulator", we need to update `WiringSimulatorProps` in `WiringSimulator.tsx` to include `productCategory?: string`. Then in `EquipmentDetailTabs.tsx`, update the invocation to `<WiringSimulator productName={...} productCategory={data.product?.category || ''} />`.
2. To satisfy "Dynamically map the correct scenario based on `productCategory`", `WiringSimulator` must compute its `ports` and `cables` arrays conditionally based on whether `productCategory` string includes "CCTV", "Access Point", or "IP Camera".
3. To satisfy "Include these initial simulation scenarios: Power Supply -> CCTV Camera, LAN Cable -> Access Point, NVR -> IP Camera":
   - **CCTV Camera**: requires connecting a Power Supply (and possibly a video cable).
   - **Access Point**: requires connecting a LAN Cable.
   - **IP Camera**: requires connecting to NVR via LAN Cable.
4. To satisfy "Show connection status, validation feedback, and completion percentage", we must calculate `Math.round((connectedPorts / totalPorts) * 100)` and render it in the UI (e.g. alongside the progress text or connection status). Validation feedback and connection status already partially exist but can be enhanced.

## Caveats
- "NVR -> IP Camera" scenario could be interpreted either as the user wiring an NVR or wiring an IP Camera. Assuming it means wiring the IP Camera to the NVR via LAN.
- The `EquipmentDetailTabs.tsx` currently uses `alert()` for missing document links and missing videos. These are technically actions, but turning them into visually disabled buttons (or removing `href='#'` when missing) is a better practice.

## Conclusion
The implementer needs to:
1. Update `EquipmentDetailTabs.tsx` to pass `productCategory={data.product?.category || ''}` to `<WiringSimulator />`.
2. Update `EquipmentDetailTabs.tsx` to disable document and training buttons if there are no URLs, preventing placeholder/dummy clicks.
3. Update `WiringSimulator.tsx` to accept `productCategory` in `WiringSimulatorProps`.
4. Replace the hardcoded `ports` and `cables` in `WiringSimulator.tsx` with a dynamic function `getScenario(category: string)` that returns the specific arrays for "CCTV Camera", "Access Point", and "IP Camera" scenarios.
5. Add a completion percentage calculation `Math.round((Object.keys(connections).length / ports.length) * 100)` and display it in the UI.

## Verification Method
1. Inspect `src/features/equipment/components/EquipmentDetailTabs.tsx` to confirm `productCategory` is passed to `WiringSimulator`.
2. Inspect `src/features/equipment/components/WiringSimulator.tsx` to confirm `productCategory` drives dynamic `ports`/`cables`.
3. Inspect `WiringSimulator.tsx` to confirm a percentage value is rendered in the UI (e.g. `{completionPercentage}%`).
4. Run the frontend application and verify that clicking on tabs and simulating wiring connections behaves as expected.
