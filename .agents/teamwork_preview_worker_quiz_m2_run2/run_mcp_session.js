import https from 'https';

const url = 'https://mcp.supabase.com/mcp?project_ref=netvfzmdewatfnmejcrz';
const token = 'sbp_oauth_0e6d95b00abf9a6037096eebc96aca3be4a95ab7';

const parsedUrl = new URL(url);

// Helper function to make requests
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

async function main() {
  try {
    const pathAndQuery = parsedUrl.pathname + parsedUrl.search;
    
    console.log('1. Initializing MCP Session...');
    const initData = JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2024-11-05",
        capabilities: {},
        clientInfo: {
          name: "subagent-client",
          version: "1.0.0"
        }
      }
    });

    const initRes = await makeRequest(pathAndQuery, 'POST', {}, initData);
    console.log('Init Status:', initRes.statusCode);
    
    const sessionId = initRes.headers['mcp-session-id'];
    console.log('Session ID:', sessionId);

    if (!sessionId) {
      console.error('Failed to get Mcp-Session-Id header.');
      console.log('Response Body:', initRes.body);
      return;
    }

    console.log('2. Sending initialized notification...');
    const initializedNotification = JSON.stringify({
      jsonrpc: "2.0",
      method: "notifications/initialized"
    });
    
    await makeRequest(pathAndQuery, 'POST', { 'Mcp-Session-Id': sessionId }, initializedNotification);

    console.log('3. Executing SQL query...');
    const callData = JSON.stringify({
      jsonrpc: "2.0",
      id: 2,
      method: "tools/call",
      params: {
        name: "execute_sql",
        arguments: {
          query: "SELECT count(*) FROM public.lessons;"
        }
      }
    });

    const callRes = await makeRequest(pathAndQuery, 'POST', { 'Mcp-Session-Id': sessionId }, callData);
    console.log('SQL Call Status:', callRes.statusCode);
    console.log('SQL Response Body:', callRes.body);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();
