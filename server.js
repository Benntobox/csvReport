var express = require('express');
var app = express();
var path = require('path');
var port = 3000;

app.use(express.static('client'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/', (req, res) => {

 })

app.listen(port, () => console.log('Listening in!'));