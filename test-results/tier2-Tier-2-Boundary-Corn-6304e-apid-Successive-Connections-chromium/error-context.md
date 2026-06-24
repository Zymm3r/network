# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier2.spec.ts >> Tier 2: Boundary & Corner Cases >> F3: Simulator UI & Status >> Rapid Successive Connections
- Location: e2e\tier2.spec.ts:137:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.dragTo: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByTestId('device-port-1')

```

# Page snapshot

```yaml
- generic [ref=e5]:
  - generic [ref=e6]:
    - img [ref=e8]
    - heading "Network 101" [level=1] [ref=e13]
    - paragraph [ref=e14]: การสร้างเครือข่ายพื้นฐาน
  - generic [ref=e15]:
    - generic [ref=e16]:
      - heading "ยินดีต้อนรับ" [level=4] [ref=e17]
      - paragraph [ref=e18]: กรอกอีเมลเพื่อรับลิงก์เข้าสู่ระบบ ไม่ต้องใช้รหัสผ่าน
    - generic [ref=e19]:
      - generic [ref=e20]:
        - generic [ref=e21]:
          - generic [ref=e22]: ที่อยู่อีเมล
          - generic [ref=e23]:
            - img [ref=e24]
            - textbox "ที่อยู่อีเมล" [ref=e27]:
              - /placeholder: email@example.com
        - button "ส่งลิงก์เข้าสู่ระบบ" [ref=e28]:
          - img
          - text: ส่งลิงก์เข้าสู่ระบบ
          - img
        - paragraph [ref=e29]: ไม่ต้องสร้างรหัสผ่าน — เราจะส่งลิงก์ไปยังอีเมลของคุณเพื่อเข้าสู่ระบบทุกครั้ง เซสชันจะคงอยู่ 3 วัน
      - generic [ref=e30]:
        - generic [ref=e35]: หรือดำเนินการต่อด้วย
        - button "เข้าสู่ระบบด้วย Google" [ref=e36]:
          - img
          - text: เข้าสู่ระบบด้วย Google
  - button "English" [ref=e38]
