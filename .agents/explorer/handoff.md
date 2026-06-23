# Handoff Report: Tier 3 E2E Tests for Wiring Simulator & Training Media

## Observation
The project requires testing the cross-feature interactions for the Wiring Simulator MVP and Training Media Modal within the Equipment Catalog. Based on `TEST_INFRA.md` and `ORIGINAL_REQUEST.md`, the interactions are:
1. **F1 & F2**: Navigating to the "Training" tab and opening the training media modal.
2. **F1 & F3**: Navigating to the "Wiring Simulator" tab and interacting with the simulator UI.
3. **F4 & F3**: Switching between Simulator scenarios (which dynamically map based on product category like 'CCTV' or 'Network') and ensuring the simulator UI/status functions correctly and resets.
4. **F1 & F3/F4**: Switching tabs during an active simulator session and returning to ensure state is handled correctly.
The current `e2e/tier3.spec.ts` contains outdated tests for a Python code runner and must be completely replaced.

## Logic Chain
- **Navigation & Locators**: Since tests should be opaque-box and requirement-driven, standard Playwright locators should be used. We will navigate to equipment detail pages (e.g., `/equipment/cctv-camera-1` or `/equipment/access-point-1`). 
- **Interaction 1 (F1 & F2)**: Navigate to `/equipment/[slug]`. Click the tab `getByRole('button', { name: /Training/i })`. Click the button to start the lesson `getByRole('button', { name: /Watch Lesson/i })`. Assert the modal and iframe appear `getByRole('heading', { name: /Training Media/i })`.
- **Interaction 2 (F1 & F3)**: Navigate to `/equipment/[slug]`. Click `getByRole('button', { name: /Wiring Simulator/i })`. Select a cable `getByRole('button', { name: /Cable/i })` and click a port `getByRole('button', { name: /Port/i })`. Check for connection success or error messages.
- **Interaction 3 (F4 & F3)**: Navigate to a CCTV product, interact with the simulator (expecting NVR/IP Camera scenario ports). Then navigate to a Network product (e.g., via the catalog or direct URL), interact with the simulator, and assert that the ports and cables have changed to the LAN/AP scenario and previous state is cleared.
- **Interaction 4 (F1 & F3/F4)**: Start a simulator session (select a cable, make a connection). Click another tab like `getByRole('button', { name: /Overview/i })`. Return to `getByRole('button', { name: /Wiring Simulator/i })`. Ensure the simulator either retained its state or gracefully reset, depending on the implementation design (Playwright can verify the presence of the Reset button or the connected cables).

## Caveats
- The UI might not have English labels, so we should allow regex locators to match both English and Thai (e.g., `name: /Training|สื่อการสอน/i`, `name: /Wiring Simulator/i`).
- The specific test URLs (e.g., `/equipment/cctv-1`) will depend on the seeded database data or mocked routes. We can use Playwright's `page.route` to mock API responses from Supabase if we want to ensure the categories are "CCTV" and "Network" without relying on real DB records, or rely on a known test seed.
- If the current `WiringSimulator.tsx` does not yet implement the dynamic scenarios (currently it has static ports), the tests should still be written against the *requirements*. This ensures the tests will catch the missing implementation and pass once the feature is fully built.

## Conclusion
A new `e2e/tier3.spec.ts` should be created to replace the existing one. The test file should contain a `test.describe` block with 4 test cases mapped directly to the cross-feature interactions identified above. The tests will use resilient locators (e.g., `getByRole`, `getByText`) and will mock the product detail API response (`/rest/v1/equipment*` or `rpc` depending on how Supabase is queried) or just navigate to generic URLs assuming the frontend correctly fetches or we provide mock data, ensuring tests don't flake due to missing backend data.

## Verification Method
- Execute `npx playwright test e2e/tier3.spec.ts` after the worker writes the file.
- The tests may fail initially if the frontend implementation (like dynamic scenarios) is incomplete, which is expected for test-driven development.
- Inspect `e2e/tier3.spec.ts` to ensure it only tests UI behavior (opaque-box) without depending on internal React state.
