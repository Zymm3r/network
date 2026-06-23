import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`BROWSER CONSOLE: ${msg.text()}`);
  });

  page.on('pageerror', err => console.log(`BROWSER ERROR: ${err.message}`));

  // Wait for the dev server to be ready
  try {
    await page.goto('http://localhost:5173/equipment/access-point-reyee-wi-fi-6-rg-rap62', { waitUntil: 'networkidle', timeout: 10000 });
    console.log('Page loaded!');
    
    // Wait a bit to ensure data is fetched
    await page.waitForTimeout(3000);
    
    // Evaluate DOM
    const errorText = await page.evaluate(() => {
        const overlay = document.querySelector('vite-error-overlay');
        return overlay ? overlay.shadowRoot?.innerHTML || 'Has overlay but no shadowRoot' : 'No overlay';
    });
    console.log('Vite Error:', errorText);

    await page.screenshot({ path: 'C:/Users/UTHtest/.gemini/antigravity/brain/aaa40808-5c24-4f3b-b39e-eb714ceb4900/screenshot2.jpg', fullPage: true });
    console.log('Screenshot saved to artifact dir!');
    
  } catch (e) {
    console.error('Failed to load page:', e.message);
  } finally {
    await browser.close();
  }
})();
