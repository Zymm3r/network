import { test, expect } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

let sessionData: any = null;

test.beforeAll(async () => {
  // Create a new test user to get a fresh session
  const email = `test_${Date.now()}@example.com`;
  const password = 'testpassword123';
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(`Failed to create test user: ${error.message}`);
  }
  
  sessionData = data.session;
  console.log(`Created test user: ${email}`);
});

test.describe('Runtime Verification Crawler', () => {
  test('Crawl all required pages and verify runtime stability', async ({ page }) => {
    const errors: string[] = [];
    
    // Listen for runtime errors
    page.on('pageerror', err => {
      errors.push(`[Page Error] ${err.message}`);
    });

    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Ignore benign warnings that React/Vite sometimes output as errors
        if (text.includes('Failed to load resource: the server responded with a status of 400')) return; // We might want to see 400s? Actually let's just log them.
        errors.push(`[Console Error] ${text}`);
      }
    });

    const failedRequests: string[] = [];
    page.on('response', response => {
      // Ignore 4xx and 5xx from 3rd party scripts, only care about our app and API
      if (response.status() >= 400) {
        // Exclude specific known acceptable failures or analytics tracking if needed
        failedRequests.push(`[Network Failure] ${response.status()} on ${response.url()}`);
      }
    });

    // Inject session
    await page.addInitScript((sessionStr) => {
      // Extract project ref from URL (e.g. netvfzmdewatfnmejcrz)
      const projectRef = 'netvfzmdewatfnmejcrz'; // Hardcoded for simplicity based on env
      window.localStorage.setItem(`sb-${projectRef}-auth-token`, sessionStr);
    }, JSON.stringify(sessionData));

    // Array of routes to verify
    const routesToTest = [
      '/',
      '/dashboard',
      '/equipment',
      '/courses',
      '/paths',
      '/resources',
      '/profile',
    ];

    for (const route of routesToTest) {
      console.log(`Visiting: ${route}`);
      await page.goto(route);
      await page.waitForLoadState('networkidle');
      
      // Check for broken images
      const brokenImages = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img'))
          .filter(img => !img.complete || img.naturalWidth === 0)
          .map(img => img.src);
      });

      if (brokenImages.length > 0) {
        errors.push(`[Broken Images on ${route}]: ${brokenImages.join(', ')}`);
      }
    }

    // Now let's try to extract dynamic links and visit them
    console.log('Extracting and visiting dynamic routes...');

    // 1. Visit a Course
    await page.goto('/courses');
    await page.waitForLoadState('networkidle');
    const courseLink = await page.locator('a[href^="/courses/"]').first().getAttribute('href');
    if (courseLink) {
      console.log(`Visiting Course: ${courseLink}`);
      await page.goto(courseLink);
      await page.waitForLoadState('networkidle');
      
      // 2. Visit a Lesson from inside the course
      const lessonLink = await page.locator('a[href^="/lessons/"]').first().getAttribute('href');
      if (lessonLink) {
        console.log(`Visiting Lesson: ${lessonLink}`);
        await page.goto(lessonLink);
        await page.waitForLoadState('networkidle');
        
        // Wait a bit for Pyodide to load and check if it throws
        await page.waitForTimeout(3000);
      }
    }

    // 3. Visit an Equipment Detail
    await page.goto('/equipment');
    await page.waitForLoadState('networkidle');
    const equipLink = await page.locator('a[href^="/equipment/"]').first().getAttribute('href');
    if (equipLink) {
      console.log(`Visiting Equipment: ${equipLink}`);
      await page.goto(equipLink);
      await page.waitForLoadState('networkidle');
    }

    // 4. Visit a Learning Path
    await page.goto('/paths');
    await page.waitForLoadState('networkidle');
    const pathLink = await page.locator('a[href^="/paths/"]').first().getAttribute('href');
    if (pathLink) {
      console.log(`Visiting Path: ${pathLink}`);
      await page.goto(pathLink);
      await page.waitForLoadState('networkidle');
    }

    // Output all collected issues
    const allIssues = [...errors, ...failedRequests];
    if (allIssues.length > 0) {
      console.log('--- ISSUES FOUND ---');
      allIssues.forEach(i => console.log(i));
      throw new Error(`Found ${allIssues.length} issues during runtime verification.`);
    } else {
      console.log('All pages verified successfully. No issues found.');
    }
  });
});
