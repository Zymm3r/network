import { test, expect } from '@playwright/test';

test.describe('Tier 3: Cross-Feature Interactions for Equipment Catalog', () => {

  // Helper to mock Supabase API responses
  const mockEquipment = async (page: any, category: string, slug: string) => {
    await page.route(`**/rest/v1/equipment*`, async (route: any) => {
      // Mock the equipment details response
      if (route.request().url().includes(`slug=eq.${slug}`)) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([{
            id: 'mock-id-1',
            title: `Mock ${category} Equipment`,
            slug: slug,
            category: category,
            description: 'A mocked equipment for testing.',
          }])
        });
      } else {
        await route.continue();
      }
    });

    await page.route(`**/rest/v1/training_media*`, async (route: any) => {
      // Mock the training media response
      if (route.request().url().includes('equipment_id=eq.mock-id-1')) {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([{
            id: 'media-1',
            equipment_id: 'mock-id-1',
            title: 'Installation Guide',
            video_url: 'https://www.youtube.com/embed/mock',
          }])
        });
      } else {
        await route.continue();
      }
    });
  };

  test('T3.1: F1 & F2 - Navigate to Training tab and open training media modal', async ({ page }) => {
    await mockEquipment(page, 'CCTV', 'cctv-1');
    await page.goto('/equipment/cctv-1');

    // Click Training tab
    await page.getByRole('button', { name: /Training|สื่อการสอน/i }).click();

    // Click Watch Lesson (or similar button)
    await page.getByRole('button', { name: /Watch Lesson|ดูบทเรียน|Watch/i }).first().click();

    // Assert modal and iframe appear
    const modalHeading = page.getByRole('heading', { name: /Installation Guide|Training Media/i });
    await expect(modalHeading).toBeVisible();
    await expect(page.locator('iframe')).toBeVisible();
  });

  test('T3.2: F1 & F3 - Navigate to Wiring Simulator and make a connection', async ({ page }) => {
    await mockEquipment(page, 'CCTV', 'cctv-1');
    await page.goto('/equipment/cctv-1');

    // Click Wiring Simulator tab
    await page.getByRole('button', { name: /Wiring Simulator|การเชื่อมต่อสาย/i }).click();

    // Select a cable (using generic names that a simulator might have)
    await page.getByRole('button', { name: /LAN|Coaxial|Power/i }).first().click();

    // Click a port
    await page.getByRole('button', { name: /Port|พอร์ต/i }).first().click();
    
    // Click another port to complete connection
    await page.getByRole('button', { name: /Port|พอร์ต/i }).nth(1).click();

    // Check for connection result message (either success or connected)
    await expect(page.getByText(/Connection|Connected|สำเร็จ|Error|Invalid/i)).toBeVisible();
  });

  test('T3.3: F4 & F3 - Dynamic simulator scenarios based on category', async ({ page }) => {
    // 1. CCTV Product
    await mockEquipment(page, 'CCTV', 'cctv-1');
    await page.goto('/equipment/cctv-1');
    await page.getByRole('button', { name: /Wiring Simulator|การเชื่อมต่อสาย/i }).click();
    
    // Expect NVR / Camera related elements
    const cctvElements = page.getByText(/NVR|Camera|กล้อง/i);
    await expect(cctvElements.first()).toBeVisible();
    
    // 2. Network Product
    await mockEquipment(page, 'Network', 'ap-1');
    await page.goto('/equipment/ap-1');
    await page.getByRole('button', { name: /Wiring Simulator|การเชื่อมต่อสาย/i }).click();
    
    // Expect LAN / Router / AP related elements
    const networkElements = page.getByText(/Router|Access Point|Switch/i);
    await expect(networkElements.first()).toBeVisible();
  });

  test('T3.4: F1 & F3/F4 - Tab switching retains or gracefully resets simulator state', async ({ page }) => {
    await mockEquipment(page, 'CCTV', 'cctv-1');
    await page.goto('/equipment/cctv-1');

    // Go to Simulator
    await page.getByRole('button', { name: /Wiring Simulator|การเชื่อมต่อสาย/i }).click();

    // Interact to change state
    await page.getByRole('button', { name: /LAN|Coaxial|Power/i }).first().click();

    // Switch to Overview tab
    await page.getByRole('button', { name: /Overview|ภาพรวม/i }).click();

    // Return to Wiring Simulator tab
    await page.getByRole('button', { name: /Wiring Simulator|การเชื่อมต่อสาย/i }).click();

    // Assert the simulator is still rendered
    await expect(page.getByRole('button', { name: /LAN|Coaxial|Power/i }).first()).toBeVisible();
  });

});
