var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  app = express();

//create database even from the following line
//127.0.0.1:27017
mongoose.connect("mongodb://localhost/yelp_camp");

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

Campground.create({
  name: "lt",
  image: "http://p2.cri.cn/M00/43/E5/CqgNOlcZ3_CAazg-AAAAAAAAAAA076.500x845.jpg",
  description: "nice looking liutao"

}, function(err, campground) {
  if (err) {
    console.log(err);
  } else {
    console.log('newly created CampGround');
    console.log(campground);
  }
});


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

//show more info about one campground
app.get('/campgrounds/:id', function(req, res) {

  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render('show', {
        campground: foundCampground
      });
    }
  });
});


//index page
app.get("/campgrounds", function(req, res) {

  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        campgrounds: allCampgrounds
      });
    }
  });

  // res.render('campgrounds', {
  //   campgrounds: campgrounds
  // });

});

app.post('/campgrounds', function(req, res) {
  //get data from form and redirect back to campground page
  // res.send("u hit the post page");
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {
    name: name,
    image: image,
    description: desc
  };

  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }

  });
  // res.redirect("/campgrounds");

});


app.listen(3000, function() {
  console.log('server started');
});
