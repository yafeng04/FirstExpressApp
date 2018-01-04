var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var campgrounds = [{
  name: "aa",
  image: "https://i.imgur.com/fXJ2ofJ.jpg"
}, {
  name: "bb",
  image: "https://i.imgur.com/fXJ2ofJ.jpg"
}, {
  name: "cc",
  image: "https://i.imgur.com/fXJ2ofJ.jpg"
}];
app.use(bodyParser.urlencoded({
  extended: true
}));


app.set('view engine', 'ejs');

app.get("/", function(req, res) {

  res.render('landing');

});

app.get('/campgrounds/new', function(req, res) {
  res.render("new.ejs");
});

app.get("/campgrounds", function(req, res) {

  res.render('campgrounds', {
    campgrounds: campgrounds
  });

});

app.post('/campgrounds', function(req, res) {
  //get data from form and redirect back to campground page
  // res.send("u hit the post page");
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {
    name: name,
    image: image
  };
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");

});


app.listen(3000, function() {
  console.log('server started');
});
