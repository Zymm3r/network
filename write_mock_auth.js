const fs = require('fs');
const path = require('path');

const projectUrl = 'https://netvfzmdewatfnmejcrz.supabase.co';
const host = new URL(projectUrl).hostname.split('.')[0];
const storageKey = `sb-${host}-auth-token`;

const header = {
  alg: 'HS256',
  typ: 'JWT'
};

const payload = {
  exp: Math.floor(Date.now() / 1000) + 10 * 365 * 24 * 60 * 60, // 10 years expiration
  sub: '00000000-0000-0000-0000-000000000000',
  email: 'test@example.com',
  app_metadata: {
    provider: 'email',
    providers: ['email']
  },
  user_metadata: {
    full_name_th: 'ผู้ทดสอบระบบ',
    full_name_en: 'System Tester',
    role: 'student'
  },
  role: 'authenticated',
  aal: 'aal1',
  amr: [
    {
      method: 'password',
      timestamp: Math.floor(Date.now() / 1000)
    }
  ],
  session_id: '00000000-0000-0000-0000-000000000000'
};

function base64url(json) {
  const str = JSON.stringify(json);
  return Buffer.from(str).toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

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
    app_metadata: {
      provider: 'email',
      providers: ['email']
    },
    user_metadata: {
      full_name_th: 'ผู้ทดสอบระบบ',
      full_name_en: 'System Tester',
      role: 'student'
    },
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
        }
      ]
    }
  ]
};

const authDir = path.join(__dirname, 'playwright', '.auth');
if (!fs.existsSync(authDir)) {
  fs.mkdirSync(authDir, { recursive: true });
}
const authFile = path.join(authDir, 'user.json');
fs.writeFileSync(authFile, JSON.stringify(storageState, null, 2));
console.log(`Mock storageState successfully written to ${authFile}`);
