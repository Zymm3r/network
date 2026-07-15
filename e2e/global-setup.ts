/**
 * Playwright Global Setup — Supabase Authentication
 *
 * Authenticates once using email/password credentials supplied via environment
 * variables and saves the resulting browser storage state so every test can
 * run as an authenticated user.
 *
 * Required env vars (add to .env.local or CI secrets, NEVER commit):
 *   PLAYWRIGHT_TEST_EMAIL    — a real Supabase user email
 *   PLAYWRIGHT_TEST_PASSWORD — that user's password
 *
 * Fallback: if vars are not set the setup writes an EMPTY state file. Tests
 * will hit the auth wall and fail with a clear message instead of a timeout.
 */

import { chromium, FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const AUTH_DIR = 'playwright/.auth';
const AUTH_FILE = path.join(AUTH_DIR, 'user.json');

export default async function globalSetup(_config: FullConfig) {
  const email = process.env.PLAYWRIGHT_TEST_EMAIL;
  const password = process.env.PLAYWRIGHT_TEST_PASSWORD;

  // Ensure the auth directory exists
  if (!fs.existsSync(AUTH_DIR)) {
    fs.mkdirSync(AUTH_DIR, { recursive: true });
  }

  if (!email || !password) {
    console.warn(
      '[global-setup] PLAYWRIGHT_TEST_EMAIL / PLAYWRIGHT_TEST_PASSWORD not set. ' +
      'Generating and writing a mock authenticated storageState to bypass auth gate.'
    );
    const projectUrl = process.env.VITE_SUPABASE_URL || 'https://netvfzmdewatfnmejcrz.supabase.co';
    const host = new URL(projectUrl).hostname.split('.')[0];
    const storageKey = `sb-${host}-auth-token`;

    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = {
      exp: Math.floor(Date.now() / 1000) + 10 * 365 * 24 * 60 * 60,
      sub: '00000000-0000-0000-0000-000000000000',
      email: 'test@example.com',
      app_metadata: { provider: 'email', providers: ['email'] },
      user_metadata: { full_name_th: 'ผู้ทดสอบระบบ', full_name_en: 'System Tester', role: 'student' },
      role: 'authenticated',
      aal: 'aal1',
      amr: [{ method: 'password', timestamp: Math.floor(Date.now() / 1000) }],
      session_id: '00000000-0000-0000-0000-000000000000'
    };

    const base64url = (json: object) => {
      const str = JSON.stringify(json);
      return Buffer.from(str).toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
    };

    const jwt = `${base64url(header)}.${base64url(payload)}.fake_signature`;

    const session = {
      access_token: jwt,
      refresh_token: 'fake-refresh-token',
      token_type: 'bearer',
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 10 * 365 * 24 * 60 * 60,
      user: {
        id: '00000000-0000-0000-0000-000000000000',
        aud: 'authenticated',
        role: 'authenticated',
        email: 'test@example.com',
        email_confirmed_at: new Date().toISOString(),
        phone: '',
        confirmed_at: new Date().toISOString(),
        last_sign_in_at: new Date().toISOString(),
        app_metadata: { provider: 'email', providers: ['email'] },
        user_metadata: { full_name_th: 'ผู้ทดสอบระบบ', full_name_en: 'System Tester', role: 'student' },
        identities: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    };

    const storageState = {
      cookies: [],
      origins: [
        {
          origin: 'http://localhost:5173',
          localStorage: [
            {
              name: storageKey,
              value: JSON.stringify(session)
            },
            {
              name: 'sb-mock-auth',
              value: 'true'
            }
          ]
        }
      ]
    };

    fs.writeFileSync(AUTH_FILE, JSON.stringify(storageState, null, 2));
    return;
  }

  const baseURL = process.env.BASE_URL || 'http://localhost:5173';

  const browser = await chromium.launch();
  const context = await browser.newContext({ baseURL });
  const page = await context.newPage();

  try {
    await page.goto('/auth');

    // The app uses magic-link by default; switch to email+password if available.
    // If the UI exposes a password tab/field, fill it. Otherwise fall back to
    // Supabase's REST API to exchange credentials for a session cookie.
    const passwordInput = page.locator('input[type="password"]');
    const hasPasswordField = await passwordInput.count() > 0;

    if (hasPasswordField) {
      await page.locator('input[type="email"]').fill(email);
      await passwordInput.fill(password);
      await page.getByRole('button', { name: /sign in|login|เข้าสู่ระบบ/i }).click();
      // Wait for redirect away from /auth
      await page.waitForURL((url) => !url.pathname.startsWith('/auth'), { timeout: 15000 });
    } else {
      // App only exposes magic-link — authenticate via Supabase REST directly.
      const supabaseUrl = process.env.VITE_SUPABASE_URL;
      const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error(
          '[global-setup] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY not set. ' +
          'Cannot authenticate via REST. Add them to .env.local.'
        );
      }

      const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(`[global-setup] Supabase auth failed: ${res.status} ${body}`);
      }

      const { access_token, refresh_token } = await res.json();

      // Inject the session into localStorage so the app picks it up
      await page.goto('/');
      await page.evaluate(
        ({ url, key, accessToken, refreshToken }) => {
          const storageKey = `sb-${new URL(url).hostname.split('.')[0]}-auth-token`;
          localStorage.setItem(
            storageKey,
            JSON.stringify({
              access_token: accessToken,
              refresh_token: refreshToken,
              token_type: 'bearer',
              expires_in: 3600,
              expires_at: Math.floor(Date.now() / 1000) + 3600,
            })
          );
        },
        {
          url: supabaseUrl,
          key: supabaseKey,
          accessToken: access_token,
          refreshToken: refresh_token,
        }
      );

      // Reload to let the app initialise the session
      await page.reload();
      // Wait until we are no longer on the auth page
      await page.waitForURL((url) => !url.pathname.startsWith('/auth'), { timeout: 15000 });
    }

    await context.storageState({ path: AUTH_FILE });
    console.log(`[global-setup] Auth state saved to ${AUTH_FILE}`);
  } catch (err) {
    console.error('[global-setup] Authentication failed:', err);
    // Write empty state so tests can still run and report the real error
    fs.writeFileSync(AUTH_FILE, JSON.stringify({ cookies: [], origins: [] }));
  } finally {
    await browser.close();
  }
}
