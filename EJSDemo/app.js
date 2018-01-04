var express = require('express');
var app = express();

//search from public folder for css files
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render('home.ejs');

});

app.get("/posts", function(req, res) {

  var posts = [{
    title: "",
    author: ""
  }, {
    title: "",
    author: ""
  }, {
    title: "",
    author: ""
  }];

  res.render('posts.ejs', {
    posts: posts
  });

});

app.get("/fellinlovewith/:animal", function(req, res) {

  res.render('dog.ejs', {
    thingVar: req.params.animal
  });

});
app.listen(3000, function() {
  console.log('server started');
});
