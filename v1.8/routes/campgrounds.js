var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/campgrounds", function(req,res){
    Campground.find({}, function(error,allCampgrounds){
       if(error){
           console.log(error)
       } 
       else{
       res.render("campgrounds/index",{campgrounds:allCampgrounds});           
       }
    });
});



router.post("/campgrounds",middleware.isLoggedIn, function(req,res){
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   }
   var newCampground = {name: name, image: image, description: desc, author: author} 
   console.log(req.user);
    Campground.create(newCampground, function(error,newlyCreated){
        if(error){
            console.log(error)
        }
        else{
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    })
});

router.get("/campgrounds/new",middleware.isLoggedIn, function(req,res){
    res.render("campgrounds/new");
});

//show
router.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(error,foundCampground){
        if(error){
            console.log(error)
        }
        else{
                res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//edit route
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(error, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

//update route
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(error, updatedCampground){
        if(error){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//delete route
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(error){
        if(error){
            res.redirect("/campgrounds");
        }
        else{
            res.redirect("/campgrounds");
        }
    });
});




module.exports = router;