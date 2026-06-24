import { test, expect } from '@playwright/test';

test.describe('Tier 2: Boundary & Corner Cases', () => {

  test.describe('F1: Equipment Tabs Navigation', () => {
    test('Rapid Tab Switching', async ({ page }) => {
      await page.goto('/equipment/123');
      
      const tabs = ['tab-overview', 'tab-training', 'tab-simulator', 'tab-specs'];
      for (const tab of tabs) {
        await page.getByTestId(tab).click();
      }
      
      await expect(page.getByTestId('tab-content-specs')).toBeVisible();
      await expect(page.getByTestId('tab-content-overview')).toBeHidden();
      await expect(page.getByTestId('tab-content-training')).toBeHidden();
      await expect(page.getByTestId('tab-content-simulator')).toBeHidden();
    });

    test('Missing Product Category Fallback', async ({ page }) => {
      await page.goto('/equipment/no-category-product');
      await expect(page.getByTestId('equipment-container')).toBeVisible();
      await expect(page.locator('text=No category assigned')).toBeVisible();
    });

    test('Invalid Tab URL Parameter', async ({ page }) => {
      await page.goto('/equipment/123?tab=invalidName');
      await expect(page.getByTestId('tab-overview')).toHaveAttribute('aria-selected', 'true');
      await expect(page.getByTestId('tab-content-overview')).toBeVisible();
    });

    test('Responsive Layout Boundary', async ({ page }) => {
      await page.goto('/equipment/123');
      
      await page.setViewportSize({ width: 375, height: 812 });
      await page.getByTestId('tab-training').click();
      await expect(page.getByTestId('tab-content-training')).toBeVisible();

      await page.setViewportSize({ width: 1280, height: 800 });
      await page.getByTestId('tab-simulator').click();
      await expect(page.getByTestId('tab-content-simulator')).toBeVisible();
      
      await expect(page.getByTestId('tab-training')).toBeVisible();
    });

    test('Redundant Activation', async ({ page }) => {
      await page.goto('/equipment/123');
      
      let requestCount = 0;
      page.on('request', req => {
        if (req.url().includes('/api/equipment/123/tab/')) {
          requestCount++;
        }
      });

      await page.getByTestId('tab-training').click();
      await page.getByTestId('tab-training').dblclick();
      await page.getByTestId('tab-training').click();
      
      await expect(page.getByTestId('tab-content-training')).toBeVisible();
      expect(requestCount).toBeLessThanOrEqual(1);
    });
  });

  test.describe('F2: Training Media Modal', () => {
    test('Empty Lessons State', async ({ page }) => {
      await page.goto('/equipment/product-no-lessons?tab=training');
      await expect(page.getByText('No lessons available')).toBeVisible();
      await expect(page.getByTestId('lesson-list')).toBeHidden();
    });

    test('Malformed Media URL', async ({ page }) => {
      await page.goto('/equipment/product-broken-media?tab=training');
      await page.getByTestId('lesson-item-0').click();
      await expect(page.getByTestId('training-modal')).toBeVisible();
      await expect(page.getByTestId('broken-media-placeholder')).toBeVisible();
    });

    test('Rapid Modal Toggle (Workload)', async ({ page }) => {
      await page.goto('/equipment/123?tab=training');
      
      for (let i = 0; i < 10; i++) {
        await page.getByTestId('lesson-item-0').click();
        await expect(page.getByTestId('training-modal')).toBeVisible();
        await page.getByTestId('close-modal-btn').click();
        await expect(page.getByTestId('training-modal')).toBeHidden();
      }
      
      await expect(page.getByTestId('training-modal')).toBeHidden();
      await expect(page.getByTestId('lesson-list')).toBeVisible();
    });

    test('Text Layout Bounds', async ({ page }) => {
      await page.goto('/equipment/product-long-text?tab=training');
      await page.getByTestId('lesson-item-0').click();
      await expect(page.getByTestId('training-modal')).toBeVisible();
      
      const closeBtn = page.getByTestId('close-modal-btn');
      await expect(closeBtn).toBeVisible();
      await expect(closeBtn).toBeInViewport();
    });

    test('Keyboard Focus Trap', async ({ page }) => {
      await page.goto('/equipment/123?tab=training');
      await page.getByTestId('lesson-item-0').click();
      await expect(page.getByTestId('training-modal')).toBeVisible();
      
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Escape');
      
      await expect(page.getByTestId('training-modal')).toBeHidden();
    });
  });

  test.describe('F3: Simulator UI & Status', () => {
    test('Invalid Connection Boundary', async ({ page }) => {
      await page.goto('/equipment/123?tab=simulator');
      
      const completionText = await page.getByTestId('completion-percentage').textContent();
      
      await page.getByTestId('device-port-A').dragTo(page.getByTestId('device-port-B-incompatible'));
      
      await expect(page.getByTestId('connection-error-feedback')).toBeVisible();
      await expect(page.getByTestId('completion-percentage')).toHaveText(completionText || '0%');
    });

    test('Self-Connection/Loop Attempt', async ({ page }) => {
      await page.goto('/equipment/123?tab=simulator');
      
      await page.getByTestId('device-port-A').dragTo(page.getByTestId('device-port-A'));
      
      await expect(page.getByTestId('connection-error-feedback')).toBeVisible();
      await expect(page.getByTestId('simulator-workspace')).toBeVisible();
    });

    test('Rapid Successive Connections', async ({ page }) => {
      await page.goto('/equipment/123?tab=simulator');
      
      await Promise.all([
        page.getByTestId('device-port-1').dragTo(page.getByTestId('target-port-1')),
        page.getByTestId('device-port-2').dragTo(page.getByTestId('target-port-2')),
        page.getByTestId('device-port-3').dragTo(page.getByTestId('target-port-3'))
      ]);
      
      await expect(page.getByTestId('completion-percentage')).toHaveText('100%');
    });

    test('Reset Mid-Progress', async ({ page }) => {
      await page.goto('/equipment/123?tab=simulator');
      
      await page.getByTestId('device-port-1').dragTo(page.getByTestId('target-port-1'));
      await expect(page.getByTestId('completion-percentage')).toHaveText('50%');
      
      await page.getByTestId('reset-btn').click();
      await page.getByTestId('reset-btn').click();
      
      await expect(page.getByTestId('completion-percentage')).toHaveText('0%');
      await expect(page.locator('.connection-line')).toHaveCount(0);
    });

    test('Maximized Device Clutter', async ({ page }) => {
      await page.goto('/equipment/123?tab=simulator');
      
      const targetPoint = { x: 100, y: 100 };
      
      await page.getByTestId('device-node-1').dragTo(page.getByTestId('simulator-workspace'), { targetPosition: targetPoint });
      await page.getByTestId('device-node-2').dragTo(page.getByTestId('simulator-workspace'), { targetPosition: targetPoint });
      await page.getByTestId('device-node-3').dragTo(page.getByTestId('simulator-workspace'), { targetPosition: targetPoint });
      
      await expect(page.getByTestId('completion-percentage')).toBeVisible();
    });
  });

  test.describe('F4: Simulator Scenarios', () => {
    test('Unknown Category Mapping', async ({ page }) => {
      await page.goto('/equipment/product-unknown-category?tab=simulator');
      await expect(page.getByText(/No simulator available|Generic Fallback Scenario/i)).toBeVisible();
    });

    test('Case Insensitivity Boundary', async ({ page }) => {
      await page.goto('/equipment/product-cctv-mixed?tab=simulator');
      await expect(page.getByTestId('scenario-nvr')).toBeVisible();
      
      await page.goto('/equipment/product-network-mixed?tab=simulator');
      await expect(page.getByTestId('scenario-lan')).toBeVisible();
    });

    test('State Abandonment & Return', async ({ page }) => {
      await page.goto('/equipment/123?tab=simulator');
      await page.getByTestId('device-port-1').dragTo(page.getByTestId('target-port-1'));
      await expect(page.getByTestId('completion-percentage')).toHaveText('50%');
      
      await page.getByTestId('tab-training').click();
      await expect(page.getByTestId('tab-content-training')).toBeVisible();
      
      await page.getByTestId('tab-simulator').click();
      const text = await page.getByTestId('completion-percentage').textContent();
      expect(['0%', '50%'].includes(text?.trim() || '')).toBeTruthy();
    });

    test('Cross-Category Leakage', async ({ page }) => {
      await page.goto('/equipment/product-cctv?tab=simulator');
      await expect(page.getByTestId('scenario-nvr')).toBeVisible();
      
      await page.goto('/equipment/product-network?tab=simulator');
      await expect(page.getByTestId('scenario-lan')).toBeVisible();
      await expect(page.getByTestId('nvr-node')).toBeHidden();
      await expect(page.getByTestId('ip-camera-node')).toBeHidden();
    });

    test('Cyclical Completion', async ({ page }) => {
      await page.goto('/equipment/123?tab=simulator');
      
      await page.getByTestId('device-port-1').dragTo(page.getByTestId('target-port-1'));
      await page.getByTestId('device-port-2').dragTo(page.getByTestId('target-port-2'));
      await expect(page.getByTestId('completion-percentage')).toHaveText('100%');
      await expect(page.getByTestId('success-feedback')).toBeVisible();
      
      await page.getByTestId('reset-btn').click();
      await expect(page.getByTestId('completion-percentage')).toHaveText('0%');
      
      await page.getByTestId('device-port-1').dragTo(page.getByTestId('target-port-1'));
      await page.getByTestId('device-port-2').dragTo(page.getByTestId('target-port-2'));
      await expect(page.getByTestId('completion-percentage')).toHaveText('100%');
      await expect(page.getByTestId('success-feedback')).toBeVisible();
    });
  });

});
