var express = require("express");
var app = express();
var bodyParser = require("body-parser")
;
app.use(bodyParser.urlencoded({entended: true}));
app.set("view engine", "ejs");

var campgrounds = [
       {name:"False Cape State Park", img:"http://s3.amazonaws.com/virginiablog/wp-content/uploads/2016/03/16115458/North-Bend-Park-Campground.jpg"},
       {name:"Acadia National Park", img:"http://beyondwords.life/wp-content/uploads/2017/06/shutterstock_448333891.jpg"},
       {name:"Finger Lakes", img:"http://www.perinton.org/files/Camping%20Picture.jpg"}
       ];

app.get("/" , function(req,res){
    res.render("landing");
});

app.get("/campgrounds", function(req,res){

       res.render("campgrounds",{campgrounds:campgrounds});
});



app.post("/campgrounds", function(req,res){
   var name = req.body.name;
   var image = req.body.image;
   var newCampground = {name: name, image: image};
   campgrounds.push(newCampground);
   res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req,res){
    res.render("new");
});

app.listen(process.env.PORT,process.envIP, function(){
    console.log("Server has started");
});