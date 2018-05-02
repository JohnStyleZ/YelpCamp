var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds");
    
seedDB();

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({entended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//passport confi
app.use(require("express-session")({
    secret: "yelpcamp",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res, next){
    res.locals.currentUser = req.user;
    next();
});


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

app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(error, campground){
        if(error){
            console.log(error);
        }
        else{
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments",isLoggedIn, function(req, res){
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

//auth route
app.get("/register", function(req, res) {
    res.render("register");
})

app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(error, user){
        if(error){
            console.log(error);
            return res.render("register");
        }
        
        passport.authenticate("local")(req,req, function(){
            res.redirect("/campgrounds");
        });
    });
});

//login route
app.get("/login", function(req, res) {
    res.render("login");
})

app.post("/login",passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

//logout route
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
})

function isLoggedIn(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
app.listen(process.env.PORT,process.envIP, function(){
    console.log("Server has started");
});