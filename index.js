var express     = require('express');
var bodyParser  = require('body-parser');
var app         = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function(request, response) {
  response.send('GET request to the homepage');
});

app.post("/save", function(request, response) {
  response.send('POST request to the homepage');
  console.log(request.body);
});

app.listen(8000, function() {
  console.log("Server up and running at port 8000...");
});
