var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment");
    
var data = [
    {
        name: "False Cape State Park",
        image: "http://s3.amazonaws.com/virginiablog/wp-content/uploads/2016/03/16115458/North-Bend-Park-Campground.jpg",
        description: "aIt is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    {
        name: "Acadia National Park",
        image: "http://beyondwords.life/wp-content/uploads/2017/06/shutterstock_448333891.jpg",
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
    },
    {
        name: "Otter Lake Camp",
        image: "http://www.landrushnow.com/wp-content/uploads/2014/08/best-camping-spots-in-pa-6.jpg",
        description: "simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
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