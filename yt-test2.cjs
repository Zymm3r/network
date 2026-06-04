const https = require('https');
const url = 'https://www.youtube.com/watch?v=L-T3oK9-XG0';
https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  console.log('Status Code:', res.statusCode);
  let data = '';
  res.on('data', d => data += d);
  res.on('end', () => {
    const match = data.match(/"lengthSeconds":"(\d+)"/);
    if (match) {
      console.log('Duration in seconds:', match[1]);
      console.log('Duration in minutes:', Math.ceil(parseInt(match[1]) / 60));
    } else {
      console.log('Not found');
    }
  });
});
