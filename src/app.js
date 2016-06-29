var express = require('express');
var router  = require('./api');

require('./database.js');

var app = express();

app.use('/', express.static('public'));
app.use('/api', router);

app.get('*', function(req, res) {
  res.send(404, '404 Not found');
});

app.listen(3000, function() {
  console.log('The server is listening on port 3000...');
});
