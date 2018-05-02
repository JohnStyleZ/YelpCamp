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
    
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")
    
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

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

app.listen(process.env.PORT,process.envIP, function(){
    console.log("Server has started");
});