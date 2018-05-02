var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

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



router.post("/campgrounds", function(req,res){
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(error,newlyCreated){
        if(error){
            console.log(error)
        }
        else{
            res.redirect("/campgrounds");
        }
    })
});

router.get("/campgrounds/new", function(req,res){
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

module.exports = router;