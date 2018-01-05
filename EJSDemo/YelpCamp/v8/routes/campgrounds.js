var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');


router.get('/new', isLoggedIn, function (req, res) {

    res.render("campgrounds/new.ejs");

});

//show more info about one campground
router.get('/:id', function (req, res) {

    Campground.findById(req.params.id).populate('comments').exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log(foundCampground);
            //look for this file in the views folder
            res.render('campgrounds/show', {
                campground: foundCampground
            });
        }
    });
});


//index page
router.get("/", function (req, res) {

    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds,
                currentUser: req.user
            });
        }
    });

    // res.render('campgrounds', {
    //   campgrounds: campgrounds
    // });

});

router.post('/', isLoggedIn, function (req, res) {
    //get data from form and redirect back to campground page
    // res.send("u hit the post page");
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };

    var newCampground = {
        name: name,
        image: image,
        description: desc,
        //only need id to associate
        author: author
    };

    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }

    });

});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

module.exports = router;