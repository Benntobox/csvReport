var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var fs = require('fs')
const port = 3000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('client'));

app.get('/', (req, res, next) => {
  console.log('Getting', req.body);
  res.status(200).location('/');
  res.end();
  next()
});

app.post('/', (req, res, next) => {
  console.log('Form was posted');
  fs.readFile(req.body['data'], (err, data) => {
    if (err) { 
      res.status(404); 
      res.end(); 
      next(); 
    } else { 
      res.setHeader('Content-type','text/html');
      res.send(formHtml + jsonToCsv(data.toString()));
      res.end();
      next();
     }
  });
});

var jsonToCsv = function (data) {
  data = JSON.parse(data);
  let headers = "";
  for (let key in data) {
    if (key !== 'children') {
      headers += headers ? ',' + key : key;
    }
  }
  let values = getValuesRecursive(data);
  return headers + '\n' + values;
}

var getValuesRecursive = function (data) {
  let values = "";
  for (let key in data) {
    if (key !== 'children') { 
      values += values ? ',' + data[key] : data[key];
    } else {
      for (let child of data['children']) {
        values += '\n'
        values = values.concat(getValuesRecursive(child))
      }
    }
  }
  return values;
}

var formHtml = `<form method='POST' id='entryForm'>
<input type='file' name='data' value='Choose a file'></textarea>
<input type='submit' value='Submit'></input>
</form>`

app.listen(port, () => console.log('Listening!'));
