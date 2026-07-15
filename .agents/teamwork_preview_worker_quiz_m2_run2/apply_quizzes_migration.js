import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const url = 'https://mcp.supabase.com/mcp?project_ref=netvfzmdewatfnmejcrz';
const token = 'sbp_oauth_0e6d95b00abf9a6037096eebc96aca3be4a95ab7';
const migrationPath = 'C:\\Users\\UTHtest\\.gemini\\antigravity\\worktrees\\network\\fix-lesson-completion-logic\\supabase\\migrations\\20260714073717_backfill_lesson_quizzes.sql';

const parsedUrl = new URL(url);

// Helper function to make HTTPS requests
function makeRequest(pathAndQuery, method, headers, postData) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: parsedUrl.hostname,
      path: pathAndQuery,
      method: method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json, text/event-stream',
        ...headers
      }
    };

    if (postData) {
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, headers: res.headers, body: data }));
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

// Function to execute SQL query on MCP
async function executeSql(pathAndQuery, sessionId, sqlQuery) {
  const callData = JSON.stringify({
    jsonrpc: "2.0",
    id: Math.floor(Math.random() * 1000000),
    method: "tools/call",
    params: {
      name: "execute_sql",
      arguments: {
        query: sqlQuery
      }
    }
  });

  const res = await makeRequest(pathAndQuery, 'POST', { 'Mcp-Session-Id': sessionId }, callData);
  if (res.statusCode !== 200) {
    throw new Error(`HTTP ${res.statusCode} from MCP: ${res.body}`);
  }
  
  const parsed = JSON.parse(res.body);
  if (parsed.error) {
    throw new Error(`RPC Error: ${JSON.stringify(parsed.error)}`);
  }
  
  const resultText = parsed.result.content[0].text;
  if (resultText.includes('"error"')) {
    throw new Error(`SQL Execution Error: ${resultText}`);
  }
  
  return resultText;
}

async function main() {
  try {
    const pathAndQuery = parsedUrl.pathname + parsedUrl.search;

    console.log('Reading migration SQL file...');
    const sqlContent = fs.readFileSync(migrationPath, 'utf8');

    // Split SQL by double newlines or by UPDATE statements
    // We filter out comments and empty statements
    const rawStatements = sqlContent.split(/UPDATE public\.lessons/);
    const statements = [];
    
    for (const raw of rawStatements) {
      const trimmed = raw.trim();
      if (!trimmed || trimmed.startsWith('--')) {
        continue;
      }
      statements.push(`UPDATE public.lessons ` + trimmed);
    }

    console.log(`Parsed ${statements.length} UPDATE statements from migration file.`);

    if (statements.length === 0) {
      console.error('No SQL statements found in migration file.');
      return;
    }

    // Initialize session
    console.log('Initializing MCP session...');
    const initData = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: {
          name: "migration-client",
          version: "1.0.0"
        }
      }
    });

    const initRes = await makeRequest(pathAndQuery, 'POST', {}, initData);
    const sessionId = initRes.headers['mcp-session-id'];
    
    if (!sessionId) {
      console.error('Failed to acquire MCP session ID.');
      console.log('Body:', initRes.body);
      return;
    }
    console.log('Session initialized successfully.');

    // Send initialized notification
    const initializedNotification = JSON.stringify({
      jsonrpc: "2.0",
      method: "notifications/initialized"
    });
    await makeRequest(pathAndQuery, 'POST', { 'Mcp-Session-Id': sessionId }, initializedNotification);

    // Batch statements (10 statements per batch)
    const batchSize = 10;
    const batches = [];
    for (let i = 0; i < statements.length; i += batchSize) {
      batches.push(statements.slice(i, i + batchSize).join('\n'));
    }

    console.log(`Executing ${batches.length} batches of updates...`);

    for (let i = 0; i < batches.length; i++) {
      console.log(`Running batch ${i + 1}/${batches.length} (${statements.slice(i * batchSize, (i + 1) * batchSize).length} statements)...`);
      const result = await executeSql(pathAndQuery, sessionId, batches[i]);
      console.log(`Batch ${i + 1} completed.`);
    }

    console.log('Migration statements executed successfully. Running verification query...');
    const verifyQuery = "SELECT count(*) FROM public.lessons WHERE quiz_data IS NOT NULL;";
    const verifyResult = await executeSql(pathAndQuery, sessionId, verifyQuery);
    console.log('Verification Result:', verifyResult);
  } catch (err) {
    console.error('Migration failed:', err.message);
  }
}

main();
