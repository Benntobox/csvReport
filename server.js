var express = require('express');
var app = express();
var path = require('path');
const port = 3000;

app.use(express.static('client'));

app.post('/', (req, res) => {
  console.log('Form was posted');
  console.log(req.body)
  console.log(res.body)
  res.status(200).json(req.json);
});

app.listen(port, () => console.log('Listening!'));