var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('client'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
  console.log(req.body);
  console.log('Using');
});

app.post('/', (req, res) => {
  console.log('STuff was posted');
  console.log(res.json());
  res.status(200).json(req.json);
});

module.exports = app;