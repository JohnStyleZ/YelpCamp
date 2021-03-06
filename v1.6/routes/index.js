var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/" , function(req,res){
    res.render("landing");
});
//auth route
router.get("/register", function(req, res) {
    res.render("register");
})

router.post("/register", function(req, res) {
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
router.get("/login", function(req, res) {
    res.render("login");
})

router.post("/login",passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

//logout route
router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/campgrounds");
})

function isLoggedIn(req,res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


module.exports = router;