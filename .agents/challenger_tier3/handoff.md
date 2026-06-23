# Tier 3 E2E Tests Adversarial Challenge Report

## 1. Observation
1. **TypeScript Compilation**: Running `npx tsc --noEmit e2e/tier3.spec.ts` (with `typescript` installed) produces type errors originating from `node_modules/playwright-core/types/types.d.ts` because of missing `@types/node` and an improperly configured `tsconfig.json`. However, `e2e/tier3.spec.ts` itself contains no syntax or type errors. 
2. **Playwright Execution**: Running `npx playwright test e2e/tier3.spec.ts` successfully executes the tests. They fail solely due to timeouts waiting for UI elements (which is expected per instructions).
3. **Mock Overrides (`route.continue()`)**: In `tier3.spec.ts:22` and `:40`, the `mockEquipment` function uses `route.continue()` instead of `route.fallback()` for non-matching URLs.
4. **Broad RegEx Locators**: Test T3.2 asserts `expect(page.getByText(/Connection|Connected|สำเร็จ|Error|Invalid/i)).toBeVisible()`. Test T3.3 asserts `expect(page.getByText(/NVR|Camera|กล้อง/i)).toBeVisible()`.
5. **State Assertion Missing**: Test T3.4 claims to test if tab switching "retains or gracefully resets simulator state", but its final assertion (`expect(page.getByRole('button', { name: /LAN|Coaxial|Power/i }).first()).toBeVisible()`) only checks if a button is visible, not its state.

## 2. Logic Chain
- **Compilation**: The test code itself is syntactically valid TypeScript and compiles correctly as an isolated module, even though the broader project is missing `@types/node` which causes Playwright's own type definitions to error.
- **Routing Bug**: Playwright evaluates `page.route` handlers in reverse order of registration. When T3.3 calls `mockEquipment` a second time, the new handler intercepts all `**/rest/v1/equipment*` requests. Because it uses `route.continue()` when the slug doesn't match, it sends the request directly to the network instead of falling back to the previously registered `cctv-1` mock. This means the tests leak requests to the live Supabase network instead of being fully isolated, and sequential mocks overwrite instead of layering.
- **False Positives (Robustness)**: The regex assertions in T3.2 and T3.3 are too broad and unscoped. If words like "Error" or "Camera" appear anywhere on the page (e.g., in a header navigation menu or a footer link), the tests will falsely pass regardless of whether the Wiring Simulator actually works.
- **Testing Claims**: T3.4 fails to test its own title. Asserting that a button is visible after switching tabs proves the component rendered, but proves absolutely nothing about whether the simulator's *state* (like a selected cable) was retained or reset.

## 3. Caveats
- I ignored Playwright UI timeout failures as explicitly requested by the user.
- I assumed that the user environment's missing `@types/node` and `tsconfig.json` is a separate infrastructure issue and not a bug in the test file itself.

## 4. Conclusion
**Verdict: NOT ROBUST.**
While the tests compile (ignoring project-level missing `@types/node`) and run via Playwright without configuration errors, they contain severe logical and adversarial flaws:
1. **Network Leak / Mock Bug**: `route.continue()` should be `route.fallback()`, otherwise sequential mocks overwrite each other and unhandled requests leak to the real network.
2. **False Positives**: The text assertions are so broad they are highly likely to pass vacuously due to site navigation or footers. They must be scoped to the simulator container (e.g., `page.locator('#simulator-area').getByText(...)`).
3. **Invalid Claims**: T3.4 claims to test state retention/reset, but only tests component visibility.

## 5. Verification Method
- **Mock Routing**: Look at line 22 and 40 in `e2e/tier3.spec.ts`. Verify Playwright docs regarding `route.fallback()` vs `route.continue()`.
- **Broad Locators**: Review lines 78, 88, and 97.
- **State Assertion**: Review line 118 to confirm it only asserts `.toBeVisible()` instead of `.toHaveClass()` or `.toBeChecked()`.
