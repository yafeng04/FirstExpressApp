var express = require('express');

var app = express();

app.get("/", function(req, res) {
  res.send('hi there');

});

app.get("/bye", function(req, res) {
  res.send('bye');
  console.log('some request sent');
});

app.get("/repeat/:greetings/:num", function(req, res) {

  var number = Number(req.params.num);
  // var number = parseInt(req.params.num);
  var message = req.params.greetings;
  var result = "";

  for (var i = 0; i < parseInt(number); i++) {
    result += message + " ";
  }
  res.send(result);
});


//shouldnt be at the very top
app.get("*", function(req, res) {
  res.send('u r a star');
});


app.listen(3000, function() {

  console.log('server started');
});

var http = require('http');
http.createServer()
