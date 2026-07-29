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
