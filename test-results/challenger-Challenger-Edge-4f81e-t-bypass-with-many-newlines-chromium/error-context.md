# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: challenger.spec.ts >> Challenger: Edge Cases >> Case 1: Line limit bypass with many newlines
- Location: e2e\challenger.spec.ts:10:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('textarea')

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
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Challenger: Edge Cases', () => {
  4  | 
  5  |   test.beforeEach(async ({ page }) => {
  6  |     await page.goto('/lessons/python-basics-1');
  7  |   });
  8  | 
  9  |   // 1. Very long lines, many newlines to test line limit bypass (1000 lines).
  10 |   test('Case 1: Line limit bypass with many newlines', async ({ page }) => {
  11 |     // 2000 newlines, each with a character, should exceed 1000 lines and truncate properly
> 12 |     await page.locator('textarea').fill('print("x\\n" * 2000)');
     |                                    ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  13 |     await page.getByRole('button', { name: /รันโค้ด/ }).click();
  14 |     
  15 |     // It should hit the output limit error
  16 |     await expect(page.getByText(/Output limit exceeded/i)).toBeVisible({ timeout: 15000 });
  17 |   });
  18 | 
  19 |   // 2. Huge strings to trigger `encode` OOM.
  20 |   test('Case 2: Huge strings for encode OOM', async ({ page }) => {
  21 |     // 100 million chars might hit MemoryError in python, or if it prints, it should be capped.
  22 |     // Let's use 10 million to avoid pure MemoryError and instead test the stdout write
  23 |     await page.locator('textarea').fill('print("a" * (10**7))');
  24 |     await page.getByRole('button', { name: /รันโค้ด/ }).click();
  25 |     
  26 |     // It should hit the output limit, or MemoryError, but shouldn't crash the tab or timeout
  27 |     await expect(page.getByText(/Output limit exceeded|MemoryError/i)).toBeVisible({ timeout: 15000 });
  28 |   });
  29 | 
  30 |   // 3. Catching `RuntimeError` in a `while True` loop to test infinite buffer growth.
  31 |   test('Case 3: Catching RuntimeError in infinite loop', async ({ page }) => {
  32 |     await page.locator('textarea').fill(`while True:
  33 |     try:
  34 |         print("A")
  35 |     except RuntimeError:
  36 |         pass`);
  37 |     await page.getByRole('button', { name: /รันโค้ด/ }).click();
  38 |     
  39 |     // The worker should time out after 5000ms
  40 |     await expect(page.getByText(/Timeout|Execution took too long/i)).toBeVisible({ timeout: 15000 });
  41 |   });
  42 | 
  43 |   // 4. Testing that normal execution exceptions (e.g. `NameError`) show tracebacks.
  44 |   test('Case 4: Normal exceptions show tracebacks', async ({ page }) => {
  45 |     await page.locator('textarea').fill(`def f():
  46 |     return undefined_var
  47 | f()`);
  48 |     await page.getByRole('button', { name: /รันโค้ด/ }).click();
  49 |     
  50 |     // It should show NameError and Traceback
  51 |     await expect(page.getByText(/NameError/)).toBeVisible({ timeout: 15000 });
  52 |     await expect(page.getByText(/Traceback \(most recent call last\)/)).toBeVisible({ timeout: 15000 });
  53 |     await expect(page.getByText(/line 2, in f/)).toBeVisible({ timeout: 15000 });
  54 |   });
  55 | 
  56 | });
  57 | 
```