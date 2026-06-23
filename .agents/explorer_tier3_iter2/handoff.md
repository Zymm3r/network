# Handoff Report: Tier 3 E2E Tests Analysis (Iteration 2)

## 1. Observation
- **Test Timoeuts**: `e2e/tier3.spec.ts` times out because it mocks `**/rest/v1/equipment*` and navigates to `/equipment/cctv-1`. However, `src/features/equipment/hooks/useProductDetail.ts` fetches data from the `products` table (`**/rest/v1/products*`) and verifies the slug against `src/app/data/products.json`. The dummy slugs (`cctv-1`, `ap-1`) do not exist in `products.json`, causing the hook to instantly throw a "Product not found" error, resulting in the target UI elements never rendering.
- **Mock Overwrites/Network Leak**: `mockEquipment` uses `await route.continue()` when the URL doesn't match the mocked slug. Because Playwright processes handlers in reverse order, a second call to `mockEquipment` (e.g. in T3.3) overrides the first and leaks non-matching requests to the real network instead of falling through to the previous handler.
- **Assertion Scoping**: T3.2 and T3.3 use broad assertions (`getByText(/Connection|Connected|สำเร็จ|Error|Invalid/i)` and `getByText(/NVR|Camera/i)`). `WiringSimulator.tsx` actually renders cables like "LAN Cable", "Power Supply" and success message "การเชื่อมต่อเสร็จสมบูรณ์!".
- **Weak Assertions (T3.4)**: T3.4 claims to test state retention but only checks button visibility. In `WiringSimulator.tsx`, a selected cable renders an explicit "Selected" label (`<span className="text-xs text-indigo-400 font-medium">Selected</span>`). When the component unmounts and remounts (via tab switching), state is completely reset.
- **TS Compilation Errors**: `npx tsc --noEmit` fails because the workspace lacks a `tsconfig.json` at the project root, and necessary types (`@types/node`, `@types/react`, `@types/react-dom`) along with `typescript` are missing from `package.json`.
- **Type Safety**: `mockEquipment` bypasses TS safety by using `route: any` and `page: any`.

## 2. Logic Chain
1. **Fixing Mocks and Data Fetching**:
   - The test must navigate to real slugs found in `src/app/data/products.json`. For a CCTV scenario, it should use `ds-2cd1023g2-liu-f-network-cameras`. For a Network scenario, it should use `access-point-reyee-wi-fi-5-rg-rap2200-e`. This satisfies the local JSON validation in `useProductDetail.ts`.
   - `mockEquipment` must intercept `**/rest/v1/products*` (not `equipment*`) to mock the Supabase product details fetch.
   - It must also intercept `**/rest/v1/training_courses*` (not `training_media*`) to mock the training video data used by `EquipmentDetailTabs.tsx`.
2. **Fixing Route Fallback**:
   - Replacing `await route.continue()` with `await route.fallback()` in the mock handler ensures that multiple invocations of `mockEquipment` correctly chain their interceptors instead of leaking unmatched queries to the network.
3. **Strictly Scoped Assertions**:
   - Assertions must target specific UI text rendered by `WiringSimulator.tsx`. For example, verifying `page.locator('.simulator').getByText('การเชื่อมต่อเสร็จสมบูรณ์!')` or `page.getByText('LAN Cable')`.
4. **Stronger State Assertions**:
   - For T3.4, after selecting a cable, the test must verify `await expect(page.getByText('Selected')).toBeVisible()`. After switching tabs and returning, it must verify `await expect(page.getByText('Selected')).toBeHidden()`, proving the state was gracefully reset.
5. **Fixing TS Configuration**:
   - Type definitions for Playwright must be strictly imported (`import { Page, Route } from '@playwright/test'`).
   - The root directory requires a basic `tsconfig.json` to configure the TS compiler, and the dependencies must be installed to fix the `tsc --noEmit` failure.

## 3. Caveats
- Supabase SDK's `.maybeSingle()` queries add an `Accept: application/vnd.pgrst.object+json` header. Mocking the API response to return a single JSON object (or an array, which the SDK unwrap) should work depending on how strictly the test verifies headers. A single array object is usually safely handled by the Supabase JS client.

## 4. Conclusion
The worker needs to rewrite `e2e/tier3.spec.ts` to use real slugs from `products.json`, mock `products` and `training_courses` endpoints, use `route.fallback()`, write strict and scoped assertions against `WiringSimulator` UI state, strongly type the Playwright objects, install missing TS dependencies, and create a root `tsconfig.json`.

## 5. Verification Method
1. The Worker should run `npm install -D typescript @types/node @types/react @types/react-dom`.
2. Create `tsconfig.json` in the root.
3. Run `npx tsc --noEmit` to verify type checking passes.
4. Run `npx playwright test e2e/tier3.spec.ts` and ensure all 4 tests pass without timeouts or network leaks.
