import https from 'https';
import fs from 'fs';

const url = 'https://mcp.supabase.com/mcp?project_ref=netvfzmdewatfnmejcrz';
const token = 'sbp_oauth_0e6d95b00abf9a6037096eebc96aca3be4a95ab7';

const postData = JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "tools/call",
  params: {
    name: "execute_sql",
    arguments: {
      project_id: "netvfzmdewatfnmejcrz",
      query: "SELECT count(*) FROM public.lessons;"
    }
  }
});

const parsedUrl = new URL(url);

const options = {
  hostname: parsedUrl.hostname,
  path: parsedUrl.pathname + parsedUrl.search,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('Sending request to Supabase MCP server...');

const req = https.request(options, (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);

  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('Response body:', data);
  });
});

req.on('error', (e) => {
  console.error('Problem with request:', e.message);
});

req.write(postData);
req.end();
