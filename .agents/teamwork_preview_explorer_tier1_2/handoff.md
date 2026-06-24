# Tier 1 E2E Test Cases Handoff

## 1. Observation
- `TEST_INFRA.md` requires >=5 isolated, opaque-box Tier 1 test cases per feature (F1, F2, F3, F4) to be added to `e2e/tier1.spec.ts`.
- `ORIGINAL_REQUEST.md` (R1) specifies updating `EquipmentDetailTabs.tsx` with functional button actions, a Training modal/video player, and a Simulator tab.
- `ORIGINAL_REQUEST.md` (R2) describes an MVP `WiringSimulator.tsx` displaying connection status, validation feedback, and completion percentage.
- `ORIGINAL_REQUEST.md` (R2) mandates the simulator scenario dynamically maps to `product.category` (e.g., 'CCTV' -> NVR/IP Camera, 'Network' -> LAN/AP, plus Power Supply/CCTV Camera).
- `ORIGINAL_REQUEST.md` (R3) introduces `training_lessons` database seeding.

## 2. Logic Chain

Based on the requirements, I have designed the following 20 Playwright test cases categorized by feature. The assertions are based on logical DOM state changes (text visibility, dialog presence) since the exact frontend implementation is opaque.

### F1: Equipment Tabs Navigation
*Goal: Verify navigation between the product detail tabs.*
- **Test F1.1:** Navigate to an equipment page and verify the default tab (Overview) and other tab headers (Training, Simulator) are visible.
- **Test F1.2:** Click the "Training" tab and verify the UI content changes to display training materials.
- **Test F1.3:** Click the "Simulator" tab and verify the UI content changes to display the wiring simulator interface.
- **Test F1.4:** Rapidly switch between Overview, Training, and Simulator tabs and verify the active state indicator updates correctly without reloading the page.
- **Test F1.5:** Verify that general action buttons on the equipment page (e.g., "Add to Cart" or "Share") are present and functional (do not error out or do nothing, per R1 "no placeholder buttons").

### F2: Training Media Modal
*Goal: Verify the training media list and modal interactions.*
- **Test F2.1:** On the Training tab, verify a list of seeded training lessons is rendered.
- **Test F2.2:** Click a training lesson and verify a modal dialog becomes visible (`page.getByRole('dialog')`).
- **Test F2.3:** Inside the open modal, verify an embedded video player (e.g., `iframe` for YouTube) is present.
- **Test F2.4:** Click the modal's "Close" button and verify the dialog is dismissed and no longer visible.
- **Test F2.5:** Open a lesson, click the external modal backdrop (outside the dialog), and verify it also dismisses the modal safely.

### F3: Simulator UI & Status
*Goal: Verify the simulator's core UI elements and status reporting.*
- **Test F3.1:** On the Simulator tab, verify the initial Completion Percentage displays `0%`.
- **Test F3.2:** Verify the presence of source and target connection nodes (the devices to be wired).
- **Test F3.3:** Connect two devices and verify the UI updates the Connection Status text (e.g., changing from "Disconnected" to "Connected").
- **Test F3.4:** Connect two devices correctly and verify positive Validation Feedback appears (e.g., "Correct connection").
- **Test F3.5:** Verify that after a successful full connection sequence, the Completion Percentage updates to `100%`.

### F4: Simulator Scenarios
*Goal: Verify dynamic scenario loading based on product category and successful execution of each scenario.*
- **Test F4.1:** Navigate to a product with category `CCTV` and verify the Simulator displays the "NVR" and "IP Camera" elements.
- **Test F4.2:** Navigate to a product with category `Network` and verify the Simulator displays the "LAN Cable" and "Access Point" elements.
- **Test F4.3:** Navigate to a product designated for analog or power testing and verify the Simulator displays "Power Supply" and "CCTV Camera" elements.
- **Test F4.4:** On a `CCTV` product simulator, perform the NVR -> IP Camera connection and assert the scenario specifically completes successfully.
- **Test F4.5:** On a `Network` product simulator, perform the LAN Cable -> Access Point connection and assert the scenario specifically completes successfully.

## 3. Caveats
- **Data Dependency:** The exact IDs/URLs for navigating to `CCTV` vs `Network` vs `Analog` products must be seeded or mocked in the test setup.
- **Interaction Method:** The exact mechanism of "connecting" two nodes in Playwright (e.g., drag-and-drop vs. sequential clicking) will depend on the implementer's UI choice. The implementer of these tests will need to abstract this into a helper (e.g., `await connectNodes(page, 'NVR', 'IP Camera')`).

## 4. Conclusion
The proposed test architecture fulfills the Tier 1 E2E criteria by detailing exactly 20 isolated, requirement-driven tests. They test purely through user-visible DOM actions (clicks, text assertions, dialog visibility) ensuring resilience against internal React state changes while guaranteeing coverage of F1 through F4.

## 5. Verification Method
- **Implementation:** The implementer must write these 20 tests inside `e2e/tier1.spec.ts`.
- **Execution:** Run `npx playwright test e2e/tier1.spec.ts` (or equivalent).
- **Validation:** All 20 tests must pass, confirming complete Tier 1 coverage of the Wiring Simulator and Training media features.
