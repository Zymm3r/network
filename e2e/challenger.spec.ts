import { test, expect } from '@playwright/test';

test.describe('Challenger: Edge Cases', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/lessons/python-basics-1');
  });

  // 1. Very long lines, many newlines to test line limit bypass (1000 lines).
  test('Case 1: Line limit bypass with many newlines', async ({ page }) => {
    // 2000 newlines, each with a character, should exceed 1000 lines and truncate properly
    await page.locator('textarea').fill('print("x\\n" * 2000)');
    await page.getByRole('button', { name: /รันโค้ด/ }).click();
    
    // It should hit the output limit error
    await expect(page.getByText(/Output limit exceeded/i)).toBeVisible({ timeout: 15000 });
  });

  // 2. Huge strings to trigger `encode` OOM.
  test('Case 2: Huge strings for encode OOM', async ({ page }) => {
    // 100 million chars might hit MemoryError in python, or if it prints, it should be capped.
    // Let's use 10 million to avoid pure MemoryError and instead test the stdout write
    await page.locator('textarea').fill('print("a" * (10**7))');
    await page.getByRole('button', { name: /รันโค้ด/ }).click();
    
    // It should hit the output limit, or MemoryError, but shouldn't crash the tab or timeout
    await expect(page.getByText(/Output limit exceeded|MemoryError/i)).toBeVisible({ timeout: 15000 });
  });

  // 3. Catching `RuntimeError` in a `while True` loop to test infinite buffer growth.
  test('Case 3: Catching RuntimeError in infinite loop', async ({ page }) => {
    await page.locator('textarea').fill(`while True:
    try:
        print("A")
    except RuntimeError:
        pass`);
    await page.getByRole('button', { name: /รันโค้ด/ }).click();
    
    // The worker should time out after 5000ms
    await expect(page.getByText(/Timeout|Execution took too long/i)).toBeVisible({ timeout: 15000 });
  });

  // 4. Testing that normal execution exceptions (e.g. `NameError`) show tracebacks.
  test('Case 4: Normal exceptions show tracebacks', async ({ page }) => {
    await page.locator('textarea').fill(`def f():
    return undefined_var
f()`);
    await page.getByRole('button', { name: /รันโค้ด/ }).click();
    
    // It should show NameError and Traceback
    await expect(page.getByText(/NameError/)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Traceback \(most recent call last\)/)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/line 2, in f/)).toBeVisible({ timeout: 15000 });
  });

});
