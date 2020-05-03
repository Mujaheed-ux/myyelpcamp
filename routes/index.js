var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


//Root Route
router.get("/", function(req, res){
    res.render("landing");
});

//=============================
//AUTH ROUTES
//=============================

//Show register form
router.get("/register", function(req, res){
    res.render("register");
});

//handle Sign up Logic
router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
    if(err){ 
        req.flash("error", err.message);
        return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
        req.flash("success", "You Are Welcome, Nice To Have You Here " + " " + user.username );
        res.redirect("/campgrounds");
    })
   });
});

//Show Login Form
router.get("/login", function(req, res){
    res.render("login");
});

//Handlig Login Logic
router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/campgrounds",
    failureRedirect: "login"

}), function(req, res){
});

//Logout Route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged You Out!");
    res.redirect("/campgrounds");
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login");
}

module.exports = router;
