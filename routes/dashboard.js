var  express 	= require("express"),
	router  	= express.Router(),
	mongoose	= require("mongoose"),
	passport	= require("passport"),
	User 		= require("../models/user"),
	Student		= require("../models/student"),
	middleware 	= require("../middleware")


// get routes
router.get("/", middleware.isLoggedIn, function(req, res){
	res.render("dashboard");
});

router.get("/teachers", middleware.isTeacher, function(req, res){
	res.render("dashboard/tdash");
});

router.get("/students", middleware.isLoggedIn, function(req, res){
	res.render("dashboard/sdash");
});

router.get("/admins", middleware.isLoggedIn, function(req, res){
	req.flash("error", "Not Updated Yet..!");
	res.render("dashboard/adash");
});


// exporting it
module.exports = router;