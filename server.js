// server.js
var compression = require('compression');
var cors = require('cors');
var express = require('express');

var auth = require('./auth');

var app = express();

var port = process.env.PORT || 8080;

// compress our client side content before sending it over the wire
app.use(compression());

// your manifest must have appropriate CORS headers, you could also use '*'
app.use(cors({ origin: 'https://trello.com' }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/public'));

app.use('/auth', auth);

app.get('/dummy', function(req, res) {
  res.write("<html><body><h1>hey yo</h1></body></html>");
  res.end();
});

// listen for requests :)
app.listen(port, function () {
  console.info(`Node Version: ${process.version}`);
  console.log('Trello Power-Up Server listening on port ' + port);
});