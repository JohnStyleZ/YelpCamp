var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds");
    
seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({entended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Campground.create(
//         {
//             name:"Finger Lakes", image:"http://www.perinton.org/files/Camping%20Picture.jpg"
//         },
//     function(error,campground){
//         if(error){
//             console.log(error)
//         }
//         else{
//             console.log("created new campground:")
//             console.log(campground);
//         }
//     }
//     );




app.get("/" , function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){
    Campground.find({}, function(error,allCampgrounds){
       if(error){
           console.log(error)
       } 
       else{
       res.render("campgrounds/index",{campgrounds:allCampgrounds});           
       }
    });
});



app.post("/campgrounds", function(req,res){
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

app.get("/campgrounds/new", function(req,res){
    res.render("campgrounds/new");
});

//show
app.get("/campgrounds/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(error,foundCampground){
        if(error){
            console.log(error)
        }
        else{
                res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

app.get("/campgrounds/:id/comments/new", function(req, res) {
    Campground.findById(req.params.id, function(error, campground){
        if(error){
            console.log(error);
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", function(req, res){
   Campground.findById(req.params.id, function(error, campground){
       if(error){
           console.log(error);
           res.redirect("/campgrounds");
       }
       else{
           Comment.create(req.body.comment, function(error, comment){
               if(error){
                   console.log(error);
               }
               else{
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect('/campgrounds/' + campground._id);
               }
           });
       }
   }); 
});
app.listen(process.env.PORT,process.envIP, function(){
    console.log("Server has started");
});