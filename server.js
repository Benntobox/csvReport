var express = require('express');
var app = express();
var bodyparser = require('body-parser');
const port = 3000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('client'));

app.get('/', (req, res) => {
  console.log('Getting', req.body);
});

app.post('/', (req, res) => {
  console.log('Form was posted');
  console.log(req.body['data']);
  res.status(200).location('/');
});

app.listen(port, () => console.log('Listening!'));