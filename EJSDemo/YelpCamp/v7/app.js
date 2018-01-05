var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express(),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    seedDB = require('./seeds'),
    passport = require('passport'),
    seedDB = require('passport-local'),
    User = require('./models/user'),
    LocalStrategy = require('passport-local');



//create database even from the following line
//127.0.0.1:27017
mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
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

//PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'Once again something is cutest',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//pass currentUser to all templates
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

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
            //look for this file in the views folder
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
                campgrounds: allCampgrounds,
                currentUser: req.user
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

app.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {
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

//AUTH ROUTES
//SHOW SIGNUP FORM
app.get('/register', function (req, res) {
    res.render('register');
});

//SHOW SIGNUP FORM
app.post('/register', function (req, res) {
    User.register(new User({
        username: req.body.username
    }), req.body.password, function (err, user) {

        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, function(){
            res.redirect('/campgrounds');
        });
    });

});

//LOGIN ROUTES
app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login'
}), function (req, res) {
    
});

//LOGOUT ROUTE
//LOGIN ROUTES
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/campgrounds');
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

app.listen(3000, function () {
    console.log('server started');
});
