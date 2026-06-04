const https = require('https');
const url = 'https://www.youtube.com/watch?v=qiQR5rTSshw';
https.get(url, (res) => {
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
