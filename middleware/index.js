var Campground = require("../models/campground");
var Comment = require("../models/comment");

//All the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id, function(err, foundCampground){
                if(err){
                    req.flash("error", "Campround Not Found");
                    res.redirect("back");
                } else{
                    //does user own the campground?
                    if(foundCampground.author.id.equals(req.user._id)){
                        next();
                    } else{
                        req.flash("error", "You Don't have Permission to do that!");
                        res.redirect("back")
                    }
                }
            });
        }else{
            req.flash("error", "You need to Logge in to do that");
            res.redirect("back");
        }
    }

    middlewareObj.checkCommentOwnership = function(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    res.redirect("back");
                } else{
                    //does user own the campground?
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    } else{
                        req.flash("error", "You Do Not Have Permission to Do That");
                        res.redirect("back")
                    }
                }
            });
        }else{
            req.flash("error", "You Need To Be Logged In To Do That");
            res.redirect("back");
        }
    }

    middlewareObj.isLoggedIn =  function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash("error", "You Need To Logged In To Do That!");
        res.redirect("/login");
    }
module.exports = middlewareObj