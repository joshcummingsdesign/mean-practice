var express = require('express');
var parser  = require('body-parser');
var router  = require('./api');

var app = express();

require('./database');

app.use('/', express.static('public'));
app.use(parser.json());

app.use('/api', router);

app.get('*', function(req, res) {
  res.status(404).send('404 Not Found');
});

app.listen(3000, function() {
  console.log('The server is listening on port 3000...');
});
