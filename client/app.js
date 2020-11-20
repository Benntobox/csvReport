const http = require('http');

const options = {
  host: '127.0.0.1',
  port: 3000,
  path: '/'
};

// Make a request
const req = http.request(options);
req.end();

req.on('information', (info) => {
  console.log(`Got information prior to main response: ${info.statusCode}`);
});