```

# Test source

```ts
  41  |       await expect(page.getByTestId('tab-content-simulator')).toBeVisible();
  42  |       
  43  |       await expect(page.getByTestId('tab-training')).toBeVisible();
  44  |     });
  45  | 
  46  |     test('Redundant Activation', async ({ page }) => {
  47  |       await page.goto('/equipment/123');
  48  |       
  49  |       let requestCount = 0;
  50  |       page.on('request', req => {
  51  |         if (req.url().includes('/api/equipment/123/tab/')) {
  52  |           requestCount++;
  53  |         }
  54  |       });
  55  | 
  56  |       await page.getByTestId('tab-training').click();
  57  |       await page.getByTestId('tab-training').dblclick();
  58  |       await page.getByTestId('tab-training').click();
  59  |       
  60  |       await expect(page.getByTestId('tab-content-training')).toBeVisible();
  61  |       expect(requestCount).toBeLessThanOrEqual(1);
  62  |     });
  63  |   });
  64  | 
  65  |   test.describe('F2: Training Media Modal', () => {
  66  |     test('Empty Lessons State', async ({ page }) => {
  67  |       await page.goto('/equipment/product-no-lessons?tab=training');
  68  |       await expect(page.getByText('No lessons available')).toBeVisible();
  69  |       await expect(page.getByTestId('lesson-list')).toBeHidden();
  70  |     });
  71  | 
  72  |     test('Malformed Media URL', async ({ page }) => {
  73  |       await page.goto('/equipment/product-broken-media?tab=training');
  74  |       await page.getByTestId('lesson-item-0').click();
  75  |       await expect(page.getByTestId('training-modal')).toBeVisible();
  76  |       await expect(page.getByTestId('broken-media-placeholder')).toBeVisible();
  77  |     });
  78  | 
  79  |     test('Rapid Modal Toggle (Workload)', async ({ page }) => {
  80  |       await page.goto('/equipment/123?tab=training');
  81  |       
  82  |       for (let i = 0; i < 10; i++) {
  83  |         await page.getByTestId('lesson-item-0').click();
  84  |         await expect(page.getByTestId('training-modal')).toBeVisible();
  85  |         await page.getByTestId('close-modal-btn').click();
  86  |         await expect(page.getByTestId('training-modal')).toBeHidden();
  87  |       }
  88  |       
  89  |       await expect(page.getByTestId('training-modal')).toBeHidden();
  90  |       await expect(page.getByTestId('lesson-list')).toBeVisible();
  91  |     });
  92  | 
  93  |     test('Text Layout Bounds', async ({ page }) => {
  94  |       await page.goto('/equipment/product-long-text?tab=training');
  95  |       await page.getByTestId('lesson-item-0').click();
  96  |       await expect(page.getByTestId('training-modal')).toBeVisible();
  97  |       
  98  |       const closeBtn = page.getByTestId('close-modal-btn');
  99  |       await expect(closeBtn).toBeVisible();
  100 |       await expect(closeBtn).toBeInViewport();
  101 |     });
  102 | 
  103 |     test('Keyboard Focus Trap', async ({ page }) => {
  104 |       await page.goto('/equipment/123?tab=training');
  105 |       await page.getByTestId('lesson-item-0').click();
  106 |       await expect(page.getByTestId('training-modal')).toBeVisible();
  107 |       
  108 |       await page.keyboard.press('Tab');
  109 |       await page.keyboard.press('Tab');
  110 |       await page.keyboard.press('Escape');
  111 |       
  112 |       await expect(page.getByTestId('training-modal')).toBeHidden();
  113 |     });
  114 |   });
  115 | 
  116 |   test.describe('F3: Simulator UI & Status', () => {
  117 |     test('Invalid Connection Boundary', async ({ page }) => {
  118 |       await page.goto('/equipment/123?tab=simulator');
  119 |       
  120 |       const completionText = await page.getByTestId('completion-percentage').textContent();
  121 |       
  122 |       await page.getByTestId('device-port-A').dragTo(page.getByTestId('device-port-B-incompatible'));
  123 |       
  124 |       await expect(page.getByTestId('connection-error-feedback')).toBeVisible();
  125 |       await expect(page.getByTestId('completion-percentage')).toHaveText(completionText || '0%');
  126 |     });
  127 | 
  128 |     test('Self-Connection/Loop Attempt', async ({ page }) => {
  129 |       await page.goto('/equipment/123?tab=simulator');
  130 |       
  131 |       await page.getByTestId('device-port-A').dragTo(page.getByTestId('device-port-A'));
  132 |       
  133 |       await expect(page.getByTestId('connection-error-feedback')).toBeVisible();
  134 |       await expect(page.getByTestId('simulator-workspace')).toBeVisible();
  135 |     });
  136 | 
  137 |     test('Rapid Successive Connections', async ({ page }) => {
  138 |       await page.goto('/equipment/123?tab=simulator');
  139 |       
  140 |       await Promise.all([
> 141 |         page.getByTestId('device-port-1').dragTo(page.getByTestId('target-port-1')),
      |                                           ^ Error: locator.dragTo: Test timeout of 30000ms exceeded.
  142 |         page.getByTestId('device-port-2').dragTo(page.getByTestId('target-port-2')),
  143 |         page.getByTestId('device-port-3').dragTo(page.getByTestId('target-port-3'))
  144 |       ]);
  145 |       
  146 |       await expect(page.getByTestId('completion-percentage')).toHaveText('100%');
  147 |     });
  148 | 
  149 |     test('Reset Mid-Progress', async ({ page }) => {
  150 |       await page.goto('/equipment/123?tab=simulator');
  151 |       
  152 |       await page.getByTestId('device-port-1').dragTo(page.getByTestId('target-port-1'));
  153 |       await expect(page.getByTestId('completion-percentage')).toHaveText('50%');
  154 |       
  155 |       await page.getByTestId('reset-btn').click();
  156 |       await page.getByTestId('reset-btn').click();
  157 |       
  158 |       await expect(page.getByTestId('completion-percentage')).toHaveText('0%');
  159 |       await expect(page.locator('.connection-line')).toHaveCount(0);
  160 |     });
  161 | 
  162 |     test('Maximized Device Clutter', async ({ page }) => {
  163 |       await page.goto('/equipment/123?tab=simulator');
  164 |       
  165 |       const targetPoint = { x: 100, y: 100 };
  166 |       
  167 |       await page.getByTestId('device-node-1').dragTo(page.getByTestId('simulator-workspace'), { targetPosition: targetPoint });
  168 |       await page.getByTestId('device-node-2').dragTo(page.getByTestId('simulator-workspace'), { targetPosition: targetPoint });
  169 |       await page.getByTestId('device-node-3').dragTo(page.getByTestId('simulator-workspace'), { targetPosition: targetPoint });
  170 |       
  171 |       await expect(page.getByTestId('completion-percentage')).toBeVisible();
  172 |     });
  173 |   });
  174 | 
  175 |   test.describe('F4: Simulator Scenarios', () => {
  176 |     test('Unknown Category Mapping', async ({ page }) => {
  177 |       await page.goto('/equipment/product-unknown-category?tab=simulator');
  178 |       await expect(page.getByText(/No simulator available|Generic Fallback Scenario/i)).toBeVisible();
  179 |     });
  180 | 
  181 |     test('Case Insensitivity Boundary', async ({ page }) => {
  182 |       await page.goto('/equipment/product-cctv-mixed?tab=simulator');
  183 |       await expect(page.getByTestId('scenario-nvr')).toBeVisible();
  184 |       
  185 |       await page.goto('/equipment/product-network-mixed?tab=simulator');
  186 |       await expect(page.getByTestId('scenario-lan')).toBeVisible();
  187 |     });
  188 | 
  189 |     test('State Abandonment & Return', async ({ page }) => {
  190 |       await page.goto('/equipment/123?tab=simulator');
  191 |       await page.getByTestId('device-port-1').dragTo(page.getByTestId('target-port-1'));
  192 |       await expect(page.getByTestId('completion-percentage')).toHaveText('50%');
  193 |       
  194 |       await page.getByTestId('tab-training').click();
  195 |       await expect(page.getByTestId('tab-content-training')).toBeVisible();
  196 |       
  197 |       await page.getByTestId('tab-simulator').click();
  198 |       const text = await page.getByTestId('completion-percentage').textContent();
  199 |       expect(['0%', '50%'].includes(text?.trim() || '')).toBeTruthy();
  200 |     });
  201 | 
  202 |     test('Cross-Category Leakage', async ({ page }) => {
  203 |       await page.goto('/equipment/product-cctv?tab=simulator');
  204 |       await expect(page.getByTestId('scenario-nvr')).toBeVisible();
  205 |       
  206 |       await page.goto('/equipment/product-network?tab=simulator');
  207 |       await expect(page.getByTestId('scenario-lan')).toBeVisible();
  208 |       await expect(page.getByTestId('nvr-node')).toBeHidden();
  209 |       await expect(page.getByTestId('ip-camera-node')).toBeHidden();
  210 |     });
  211 | 
  212 |     test('Cyclical Completion', async ({ page }) => {
  213 |       await page.goto('/equipment/123?tab=simulator');
  214 |       
  215 |       await page.getByTestId('device-port-1').dragTo(page.getByTestId('target-port-1'));
  216 |       await page.getByTestId('device-port-2').dragTo(page.getByTestId('target-port-2'));
  217 |       await expect(page.getByTestId('completion-percentage')).toHaveText('100%');
  218 |       await expect(page.getByTestId('success-feedback')).toBeVisible();
  219 |       
  220 |       await page.getByTestId('reset-btn').click();
  221 |       await expect(page.getByTestId('completion-percentage')).toHaveText('0%');
  222 |       
  223 |       await page.getByTestId('device-port-1').dragTo(page.getByTestId('target-port-1'));
  224 |       await page.getByTestId('device-port-2').dragTo(page.getByTestId('target-port-2'));
  225 |       await expect(page.getByTestId('completion-percentage')).toHaveText('100%');
  226 |       await expect(page.getByTestId('success-feedback')).toBeVisible();
  227 |     });
  228 |   });
  229 | 
  230 | });
  231 | 
```