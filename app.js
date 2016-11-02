var express = require('express');
var app     = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({'extended': 'true'}));

app.get('/', function(req, res) {
  res.sendfile('./public/index.html');
});




app.listen(3000, function(){
  console.log("server is running on port 3000");
});
