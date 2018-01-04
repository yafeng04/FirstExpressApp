var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

var friends = ["aa", "bb", "cc", "dd"];

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
  res.render("home");

});

app.get("/friends", function(req, res) {

  res.render("friends", {
    friends: friends
  });

});

app.post("/addfriend", function(req, res) {
  var newFriend = req.body.newfriend;

  friends.push(newFriend);
  // res.send("post route!!");
  res.redirect("/friends");

});


app.listen(3000, function() {
  console.log("server started");
});
