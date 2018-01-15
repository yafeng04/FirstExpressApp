var Campground = require('../models/campground');
var Comment = require('../models/comment');
//all the middlewares
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership=function(req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
                if (err) {
                    req.flash("error", "Campground not found");
                    res.redirect("back");
                } else {
    
                    if(foundCampground.author._id.equals(req.user._id)){
                     next();
                    }
                    else{
                        req.flash("error", "U dont have permission to do that");
                        res.redirect('back');
                    }
                }
            });
        }
        else{
            req.flash("error", "Log in first");
            res.redirect('back');
        }
    }

middlewareObj.checkCommentOwnership= function(req, res, next){
    //check if user is logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if (err) {
                res.redirect("back");
            } else {
                if(foundComment.author._id.equals(req.user._id)){
                 next();
                }
                else{
                    res.redirect('back');
                }
            }
        });
    }
    else{
        res.redirect('back');
    }
}
middlewareObj.isLoggedIn=function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Log in first");
    res.redirect('/login');
}

module.exports = middlewareObj;
