var express = require('express');
var app = express();
var bodyparser = require('body-parser');
const port = 3000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static('client'));

app.get('/', (req, res, next) => {
  console.log('Getting', req.body);
  res.status(200).location('/');
  res.end();
});

app.post('/', (req, res, next) => {
  console.log('Form was posted');
  console.log(req.body['data']);
  res.status(200).json(jsonToCsv(req.body['data']));
  res.end();
});

var jsonToCsv = function (data) {
  let headers = "";
  let values = "";
  console.log('preflat', JSON.parse(data))
  data = flattenJson(JSON.parse(data));
  console.log('flattened', data)
  for (let key in data) {
    headers += headers ? ',' + key : key;
    values += values ? ',' + data[key] : data[key];
  }
  console.log('headers', headers)
  console.log('values', values)
  return headers + '\n' + values;
}

var flattenJson = function (data, results={}, parent=null) {
  for (let key in data) {
    if (typeof(data[key]) === 'object') {
      flattenJson(data[key], results, key)
    } else {
      combined = parent ? parent + "." + key : key;
      results[combined] = data[key];
    }
  }
  return results;
}

app.listen(port, () => console.log('Listening!'));