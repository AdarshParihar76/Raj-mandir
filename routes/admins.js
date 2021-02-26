var  express 	= require("express"),
	router  	= express.Router(),
	mongoose	= require("mongoose"),
	passport	= require("passport"),
	User 		= require("../models/user"),
	Student		= require("../models/student"),
	Teacher  	= require("../models/teacher"),
	middleware 	= require("../middleware"),
	Admission 	= require("../models/admission")

// get routes
router.get("/user", function(req, res){
	Student.find({}, function(err, u){
		if (err) {
			req.flash("error", err);
		}else{
			Teacher.find({}, function(err, t){
				if (err) {
					req.flash("error", err);
				}else{
					User.find({}, function(err, us){
						if (err) {
							console.log(err);
						}else{
							
							res.render("admins/user", {teacher: t, student: u, users: us});
						}
					});
				}
			});
		}
	});
});

router.get("/admissions", function(req, res){
	Admission.find({}, function(err, adm){
		if (err) {
			console.log(err);
			res.redirect("back");
		}else {
			console.log(adm);
			res.render("admins/admissions", {adm: adm});
		}
	})
});


router.get("/remove/:id", middleware.isTeacher, function(req, res){
	Student.findByIdAndRemove(req.params.id, function(err, u){
		if (err) {
			req.flash("error", err);
		}else{
			if (u) {
				User.OneAndRemove({username: u.username}, function(err, us){
					if (err) {
						console.log(err);
					}
				});
			}			
			Teacher.findByIdAndRemove(req.params.id, function(err, t){
				if (err) {
					req.flash("error", err);
				}else{
					if (t) {
						User.findOneAndRemove({username: t.username}, function(err, us){
							if (err) {
								console.log(err);
							}
						});
					}
					req.flash("One removed");
					res.redirect("back");
				}
			});
		}
	});
});

router.get("/removeAdm/:id", middleware.isTeacher, function(req, res){
	Admission.findByIdAndRemove(req.params.id, function(err, u){
		if (err) {
			req.flash("error", err);
			res.redirect("back");
		}else{
			console.log(u);
			res.redirect("back");
		}
	});
});


router.get("/removeUser/:id", middleware.isTeacher, function(req, res){
	User.findByIdAndRemove(req.params.id, function(err, u){
		if (err) {
			console.log(err);
		}
	});
	res.redirect("back");
});

// exporting it
module.exports = router;