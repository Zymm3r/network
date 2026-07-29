import { expect, test } from '@playwright/test';

for (const path of ['/courses', '/lessons']) {
  test(`refreshes ${path} without a hosting 404 or redirect loop`, async ({ page }) => {
    await page.goto(path);
    await page.reload();

    await expect(page.locator('body')).not.toContainText('NOT_FOUND');
    await expect(page.locator('body')).not.toContainText('ERR_TOO_MANY_REDIRECTS');
    expect(new URL(page.url()).origin).toBe('http://localhost:5173');
  });
}

test('refreshes a lesson detail route', async ({ page }) => {
  await page.goto('/lessons/lesson-ccna001-01');
  await page.reload();
  await expect(page.locator('body')).not.toContainText('NOT_FOUND');
});

test('renders lessons without unsupported React hooks', async ({ page }) => {
  const pageErrors: Error[] = [];
  page.on('pageerror', (error) => pageErrors.push(error));

  await page.goto('/lessons');
  await expect(page.locator('body')).not.toContainText('เกิดข้อผิดพลาด');
  expect(pageErrors.map((error) => error.message).join('\n')).not.toContain('useOptimistic');
});
