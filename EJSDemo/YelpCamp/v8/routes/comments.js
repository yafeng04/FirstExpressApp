var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

//comments new
router.get("/new", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, campground) {
        
        if (err) console.log(err);
        else res.render('comments/new', {
            campground: campground
        });

    });

})

//comments create
router.post('/', middleware.isLoggedIn, function (req, res) {
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
            //add username and id to comment
            comment.author.id = req.user._id;
            comment.author.username = req.user.username;
            //save comment
            comment.save();
            campground.comments.push(comment);
            campground.save();
            res.redirect('/campgrounds/'+campground._id);

            }
          });
 
        }
    });
});

//COMMENT EDIT ROUTE
router.get("/:comment_id",middleware.checkCommentOwnership,function(req, res){
    Comment.findById(comment_id, function(err, foundComment){
        if(err){
            res.redirect('back');
        }else{
            res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
        }
    });
    res.render('comments/edit', {campground_id: req.params.id});
});

//COMMENT UPDATE
router.put('/:comment_id',middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedCampground){
        if(err) res.redirect("back");
        else res.redirect('/campgrounds/'+req.params.id);
    });
});

//destroy comment ROUTE
router.delete('/:comment_id',middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) res.redirect('back');
        else res.redirect('/campgrounds/'+req.params.id);
    });
});

//middleware




module.exports = router;