import https from 'https';

console.log('Testing connection to mcp.supabase.com...');
https.get('https://mcp.supabase.com/mcp', (res) => {
  console.log('Response Status:', res.statusCode);
  console.log('Response Headers:', res.headers);
}).on('error', (err) => {
  console.error('Error connecting:', err.message);
});
