# Handoff: Tier 1 E2E Test Cases for e2e/tier1.spec.ts

## Observation
- `TEST_INFRA.md` defines 4 features to be covered: 
  - F1: Equipment Tabs Navigation
  - F2: Training Media Modal
  - F3: Simulator UI & Status
  - F4: Simulator Scenarios
- Requirement from `ORIGINAL_REQUEST.md`: 
  - R1: Functional Equipment Tabs with a Training modal/video player and a Simulator tab. No placeholder buttons.
  - R2: Clickable Wiring Simulator MVP connecting devices. Scenarios: Power Supply->CCTV Camera, LAN Cable->AP, NVR->IP Camera. Simulator maps scenario dynamically based on `product.category`. UI shows status, feedback, and completion percentage.
  - R3: Seeded `training_lessons` with YouTube placeholders. Content loads from database.
- Goal: Design at least 5 isolated, opaque-box, happy-path Tier 1 test cases per feature (20 total) without implementing the code.

## Logic Chain
- To achieve opaque-box UI testing, the Playwright tests must rely on standard `page.click()` and `expect()` interactions with visible DOM elements rather than internal component states.
- **F1 (Equipment Tabs Navigation)** tests will assert tab visibility, tab switching logic, content rendering upon tab switch, lack of state bleed between tabs, and functionality of primary action buttons.
- **F2 (Training Media Modal)** tests will focus on opening the modal from the lesson list, verifying title content, confirming the presence of the YouTube iframe, and ensuring proper closure via 'Close' button and backdrop click.
- **F3 (Simulator UI & Status)** tests will examine the baseline state of the simulator (0% progress, un-connected text), interaction states (node selection), and the resulting state changes (percentage increase, success messaging) upon a valid connection. 
- **F4 (Simulator Scenarios)** tests will involve navigating to specific product URLs (or using mock routing context) based on categories (CCTV, Network) and asserting that the correct source/target device nodes populate the simulator, and that category-specific connections trigger the 100% completion state.

## Designed Test Cases

### F1: Equipment Tabs Navigation
1. **TC-F1-1:** Navigate to an Equipment Detail page and verify that "Overview", "Training", and "Simulator" tabs are visible.
2. **TC-F1-2:** Click the "Training" tab and verify the Training content container and lesson list are displayed.
3. **TC-F1-3:** Click the "Simulator" tab and verify the Wiring Simulator UI is displayed.
4. **TC-F1-4:** Click "Training", then "Simulator", and verify Training content is hidden while Simulator content remains visible.
5. **TC-F1-5:** Verify that standard action buttons on the equipment page (e.g. "Add to Cart" or "Save") trigger visible user feedback or state changes, confirming no dead placeholder buttons.

### F2: Training Media Modal
1. **TC-F2-1:** On the Training tab, click a seeded lesson item and verify the Training Media Modal appears on screen.
2. **TC-F2-2:** Within the opened modal, verify that the displayed title matches the selected lesson's title.
3. **TC-F2-3:** Verify that a YouTube video player (`iframe`) is rendered inside the modal content area.
4. **TC-F2-4:** Click the modal's internal "Close" button and verify the modal is removed from the DOM/hidden.
5. **TC-F2-5:** Open the modal, click the backdrop/overlay outside the content, and verify the modal closes.

### F3: Simulator UI & Status
1. **TC-F3-1:** Load the Simulator tab and verify the initial completion percentage is 0% and status shows disconnected.
2. **TC-F3-2:** Click a source device node and verify it reflects a selected/active state (e.g., UI highlight).
3. **TC-F3-3:** Complete a valid node connection and verify the status text updates to indicate a successful link.
4. **TC-F3-4:** Complete a valid node connection and verify the completion progress dynamically increases to 100%.
5. **TC-F3-5:** After completing a connection, click the "Reset" button and verify the UI restores to 0% and disconnected status.

### F4: Simulator Scenarios
1. **TC-F4-1:** Navigate to a 'CCTV' category product, open the Simulator, and verify "NVR" and "IP Camera" nodes are rendered.
2. **TC-F4-2:** Navigate to a 'Network' category product, open the Simulator, and verify "LAN Cable" and "Access Point" nodes are rendered.
3. **TC-F4-3:** Navigate to a product designated for power scenarios, open the Simulator, and verify "Power Supply" and "CCTV Camera" nodes are rendered.
4. **TC-F4-4:** For the CCTV scenario, successfully connect NVR to IP Camera and verify a CCTV-specific success validation message appears.
5. **TC-F4-5:** For the Network scenario, successfully connect LAN Cable to Access Point and verify a Network-specific success validation message appears.

## Caveats
- The exact CSS selectors/data-test-ids are unknown since the frontend implementation is pending. The test design uses logical element descriptions which should be mapped to `data-testid` attributes during the actual Playwright implementation.
- Real URL paths for different product categories (e.g., `/equipment/cctv-123`) assume proper database seeding of `product.category`. If the database is not seeded, Playwright may need to mock network requests or use specific fixture IDs.
- Connecting devices in tests will require dragging or sequential clicking, depending on how `WiringSimulator.tsx` implements interactivity. The tests assume sequential clicking (select source, select target) or programmatically dispatching events for opaque testing.

## Conclusion
A comprehensive architectural design of 20 Tier 1 E2E test cases has been created across the four required features (F1-F4). These test cases are happy-path, isolated, verify only user-visible states, and strictly adhere to the requirements.

## Verification Method
- **Implementation:** The Implementer agent should transcribe these logical tests into `e2e/tier1.spec.ts` using Playwright hooks.
- **Execution:** Once the code is implemented, run `npx playwright test e2e/tier1.spec.ts` to execute these 20 tests against the local dev server.
- **Validation:** Check the Playwright report to ensure 20 tests pass without relying on internal React/Vue state.
