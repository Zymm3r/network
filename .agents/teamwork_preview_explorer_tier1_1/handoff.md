# Handoff Report: Tier 1 Feature Coverage Test Design

## 1. Observation
- **Scope File**: `c:\Users\UTHtest\Downloads\app.hotel\.agents\e2e_test_tier1\SCOPE.md` defines the scope as designing Tier 1 Tests for F1, F2, F3, F4 (>= 5 tests per feature) in `e2e/tier1.spec.ts` using Playwright E2E UI verification.
- **Test Infra File**: `c:\Users\UTHtest\Downloads\app.hotel\TEST_INFRA.md` categorizes the features:
  - F1: Equipment Tabs Navigation (from R1)
  - F2: Training Media Modal (from R1, R3)
  - F3: Simulator UI & Status (from R2)
  - F4: Simulator Scenarios (from R2)
  - Requirement: Opaque-box, requirement-driven, verify user-visible state without depending on frontend state architecture.
- **Original Request**: `c:\Users\UTHtest\Downloads\app.hotel\ORIGINAL_REQUEST.md` details the functional requirements:
  - R1: Functional button actions, Training modal/video player, modular Simulator tab.
  - R2: Wiring Simulator MVP (Power Supply->CCTV Camera, LAN->AP, NVR->IP Camera), showing connection status, validation feedback, completion %, dynamic mapping based on product category (CCTV vs Network).
  - R3: Training lessons with placeholder YouTube videos.

## 2. Logic Chain
- **F1 (Equipment Tabs Navigation)**: The user needs to navigate between different aspects of a product (Overview/Details, Training, Simulator). Test cases should cover default states, tab switching, content visibility upon switching, and the absence of broken/unclickable buttons.
- **F2 (Training Media Modal)**: The user needs to click a training lesson and view a video in a modal. Test cases must cover the modal opening, presence of video content, lesson metadata, and different methods of closing the modal (button, backdrop).
- **F3 (Simulator UI & Status)**: The user interacts with the simulator to receive visual feedback. Test cases must verify the initial pristine state, status updates upon connection, positive feedback for correct actions, negative feedback for incorrect actions, and progress/completion percentage updates.
- **F4 (Simulator Scenarios)**: The simulator logic depends on the product category. Test cases must explicitly verify that 'CCTV' products load CCTV scenarios (Power Supply->Camera, NVR->IP Camera) and 'Network' products load Network scenarios (LAN->AP), and that executing these specific connections leads to scenario completion.

## 3. Caveats
- **UI Selectors**: Since the UI is not fully implemented yet, test case designs rely on semantic Playwright locator strategies (e.g., `getByRole('tab')`, `getByText()`, `getByTestId()`). These will need to be aligned with the actual implementation.
- **Test Data**: Tests for F4 require navigating to specific product types ('CCTV' vs 'Network'). It is assumed that the test environment will have seeded data to support finding these distinct products. Tests should ideally use setup steps to locate or create these products before execution.
- **Video Playback**: Opaque-box testing of third-party iframes (like YouTube) can be flaky. The tests will assert the presence of the iframe and correct source URL rather than actual video playback.

## 4. Conclusion (Test Design Plan)
Here is the implementation plan for the 20 Tier 1 test cases to be placed in `e2e/tier1.spec.ts`.

### F1: Equipment Tabs Navigation (5 Tests)
1. **Verify default tab selection**: Navigate to an equipment page; assert that the default tab (e.g., "Overview") is active and its content is visible.
2. **Switch to Training tab**: Click the "Training" tab; assert the tab becomes visually active and the list of training lessons is displayed.
3. **Switch to Simulator tab**: Click the "Simulator" tab; assert the tab becomes visually active and the simulator canvas/interface is displayed.
4. **Switch back and forth between tabs**: Click "Training", then "Simulator", then back to "Overview"; assert the content correctly replaces the previous tab's content without visual overlap or errors.
5. **Verify no unclickable action buttons**: Scan the equipment page for buttons; verify that action buttons (like those inside the tab list) do not have empty `href`s or missing click handlers (e.g., by clicking them and ensuring no console errors or dead states occur).

### F2: Training Media Modal (5 Tests)
1. **Open Training Media Modal**: Navigate to the Training tab and click on a lesson card; assert that a modal dialog becomes visible.
2. **Verify Modal Video Player**: With the modal open; assert that an `iframe` (or video player element) is present and has a valid `src` attribute (e.g., pointing to YouTube).
3. **Verify Modal Metadata**: With the modal open; assert that the modal contains the correct lesson title and description corresponding to the clicked card.
4. **Close Modal via Close Button**: With the modal open; click the "Close" button (or 'X' icon); assert the modal is completely removed from the DOM or hidden.
5. **Close Modal via Backdrop Click**: With the modal open; click on the darker backdrop outside the modal content area; assert the modal is closed.

### F3: Simulator UI & Status (5 Tests)
1. **Initial Simulator State**: Navigate to the Simulator tab; assert the completion percentage is "0%" and the status text indicates an initial state (e.g., "Ready" or "Not Connected").
2. **Valid Connection Feedback**: Perform a valid drag-and-drop or click-to-connect action between two compatible simulator nodes; assert that a success message/indicator appears.
3. **Invalid Connection Feedback**: Attempt to connect two incompatible nodes (if applicable in the UI); assert that an error message or invalid feedback indicator appears.
4. **Completion Percentage Increment**: Make a single valid connection in a multi-connection scenario; assert the completion percentage updates from 0% to a partial value (e.g., 50%).
5. **Scenario Completion State**: Complete all required connections; assert the completion percentage is "100%" and a final "Scenario Complete" (or similar) status message is displayed.

### F4: Simulator Scenarios (5 Tests)
1. **Dynamic Mapping - CCTV UI**: Navigate to a 'CCTV' category product and open the Simulator; assert that nodes for "Power Supply", "CCTV Camera", "NVR", and "IP Camera" are present.
2. **Execute CCTV Scenario 1**: In the CCTV simulator, connect the "Power Supply" node to the "CCTV Camera" node; assert this specific connection registers as successful.
3. **Execute CCTV Scenario 2**: In the CCTV simulator, connect the "NVR" node to the "IP Camera" node; assert this specific connection registers as successful.
4. **Dynamic Mapping - Network UI**: Navigate to a 'Network' category product and open the Simulator; assert that nodes for "LAN Cable" and "Access Point" are present, and CCTV nodes are absent.
5. **Execute Network Scenario**: In the Network simulator, connect the "LAN Cable" node to the "Access Point" node; assert this specific connection registers as successful and completes the scenario.

## 5. Verification Method
- **Review**: The implementer of `e2e/tier1.spec.ts` should map each of these 20 logical test cases to a `test()` block in Playwright.
- **Execution**: Run `npx playwright test e2e/tier1.spec.ts`. All 20 tests should pass once the UI features are implemented according to `ORIGINAL_REQUEST.md`.
- **Validation**: Ensure that tests remain opaque-box by strictly using user-visible locators (roles, text, testing ids) rather than relying on React component state or internal class names.
