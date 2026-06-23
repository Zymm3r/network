# Handoff Report: Tier 4 E2E Test Plan

## 1. Observation
- `TEST_INFRA.md` defines the application as a "Wiring Simulator & Training Media" platform with 4 core features:
  - F1: Equipment Tabs Navigation
  - F2: Training Media Modal
  - F3: Simulator UI & Status
  - F4: Simulator Scenarios
- `TEST_INFRA.md` specifies 3 Real-World Application Scenarios for Tier 4:
  1. User navigates to CCTV product, uses NVR->IP Camera simulator, then views training.
  2. User navigates to Network product, tests LAN->AP simulator, verifies completion %.
  3. User switches rapidly between tabs verifying modal states and simulator resets.
- Review of the existing `e2e/tier4.spec.ts` file reveals it contains legacy code for a different project entirely (a Python e-learning app, testing code compilation and infinite loops).
- `SCOPE.md` directs that we plan the implementation of `e2e/tier4.spec.ts` for these new scenarios using Playwright UI verification, and explicitly states not to rely on specific UI class names.

## 2. Logic Chain
1. **File Overwrite**: The existing `e2e/tier4.spec.ts` must be completely replaced because its current contents are irrelevant to the Wiring Simulator application.
2. **Test Scenarios Structure**: The new test file will contain one `test.describe('Tier 4 - Real-World Application Scenarios')` block with 3 distinct `test` blocks corresponding to the scenarios in `TEST_INFRA.md`.
3. **Selector Strategy**: Because the UI classes are unknown, the tests must use Playwright's semantic locators (e.g., `page.getByRole('tab', { name: 'CCTV' })`, `page.getByText('NVR')`, `page.getByRole('button', { name: /View Training/i })`).
4. **Simulator Interaction Mocking**: Since we don't know if the simulator uses drag-and-drop or point-and-click connections, the plan will outline generic steps (e.g., clicking the source equipment and then the target equipment, or clicking a "Connect" button).

## 3. Caveats
- Exact text strings in the final UI might differ slightly (e.g., "CCTV" vs. "Video Surveillance"). The implementer will need to adapt the strings to the actual frontend.
- The simulator mechanics (drag-and-drop vs. click-to-connect) are unconfirmed. The plan uses logical interactions that the worker can refine based on the implemented UI.
- Assumes the base URL routes directly to the main simulator/dashboard view.

## 4. Conclusion
The implementer should completely overwrite `e2e/tier4.spec.ts` with the new test plan. Here is the structural plan for the implementer:

### Implementation Plan for `e2e/tier4.spec.ts`

**Imports and Setup:**
```typescript
import { test, expect } from '@playwright/test';

test.describe('Tier 4: Real-World Application Scenarios', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the root application
    await page.goto('/');
  });
  
  // Scenarios go here...
});
```

**Scenario 1: CCTV product, NVR->IP Camera simulator, then training**
- **Purpose**: Verifies F1, F2, F3, F4.
- **Steps**:
  1. Click the 'CCTV' tab: `await page.getByRole('tab', { name: /CCTV/i }).click();`
  2. Verify the Simulator area displays 'NVR' and 'IP Camera': `await expect(page.getByText(/NVR/i)).toBeVisible();`
  3. Simulate connecting NVR to IP Camera (e.g., clicking both or clicking a connect button).
  4. Verify the connection success status (e.g., text showing 'Connected' or completion percentage).
  5. Open the training modal: `await page.getByRole('button', { name: /Training|View Media/i }).click();`
  6. Verify the modal is visible and contains a video or document frame: `await expect(page.locator('dialog').or(page.locator('.modal'))).toBeVisible();`

**Scenario 2: Network product, LAN->AP simulator, verifies completion %**
- **Purpose**: Verifies F1, F3, F4.
- **Steps**:
  1. Click the 'Network' tab: `await page.getByRole('tab', { name: /Network/i }).click();`
  2. Verify the Simulator area displays 'LAN' and 'AP': `await expect(page.getByText(/LAN/i)).toBeVisible();`
  3. Simulate connecting LAN to AP.
  4. Wait for and assert the completion indicator updates: `await expect(page.getByText(/Completion: \d+%/i)).toBeVisible();`
  5. Assert the value reaches 100% or expected success criteria.

**Scenario 3: Rapid tab switching, modal states, simulator resets**
- **Purpose**: Verifies F1, F2, F3.
- **Steps**:
  1. Click the 'CCTV' tab.
  2. Open the Training Modal and verify it is open.
  3. Quickly click the 'Network' tab: `await page.getByRole('tab', { name: /Network/i }).click();`
  4. Verify the Training Modal automatically closes or state resets: `await expect(page.locator('dialog')).toBeHidden();`
  5. Verify the simulator state on the 'Network' tab is clean/reset (e.g., "0% completion" or "Not Connected").
  6. Quickly click the 'CCTV' tab again and verify its simulator is also in the default state, preventing state bleed across tabs.

## 5. Verification Method
- The implementer will write the code to `e2e/tier4.spec.ts`.
- Run `npx playwright test e2e/tier4.spec.ts` in the terminal.
- Even if the tests fail initially due to incomplete application code, the test runner must parse the file successfully, verifying the tests are well-structured and properly syntaxed.
