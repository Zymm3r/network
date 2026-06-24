# Tier 4 E2E Test Implementation Plan

## 1. Observation
- `TEST_INFRA.md` dictates the implementation of 3 Real-World Application Scenarios for Tier 4 E2E tests.
- Scenario 1 requires navigating to the CCTV product, interacting with the NVR->IP Camera simulator, and viewing the training media.
- Scenario 2 requires navigating to the Network product, testing the LAN->AP simulator, and verifying the completion percentage.
- Scenario 3 requires switching rapidly between tabs and verifying modal states and simulator resets.
- The existing `e2e/tier4.spec.ts` file contains outdated tests for a different project (Python coding platform) and must be entirely replaced.
- We must avoid assuming non-standard CSS classes, relying instead on Playwright semantic locators (roles, text).

## 2. Logic Chain
- **File setup**: We need to import `test` and `expect` from `@playwright/test` and clear the old content of `e2e/tier4.spec.ts`.
- **Scenario 1 (CCTV + NVR->IP Camera + Training)**: 
  - Go to `/`.
  - Locate the CCTV tab using `page.getByRole('tab', { name: /CCTV/i })` and click it.
  - Locate simulator elements using `page.getByRole('button', { name: /NVR/i })` and `page.getByRole('button', { name: /IP Camera/i })`. Perform an interaction (e.g., clicking them sequentially to simulate connection, or clicking a specific "Connect" button).
  - Verify simulator status updates with `expect(page.getByText(/Connected|Status: OK/i)).toBeVisible()`.
  - Open training media by clicking `page.getByRole('button', { name: /Training|Media/i })`.
  - Verify the modal using `expect(page.getByRole('dialog')).toBeVisible()`.
  - Close the modal with `page.getByRole('button', { name: /Close/i }).click()`.
- **Scenario 2 (Network + LAN->AP + Completion %)**:
  - Go to `/`.
  - Click the Network tab: `page.getByRole('tab', { name: /Network/i }).click()`.
  - Interact with LAN and AP simulator elements.
  - Assert the completion percentage updates: `expect(page.getByText(/100%/)).toBeVisible()` or `expect(page.getByText(/Completion:/)).toBeVisible()`.
- **Scenario 3 (Rapid Switching, Modal States, Resets)**:
  - Go to `/`.
  - Click CCTV tab, interact with simulator (change its state).
  - Open the Training Media modal.
  - Quickly switch to the Network tab (if tabs are accessible with modal open) or hit Escape to close and switch. Assuming tabs are in background, try `page.getByRole('tab', { name: /Network/i }).click({ force: true })`.
  - Assert the modal is hidden or dismissed: `expect(page.getByRole('dialog')).toBeHidden()`.
  - Switch back to the CCTV tab.
  - Assert the CCTV simulator has reset (e.g., `expect(page.getByText(/Disconnected|0%/i)).toBeVisible()`).

## 3. Caveats
- Since the exact UI is not available, the plan assumes simple point-and-click interactions for simulators (e.g., clicking equipment A then equipment B to connect them). If the implementation requires drag-and-drop, the worker will need to adapt the Playwright `dragTo` method.
- The wording of status texts ("Connected", "100%", "Disconnected") are placeholders based on common conventions. The worker should adjust the regex to match the actual UI text once the frontend is built.
- In Scenario 3, if the UI prevents tab clicking while a modal is open, the worker should press Escape or click the close button before switching tabs.

## 4. Conclusion
The worker should completely overwrite `e2e/tier4.spec.ts` with three new Playwright tests named S4.1, S4.2, and S4.3 covering the scenarios outlined above. The tests should be implemented using robust semantic locators (`getByRole`, `getByText`) and wait for appropriate UI states without relying on fragile CSS selectors.

## 5. Verification Method
- **Command**: Run `npx playwright test e2e/tier4.spec.ts` or `npm run test:e2e`.
- **Expected Outcome**: The tests will execute and attempt to find the described UI elements. (If the UI is not yet built, the tests will fail with locator timeouts, which is acceptable at this stage. The structure and Playwright logic should be perfectly valid).
- **Manual Review**: Inspect `e2e/tier4.spec.ts` to ensure old code is gone and the 3 new scenarios are written using standard Playwright best practices.
