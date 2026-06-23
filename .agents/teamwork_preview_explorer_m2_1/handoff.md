# Handoff Report: Milestone 2 Frontend MVP Analysis

## Observation
1. In `src/features/equipment/components/WiringSimulator.tsx` (lines 4-34), the component currently accepts only `productName: string` as a prop and hardcodes a single generic set of `ports` and `cables`. It computes `isComplete` but lacks a completion percentage metric.
2. In `src/features/equipment/components/EquipmentDetailTabs.tsx` (line 138), the `WiringSimulator` is invoked with only the `productName` prop: `<WiringSimulator productName={data.product?.name || "อุปกรณ์เครือข่าย"} />`.
3. In `src/features/equipment/components/EquipmentDetailTabs.tsx` (line 157), the document download link is a placeholder that triggers a JS `alert('ลิงก์เอกสารไม่พร้อมใช้งาน')` when no valid URL is present, rather than being disabled.

## Logic Chain
1. **Passing productCategory**: To satisfy the contract between the components, `EquipmentDetailTabs` must be updated to pass `productCategory={data.product?.category || ''}` to `<WiringSimulator />`.
2. **Dynamic Scenario Mapping**: `WiringSimulator` needs to accept `productCategory` in its `WiringSimulatorProps`. A dynamic mapping function (e.g., using `useMemo`) must evaluate `productCategory.toLowerCase()` to set the appropriate `ports` and `cables` to match the exact requirements:
   - "CCTV": scenario mapping "Power Supply" to "CCTV Camera"
   - "Access Point": scenario mapping "LAN Cable" to "Access Point"
   - "IP Camera" / "NVR": scenario mapping "NVR" to "IP Camera"
   - Unmatched: fallback to the generic configuration.
3. **Completion Percentage**: The component must calculate the percentage of correct connections: `(correctConnectionsCount / ports.length) * 100` and render this metric prominently in the UI.
4. **No Placeholder Buttons**: The document download link in `EquipmentDetailTabs` should be refactored using conditional rendering. If `!doc.file_url`, render a `<button disabled>` element with appropriate disabled styling (e.g., `cursor-not-allowed opacity-50`), instead of an active `<a>` tag that produces a dead-end alert.

## Caveats
- The string matching logic for `productCategory` assumes standard keyword structures (e.g., "cctv", "access point", "ip camera"). If the database categorizes items differently (e.g., "Network AP"), the string matching logic needs to be sufficiently robust to catch variants.
- The `WiringSimulator` state (`connections`, `selectedCable`) might need to reset if the `productCategory` prop changes mid-session, though in the current single-page-per-product flow, this is unlikely.

## Conclusion
To fulfill the Frontend MVP requirements:
1. Edit `EquipmentDetailTabs.tsx` to provide `productCategory` to `WiringSimulator` and eliminate the alert-based placeholder button by using a disabled state.
2. Edit `WiringSimulator.tsx` to accept the `productCategory` prop, build the three requested dynamic mapping scenarios, and compute/render the completion percentage.

## Verification Method
1. Start the application and navigate to different equipment product details representing a CCTV Camera, an Access Point, and an IP Camera.
2. Verify the `WiringSimulator` tab renders specific scenarios based on the product.
3. Make correct connections and visually confirm that the connection status, feedback messages, and **completion percentage** update appropriately (e.g., reaching 100%).
4. In the "Documents" tab, check an item without a file URL and confirm the button is fully disabled without firing any alerts.
5. Run the project test/build command (e.g., `npm run build` or `npm run typecheck`) to ensure the React interface changes are strictly typed and error-free.
