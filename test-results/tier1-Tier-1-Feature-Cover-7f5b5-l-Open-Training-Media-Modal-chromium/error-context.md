# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tier1.spec.ts >> Tier 1: Feature Coverage >> F2: Training Media Modal >> Open Training Media Modal
- Location: e2e\tier1.spec.ts:52:5

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('tab', { name: 'Training' })

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
  1   | import { test, expect } from '@playwright/test';
  2   | 
  3   | test.describe('Tier 1: Feature Coverage', () => {
  4   |   test.describe('F1: Equipment Tabs Navigation', () => {
  5   |     test.beforeEach(async ({ page }) => {
  6   |       await page.goto('/equipment/1'); // Mock navigation
  7   |     });
  8   | 
  9   |     test('Verify default tab selection', async ({ page }) => {
  10  |       const overviewTab = page.getByRole('tab', { name: 'Overview' });
  11  |       await expect(overviewTab).toHaveAttribute('aria-selected', 'true');
  12  |       await expect(page.getByTestId('overview-content')).toBeVisible();
  13  |     });
  14  | 
  15  |     test('Switch to Training tab', async ({ page }) => {
  16  |       await page.getByRole('tab', { name: 'Training' }).click();
  17  |       await expect(page.getByRole('tab', { name: 'Training' })).toHaveAttribute('aria-selected', 'true');
  18  |       await expect(page.getByTestId('training-lessons-list')).toBeVisible();
  19  |     });
  20  | 
  21  |     test('Switch to Simulator tab', async ({ page }) => {
  22  |       await page.getByRole('tab', { name: 'Simulator' }).click();
  23  |       await expect(page.getByRole('tab', { name: 'Simulator' })).toHaveAttribute('aria-selected', 'true');
  24  |       await expect(page.getByTestId('simulator-canvas')).toBeVisible();
  25  |     });
  26  | 
  27  |     test('Switch back and forth between tabs', async ({ page }) => {
  28  |       await page.getByRole('tab', { name: 'Training' }).click();
  29  |       await expect(page.getByTestId('training-lessons-list')).toBeVisible();
  30  |       await page.getByRole('tab', { name: 'Simulator' }).click();
  31  |       await expect(page.getByTestId('simulator-canvas')).toBeVisible();
  32  |       await page.getByRole('tab', { name: 'Overview' }).click();
  33  |       await expect(page.getByTestId('overview-content')).toBeVisible();
  34  |       await expect(page.getByTestId('training-lessons-list')).toBeHidden();
  35  |     });
  36  | 
  37  |     test('Verify no unclickable action buttons', async ({ page }) => {
  38  |       const buttons = page.locator('button');
  39  |       const count = await buttons.count();
  40  |       for (let i = 0; i < count; i++) {
  41  |         await expect(buttons.nth(i)).toBeEnabled();
  42  |       }
  43  |     });
  44  |   });
  45  | 
  46  |   test.describe('F2: Training Media Modal', () => {
  47  |     test.beforeEach(async ({ page }) => {
  48  |       await page.goto('/equipment/1');
> 49  |       await page.getByRole('tab', { name: 'Training' }).click();
      |                                                         ^ Error: locator.click: Test timeout of 30000ms exceeded.
  50  |     });
  51  | 
  52  |     test('Open Training Media Modal', async ({ page }) => {
  53  |       await page.getByTestId('lesson-card').first().click();
  54  |       await expect(page.getByRole('dialog')).toBeVisible();
  55  |     });
  56  | 
  57  |     test('Verify Modal Video Player', async ({ page }) => {
  58  |       await page.getByTestId('lesson-card').first().click();
  59  |       const iframe = page.locator('dialog iframe');
  60  |       await expect(iframe).toBeVisible();
  61  |       await expect(iframe).toHaveAttribute('src', /youtube\.com/);
  62  |     });
  63  | 
  64  |     test('Verify Modal Metadata', async ({ page }) => {
  65  |       const lessonTitle = 'Installation Basics';
  66  |       const lessonDesc = 'Learn how to install';
  67  |       // Assume test setup has seeded this lesson
  68  |       // Instead of clicking lessonTitle text directly, click the card then assert
  69  |       await page.getByTestId('lesson-card').first().click();
  70  |       
  71  |       const dialog = page.getByRole('dialog');
  72  |       await expect(dialog.getByText(lessonTitle)).toBeVisible();
  73  |       await expect(dialog.getByText(lessonDesc)).toBeVisible();
  74  |     });
  75  | 
  76  |     test('Close Modal via Close Button', async ({ page }) => {
  77  |       await page.getByTestId('lesson-card').first().click();
  78  |       const dialog = page.getByRole('dialog');
  79  |       await expect(dialog).toBeVisible();
  80  |       await page.getByRole('button', { name: 'Close' }).click();
  81  |       await expect(dialog).toBeHidden();
  82  |     });
  83  | 
  84  |     test('Close Modal via Backdrop Click', async ({ page }) => {
  85  |       await page.getByTestId('lesson-card').first().click();
  86  |       const dialog = page.getByRole('dialog');
  87  |       await expect(dialog).toBeVisible();
  88  |       // Click outside the dialog content.
  89  |       await page.mouse.click(10, 10);
  90  |       await expect(dialog).toBeHidden();
  91  |     });
  92  |   });
  93  | 
  94  |   test.describe('F3: Simulator UI & Status', () => {
  95  |     test.beforeEach(async ({ page }) => {
  96  |       await page.goto('/equipment/1');
  97  |       await page.getByRole('tab', { name: 'Simulator' }).click();
  98  |     });
  99  | 
  100 |     test('Initial Simulator State', async ({ page }) => {
  101 |       await expect(page.getByText('0%')).toBeVisible();
  102 |       await expect(page.getByText(/Ready|Not Connected/i)).toBeVisible();
  103 |     });
  104 | 
  105 |     test('Valid Connection Feedback', async ({ page }) => {
  106 |       // Assuming a generic valid connection mechanism
  107 |       await page.getByTestId('node-source').dragTo(page.getByTestId('node-target'));
  108 |       await expect(page.getByTestId('connection-success-indicator')).toBeVisible();
  109 |     });
  110 | 
  111 |     test('Invalid Connection Feedback', async ({ page }) => {
  112 |       await page.getByTestId('node-source').dragTo(page.getByTestId('node-incompatible'));
  113 |       await expect(page.getByTestId('connection-error-indicator')).toBeVisible();
  114 |     });
  115 | 
  116 |     test('Completion Percentage Increment', async ({ page }) => {
  117 |       await page.getByTestId('node-source-1').dragTo(page.getByTestId('node-target-1'));
  118 |       await expect(page.getByText('50%')).toBeVisible();
  119 |     });
  120 | 
  121 |     test('Scenario Completion State', async ({ page }) => {
  122 |       await page.getByTestId('node-source-1').dragTo(page.getByTestId('node-target-1'));
  123 |       await page.getByTestId('node-source-2').dragTo(page.getByTestId('node-target-2'));
  124 |       await expect(page.getByText('100%')).toBeVisible();
  125 |       await expect(page.getByText(/Scenario Complete/i)).toBeVisible();
  126 |     });
  127 |   });
  128 | 
  129 |   test.describe('F4: Simulator Scenarios', () => {
  130 |     test('Dynamic Mapping - CCTV UI', async ({ page }) => {
  131 |       await page.goto('/equipment/cctv-product-id');
  132 |       await page.getByRole('tab', { name: 'Simulator' }).click();
  133 |       await expect(page.getByText('Power Supply')).toBeVisible();
  134 |       await expect(page.getByText('CCTV Camera')).toBeVisible();
  135 |       await expect(page.getByText('NVR')).toBeVisible();
  136 |       await expect(page.getByText('IP Camera')).toBeVisible();
  137 |     });
  138 | 
  139 |     test('Execute CCTV Scenario 1', async ({ page }) => {
  140 |       await page.goto('/equipment/cctv-product-id');
  141 |       await page.getByRole('tab', { name: 'Simulator' }).click();
  142 |       await page.getByTestId('node-power-supply').dragTo(page.getByTestId('node-cctv-camera'));
  143 |       await expect(page.getByTestId('connection-success-indicator')).toBeVisible();
  144 |     });
  145 | 
  146 |     test('Execute CCTV Scenario 2', async ({ page }) => {
  147 |       await page.goto('/equipment/cctv-product-id');
  148 |       await page.getByRole('tab', { name: 'Simulator' }).click();
  149 |       await page.getByTestId('node-nvr').dragTo(page.getByTestId('node-ip-camera'));
```