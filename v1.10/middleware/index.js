var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(error, foundCampground) {
            if(error){
                req.flash("error", "Campground not found!");
                res.redirect("back");
            }
            else{
                console.log(foundCampground.author.id);
                console.log(req.user._id);
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "You do not have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}    


middlewareObj.checkCommentOwnership = function(req,res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(error, foundComments) {
            if(error){
                req.flash("error", "Comment not found!");
                res.redirect("back");
            }
            else{
                console.log(foundComments.author.id);
                console.log(req.user._id);
                if(foundComments.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "You do not have permission to do that!");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
}

module.exports = middlewareObj;