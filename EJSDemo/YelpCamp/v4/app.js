var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express(),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    seedDB = require('./seeds');



//create database even from the following line
//127.0.0.1:27017
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
seedDB();
// Campground.create({
//   name: "lt",
//   image: "http://p2.cri.cn/M00/43/E5/CqgNOlcZ3_CAazg-AAAAAAAAAAA076.500x845.jpg",
//   description: "nice looking liutao"

// }, function(err, campground) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('newly created CampGround');
//     console.log(campground);
//   }
// });


app.get("/", function (req, res) {

    res.render('landing');

});

app.get('/campgrounds/new', function (req, res) {

    res.render("campgrounds/new.ejs");

});

//show more info about one campground
app.get('/campgrounds/:id', function (req, res) {

    Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            res.render('campgrounds/show', {
                campground: foundCampground
            });
        }
    });
});


//index page
app.get("/campgrounds", function (req, res) {

    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds
            });
        }
    });

    // res.render('campgrounds', {
    //   campgrounds: campgrounds
    // });

});

app.post('/campgrounds', function (req, res) {
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

    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }

    });

});


// =============
//COMMENTS ROUTES
// =============

app.get("/campgrounds/:id/comments/new", function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {

        if (err) console.log(err);
        else res.render('comments/new', {
            campground: campground
        });

    });

})


app.post('/campgrounds/:id/comments', function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {

        if (err) {
          console.log(err);
          res.redirect('/campgrounds');
        }
        else {
          Comment.create(req.body.comment, function(err, comment){
            if (err) {
              console.log(err);

            }
            else {
            campground.comments.push(comment);
            campground.save();
            res.redirect('/campgrounds/'+campground._id);

            }
          });
 
        }
    });
});

app.listen(3000, function () {
    console.log('server started');
});
