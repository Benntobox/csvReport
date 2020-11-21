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
  res.status(200).json(jsonToCsv(req.body['data']));
  res.end();
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