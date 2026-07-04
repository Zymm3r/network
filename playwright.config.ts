import { defineConfig, devices } from '@playwright/test';
import * as path from 'path';

const AUTH_FILE = path.join('playwright', '.auth', 'user.json');

export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/global-setup',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 0,
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    storageState: AUTH_FILE,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: !process.env.CI,
  },
});
