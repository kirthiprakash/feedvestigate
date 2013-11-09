var express = require("express");
var Facebook = require('facebook-node-sdk');

var app = express();
app.use(express.logger());


app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'foo bar' }));
  app.use(Facebook.middleware({ appId: '666840666680350', secret: 'c7a45ca8bd121cd3a543ece4b7bf4dc9'}));
});

app.get('/lo', Facebook.loginRequired({scope:'read_stream'}), function (req, res) {
  req.facebook.api('/me?fields=feed', function(err, user) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, ' + JSON.stringify(user) + '!'); });
});

app.get('/', function(request, response) {
  d = {hello :'3', hi :'4'}
  console.log(JSON.stringify(d))
  response.send('Hello World!');
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
