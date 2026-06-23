import { test, expect } from '@playwright/test';

test.describe('Tier 4: Real-World Application Scenarios', () => {

  test('Scenario 1: CCTV simulator flow and training media', async ({ page }) => {
    await page.goto('/');

    // Click CCTV tab
    await page.getByRole('tab', { name: /CCTV/i }).click();

    // Interact with NVR and IP Camera
    await page.getByRole('button', { name: /NVR/i }).click();
    await page.getByRole('button', { name: /IP Camera/i }).click();

    // Verify connection status
    await expect(page.getByText(/Connected|Connection|Status/i).first()).toBeVisible();

    // Open Training Modal
    await page.getByRole('button', { name: /Training|Video|Media/i }).click();
    
    // Verify it appears
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    // Close it
    await page.getByRole('button', { name: /Close|Dismiss/i }).click();
    await expect(modal).toBeHidden();
  });

  test('Scenario 2: Network simulator flow and completion status', async ({ page }) => {
    await page.goto('/');

    // Click Network tab
    await page.getByRole('tab', { name: /Network/i }).click();

    // Interact with LAN and AP
    await page.getByRole('button', { name: /LAN/i }).click();
    await page.getByRole('button', { name: /AP|Access Point/i }).click();

    // Verify completion %
    await expect(page.getByText(/100%/)).toBeVisible();
  });

  test('Scenario 3: Cross-tab state isolation', async ({ page }) => {
    await page.goto('/');

    // Click CCTV tab
    await page.getByRole('tab', { name: /CCTV/i }).click();

    // Open Training Modal
    await page.getByRole('button', { name: /Training|Video|Media/i }).click();
    
    // Verify it appears
    const modal = page.getByRole('dialog');
    await expect(modal).toBeVisible();

    // Switch to Network tab
    await page.getByRole('tab', { name: /Network/i }).click();

    // Verify modal is closed or hidden
    await expect(modal).toBeHidden();

    // Verify Network simulator is in default state
    await expect(page.getByText(/0%/)).toBeVisible();

    // Switch back to CCTV tab
    await page.getByRole('tab', { name: /CCTV/i }).click();

    // Verify it is also reset (state isolation)
    await expect(modal).toBeHidden();
    await expect(page.getByText(/100%|Connected/i)).toBeHidden();
  });

});
