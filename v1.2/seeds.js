var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    
var data = [
    {
        name: "False Cape State Park",
        image: "http://s3.amazonaws.com/virginiablog/wp-content/uploads/2016/03/16115458/North-Bend-Park-Campground.jpg",
        description: "aaecsdkjoijss  ergsg srgsgc"
    },
    {
        name: "Acadia National Park",
        image: "http://beyondwords.life/wp-content/uploads/2017/06/shutterstock_448333891.jpg",
        description: "aaecsdkjodfg  ergergijsc"
    },
    {
        name: "Otter Lake Camp",
        image: "http://www.landrushnow.com/wp-content/uploads/2014/08/best-camping-spots-in-pa-6.jpg",
        description: "aaecsdkjoijdfbdfrtev erg esc"
    }
];

function seedDB(){
    //remove all the campgrounds
    Campground.remove({}, function(error){
        if(error){
            console.log(error);
        }
        console.log("removed campgrounds!");
        //add new campgrounds
        data.forEach(function(seed){
            Campground.create(seed, function(error, campground){
                if(error){
                    console.log(error);
                }
                else{
                    console.log("added a campground");
                    Comment.create(
                        {
                            text: "This place is greate, but I wish there was internet",
                            author: "John"
                        }, function(error, comment){
                            if(error){
                                console.log(error);
                            }
                            else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment");
                            }
                        });
                }
            });
        });
    });

}

module.exports = seedDB;