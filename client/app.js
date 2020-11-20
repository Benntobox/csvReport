const http = require('http');

const options = {
  host: 'localhost',
  port: 3000,
  path: '/'
};

// Make a request
const req = http.request(options);
req.end();

req.on('data', (data) => {
  console.log(`Got information prior to main response: ${data}`);
});