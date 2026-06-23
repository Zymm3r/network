# Handoff Report: Milestone 2 Frontend MVP

## 1. Observation
- **`src/features/equipment/components/WiringSimulator.tsx`**:
  - **Line 4-6**: `WiringSimulatorProps` only defines `productName`. It lacks `productCategory`.
  - **Line 23-34**: `ports` and `cables` are defined as static arrays, not dynamically reacting to `productCategory`.
  - **Line 59**: Checks completion with `const isComplete = ports.every(p => connections[p.id] === p.correctCableId);`. There is no calculation or display of a completion percentage.
- **`src/features/equipment/components/EquipmentDetailTabs.tsx`**:
  - **Line 138**: The component `<WiringSimulator />` is invoked as `<WiringSimulator productName={data.product?.name || "อุปกรณ์เครือข่าย"} />`. It does not pass the `product.category`.
  - **Line 157**: The document download link uses a fallback `href={doc.file_url || '#'}` and an inline `onClick` alert for missing URLs. While it has an alert action, it behaves as a placeholder button when `file_url` is missing.

## 2. Logic Chain
1. **Dynamic Scenarios in Simulator**: To dynamically map scenarios (Power Supply -> CCTV Camera, LAN Cable -> Access Point, NVR -> IP Camera), `WiringSimulator` must receive `productCategory` as a prop.
2. **Prop Drilling**: `EquipmentDetailTabs` receives `data: ProductDetailData` which contains `data.product?.category`. It must pass this value to `WiringSimulator` via a new prop `productCategory`.
3. **Scenario Mapping**: Inside `WiringSimulator`, we need to conditionally define the `ports` and `cables` arrays depending on the `productCategory` string (e.g., checking for "CCTV", "Access Point", "IP Camera"). If it matches, we set the specific scenario requirement; otherwise, we can fall back to the generic arrays.
4. **Completion Percentage**: The simulator needs to calculate `(correctConnections / totalPorts) * 100` and display it in the UI, alongside the existing validation feedback and connection status.
5. **Placeholder Buttons**: The scope requires "no placeholder buttons with no actions." The document download link in `EquipmentDetailTabs` should be updated to either not render or be explicitly disabled when `doc.file_url` is absent, removing the placeholder `#` behavior entirely.

## 3. Caveats
- The exact strings for `productCategory` (e.g., "CCTV Camera", "Access Point") coming from the database are assumed based on the requirement names. The matching logic should be case-insensitive or use `.includes()` to be resilient.
- If a category does not match the three specified scenarios, it is assumed that it should fall back to the existing generic simulation.
- I am running in read-only investigation mode and have not implemented these changes.

## 4. Conclusion
To complete Milestone 2, the implementer needs to:
1. **Update `WiringSimulator.tsx`**:
   - Add `productCategory?: string` to `WiringSimulatorProps`.
   - Replace static `ports` and `cables` with dynamic assignments based on `productCategory`.
     - "CCTV": Port = Power, Cable = Power Supply.
     - "Access Point": Port = LAN, Cable = LAN Cable.
     - "IP Camera": Port = NVR, Cable = NVR.
   - Calculate and display `Math.round((correct_connections / total_ports) * 100)%`.
2. **Update `EquipmentDetailTabs.tsx`**:
   - Change line 138 to `<WiringSimulator productName={...} productCategory={data.product?.category} />`.
   - Update the download button at line 157 to safely handle empty `doc.file_url` (e.g., render a disabled button instead of an alert with `#` href).

## 5. Verification Method
- **Code Inspection**: Verify `WiringSimulator.tsx` accepts and uses `productCategory` and displays a percentage `%`. Verify `EquipmentDetailTabs.tsx` passes `data.product?.category`.
- **UI Testing**: 
  - Render `EquipmentDetailTabs` with a mock product having category "Access Point" and verify the "Wiring Simulator" tab shows the LAN Cable scenario.
  - Connect the correct cable and verify the completion percentage shows 100%.
  - Verify document items with no `file_url` do not have an active placeholder download link.
