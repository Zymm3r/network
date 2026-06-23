# Handoff Report: Tier 4 E2E Test Plan

## 1. Observation
- `TEST_INFRA.md` requires an opaque-box, requirement-driven test philosophy using Playwright, verifying UI state without depending on frontend state architecture (no specific CSS class assumptions).
- Tier 4 tests (`e2e/tier4.spec.ts`) must cover exactly three "Real-World Application Scenarios":
  1. **Scenario 1**: Navigate to CCTV product, use NVR->IP Camera simulator, then view training (Features F1, F2, F3, F4).
  2. **Scenario 2**: Navigate to Network product, test LAN->AP simulator, verify completion % (Features F1, F3, F4).
  3. **Scenario 3**: Rapid tab switching, verifying modal states and simulator resets (Features F1, F2, F3).
- `SCOPE.md` confirms the target file is `e2e/tier4.spec.ts`.

## 2. Logic Chain
Since the underlying application code might not be fully built and we must adhere to opaque-box testing, the test plan relies entirely on user-visible text and standard ARIA roles (`getByRole`, `getByText`, `getByLabel`).

**Scenario 1 Implementation Plan:**
- **Goal**: Navigate to CCTV, connect NVR to IP Camera, view training.
- **Playwright Steps**:
  1. `page.goto('/')`
  2. Click the CCTV tab: `page.getByRole('tab', { name: /CCTV/i }).click()`
  3. Interact with the simulator:
     - Assuming click-to-connect or drag-to-connect. Use accessible text:
     - `page.getByText('NVR', { exact: true }).click()` (or drag)
     - `page.getByText('IP Camera', { exact: true }).click()` (or drag destination)
  4. Verify simulator status: `expect(page.getByText(/Connected|Success|Active/i)).toBeVisible()`
  5. Open Training: `page.getByRole('button', { name: /Training/i }).click()`
  6. Verify Modal: `expect(page.getByRole('dialog')).toBeVisible()`
  7. Close Modal: `page.getByRole('button', { name: /Close/i }).click()`

**Scenario 2 Implementation Plan:**
- **Goal**: Navigate to Network, connect LAN to AP, verify completion %.
- **Playwright Steps**:
  1. `page.goto('/')`
  2. Click the Network tab: `page.getByRole('tab', { name: /Network/i }).click()`
  3. Interact with simulator:
     - `page.getByText('LAN', { exact: true }).click()`
     - `page.getByText('AP', { exact: true }).click()`
  4. Verify completion percentage: `expect(page.getByText(/Completion.*%/i)).toBeVisible()`

**Scenario 3 Implementation Plan:**
- **Goal**: Rapidly switch tabs, verify modal state handling and simulator resets.
- **Playwright Steps**:
  1. `page.goto('/')`
  2. Click CCTV tab: `page.getByRole('tab', { name: /CCTV/i }).click()`
  3. Open Training Modal: `page.getByRole('button', { name: /Training/i }).click()`
  4. Verify Modal is open: `expect(page.getByRole('dialog')).toBeVisible()`
  5. Switch tab while modal is hypothetically open or close it first (adapt to UI behavior, but assert state): `page.getByRole('tab', { name: /Network/i }).click()`
  6. Verify the modal is no longer obstructing/visible (or was closed): `expect(page.getByRole('dialog')).not.toBeVisible()`
  7. Verify Simulator Reset in the new tab: Check that default "Ready" or "Disconnected" state exists, e.g., `expect(page.getByText(/Disconnected|Select components to connect/i)).toBeVisible()`

## 3. Caveats
- The exact interaction model of the simulator (drag-and-drop vs. click-to-connect) is unknown. The implementer should adjust the `click()` commands to `dragTo()` if the UI requires drag interactions, but must still use semantic locators.
- The exact text for connections ("Connected", "Success") and completion ("Completion: 100%") is estimated. The worker will need to verify the exact string values once the UI is running, or use broad Regex matches.
- Scenario 3 assumes that switching tabs either automatically closes the modal or that the tabs remain clickable while the modal is open. The test implementation should adapt to the standard application behavior but must ensure the modal states and simulator states isolate correctly between tabs.

## 4. Conclusion
The implementation of `e2e/tier4.spec.ts` is fully planned out. The Worker should create the spec file with a main `test.describe('Tier 4: Real-World Scenarios')` block containing three `test()` cases, utilizing strictly accessible locators (`getByRole`, `getByText`) to maintain the requirement-driven, opaque-box philosophy.

## 5. Verification Method
- **Implementation check**: Review `e2e/tier4.spec.ts` to ensure no CSS class selectors (e.g., `.simulator-btn`) or raw IDs (`#nvr-node`) are used.
- **Execution**: Run `npx playwright test e2e/tier4.spec.ts` and verify that all 3 scenarios pass against the running local UI.
