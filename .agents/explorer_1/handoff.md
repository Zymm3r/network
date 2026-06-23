# Handoff: Tier 2 Boundary & Corner Cases Test Plan

## 1. Observation
- `TEST_INFRA.md` specifies an "Opaque-box, requirement-driven" test philosophy without dependency on implementation design.
- The testing methodology includes Category-Partition, Boundary Value Analysis (BVA), Pairwise, and Workload Testing.
- `TEST_INFRA.md` lists coverage thresholds: Tier 2 requires "≥5 per feature where boundaries exist".
- `ORIGINAL_REQUEST.md` details the functional requirements:
  - **F1 (Equipment Tabs Navigation)**: Functional button actions, new modular tabs.
  - **F2 (Training Media Modal)**: Training modal/video player for seeded placeholder YouTube videos.
  - **F3 (Simulator UI & Status)**: Clickable simulator, validation feedback, completion percentage.
  - **F4 (Simulator Scenarios)**: Dynamic mapping based on product category (CCTV -> NVR/IP Camera, Network -> LAN/AP).

## 2. Logic Chain
- As the philosophy is opaque-box (e2e testing via Playwright), the test plan should simulate user input and external state anomalies, avoiding internal component state checks.
- For **F1**, boundaries involve rapid state transitions, missing URL parameters, missing product categories, window resizing (responsive boundaries), and redundant clicks.
- For **F2**, boundaries involve handling broken media links, empty data sets (no lessons), rapid toggle workloads, layout bounds (long text), and strict keyboard navigation constraints.
- For **F3**, corner cases focus on invalid operations in the UI (invalid connections, loop attempts), calculation race conditions under rapid workloads, reset reliability mid-progress, and component overlap/layout limits.
- For **F4**, mapping logic boundaries include case sensitivity in category parsing, unknown/unmapped categories, state persistence/leaks between tabs or scenarios, and repeating the completion cycle.

## 3. Caveats
- As this is an opaque-box plan, specific Playwright locators (like `data-testid` attributes) will need to be identified or added by the implementer during test script creation.
- The test cases assume that categories other than "CCTV" and "Network" might exist in the dataset or could be simulated by injecting mock data during the test run.
- It is assumed the Simulator UI allows invalid connections for the purpose of validating error feedback, as per R2 ("validation feedback").

## 4. Conclusion
The following 20 test cases comprise the Tier 2 Test Plan:

### F1: Equipment Tabs Navigation
1. **Rapid Tab Switching**: Rapidly click through all available tabs in succession. Verify the active tab state updates to the final selection without rendering race conditions or displaying content from multiple tabs simultaneously.
2. **Missing Product Category Fallback**: Navigate to a product page where the product has no assigned category. Verify tabs render empty states or fallback gracefully without crashing.
3. **Invalid Tab URL Parameter**: Navigate directly to the equipment page with a malformed tab query parameter (e.g., `?tab=invalidName`). Verify it defaults to the first available tab and displays content correctly.
4. **Responsive Layout Boundary**: Switch tabs while repeatedly resizing the browser window (simulating mobile to desktop transitions). Verify tabs do not become unclickable, hidden, or overlap content.
5. **Redundant Activation**: Rapidly double-click or multi-click the currently active tab. Verify no duplicate network requests are sent (if mockable) and the UI remains stable with no flickering.

### F2: Training Media Modal
1. **Empty Lessons State**: Load the training tab for a product with 0 associated lessons. Verify the UI displays a clear "No lessons available" boundary message instead of an empty modal or error trace.
2. **Malformed Media URL**: Attempt to play a lesson seeded with a malformed or invalid YouTube URL. Verify the modal handles the iframe error gracefully (e.g., showing a broken media placeholder) without crashing the tab.
3. **Rapid Modal Toggle (Workload)**: Rapidly open and close the training media modal 10 times. Verify the modal eventually closes successfully, the video stops playing in the background (no phantom audio), and the page remains responsive.
4. **Text Layout Bounds**: Render a training lesson with a 500+ character title and description. Verify the text truncates properly or wraps without breaking the modal layout boundaries or pushing the close button off-screen.
5. **Keyboard Focus Trap**: Open the media modal and navigate entirely with the keyboard (`Tab`, `Shift+Tab`). Verify focus is trapped within the modal, and pressing `Esc` closes the modal immediately, even if the iframe has focus.

### F3: Simulator UI & Status
1. **Invalid Connection Boundary**: Try to connect two intentionally incompatible devices. Verify the UI clearly shows connection validation feedback (error state) and the completion percentage strictly remains unchanged.
2. **Self-Connection/Loop Attempt**: Attempt to connect a device to itself within the simulator workspace. Verify the UI rejects the action and does not infinite-loop or hang.
3. **Rapid Successive Connections**: Connect devices at an extremely rapid pace (via programmatic Playwright drag-and-drop). Verify the connection status and completion percentage accurately calculate without skipping updates.
4. **Reset Mid-Progress**: Start a connection scenario, reach exactly 50% completion, and immediately trigger the reset action multiple times. Verify the UI zeroes out the completion percentage and clears all connections without residual visual state.
5. **Maximized Device Clutter**: Drag all available devices to the exact same coordinate point. Verify the UI status remains legible, connections can still be made or viewed, and the browser does not crash.

### F4: Simulator Scenarios
1. **Unknown Category Mapping**: Access the simulator for a product with a completely unknown category string (e.g., "KitchenAppliance"). Verify the simulator defaults to a generic fallback scenario or displays a "No simulator available" message.
2. **Case Insensitivity Boundary**: Access the simulator for a product with mixed-case category strings (e.g., `cCtV`, `netWORK`). Verify the dynamic mapping correctly routes to the appropriate NVR/IP Camera or LAN/AP scenarios.
3. **State Abandonment & Return**: Complete 50% of the CCTV scenario, navigate to the Training tab, and return to the Simulator tab. Verify the simulator state is correctly reset or cleanly restored, rather than entering an inconsistent halfway state.
4. **Cross-Category Leakage**: Force-switch the product context from 'CCTV' directly to 'Network' within the same session. Verify the simulator scenario switches to LAN/AP without retaining any NVR or IP Camera device nodes from the previous scenario.
5. **Cyclical Completion**: Complete a scenario to 100%, disconnect all devices to drop completion to 0%, and complete it to 100% again. Verify the 100% completion status and any success feedback trigger correctly the second time.

## 5. Verification Method
1. Create `e2e/tier2-boundary.spec.ts` incorporating these exact 20 test cases.
2. Run `npx playwright test e2e/tier2-boundary.spec.ts`.
3. Verify that all tests pass against the local development environment and accurately catch any unhandled edge conditions.
