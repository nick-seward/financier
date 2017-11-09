var path = require('path');
var express = require('express');
var proxy = require('express-http-proxy');
var app = express();

app.use('/docs', express.static(path.join(__dirname, '../docs')));

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/db', proxy('127.0.0.1:5984'));

// html5mode
app.all('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(8080, function () {
  console.log('Financier frontend listening on port 8080!!!');
});
