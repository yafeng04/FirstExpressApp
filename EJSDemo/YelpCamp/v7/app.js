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

//requiring routes
var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');

//create database even from the following line
//127.0.0.1:27017
mongoose.connect("mongodb://localhost/yelp_camp_v6");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
//seed the database
// seedDB();

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

app.use(commentRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', indexRoutes);

app.listen(3000, function () {
    console.log('server started');
});
