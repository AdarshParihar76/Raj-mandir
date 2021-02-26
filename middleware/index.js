var User 	= require("../models/user"),
	Student = require("../models/student"),
	Teacher = require("../models/teacher")

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}else{
		req.flash("error", "You don't have permission to do that...");
		res.redirect("/login");
	}
}

middlewareObj.isTeacher = function(req, res, next){
	if (req.isAuthenticated()) {
		Teacher.findOne({username: req.user.username}, function(err, t){
			if(err){
				console.log(err);
				res.redirect("back");
			}else{
				if (t) {
				return next();			
				}else{
					console.log("Error Not found");
				}
			}
		});
	}else{
		req.flash("error", "You don't have permission to do that...");
		res.redirect("/login");
	}
}

middlewareObj.isStudent = function(req, res, next){
	if (req.isAuthenticated()) {
		Student.findOne({username: req.user.username}, function(err, s){
			if(err){
				console.log(err);
				res.redirect("back");
			}else{
				if (s) {
				return next();			
				}else{
					console.log("Error Not found");
				}
			}
		});
	}else{
		req.flash("error", "You don't have permission to do that...");
		res.redirect("/login");
	}
}


module.exports = middlewareObj;