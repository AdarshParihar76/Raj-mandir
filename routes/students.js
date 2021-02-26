var  express 	= require("express"),
	router  	= express.Router(),
	mongoose	= require("mongoose"),
	passport	= require("passport"),
	User 		= require("../models/user"),
	Student		= require("../models/student"),
	Test 		= require("../models/test"),
	Box 		= require("../models/box"),
	Answer 		= require("../models/answers"),
	middleware 	= require("../middleware")

// get routes
router.get("/test", middleware.isStudent, function(req, res){
	if(req.user){
		Student.find({username: req.user.username}, function(err, std){
			if (err) {
				console.log(err);
			}else{
				Test.find({class: std[0].class}, function(err, t){
					if (err) {
						console.log(err);
					}else{
						if (t.length > 0) {
							Box.find({testId: t[0]._id}, function(err, b){
								if (err) {
									console.log(err);
								}else{
									console.log("boxes = "+b);
									res.render("students/test", {test: t, boxes: b});
								}
							});
						}else{
							req.flash("error", "No test Available..!");
							res.redirect("back");
						}
					}
				});
			}
		});
	}
});

// post routes
router.post("/postAnswers/:id", middleware.isStudent, function(req, res){

	Answer.create({ans: req.body.Ans, testId: req.params.id, stdUsername: req.user.username}, function(err, a){
		if (err) {
			console.log(err);
		}else{
			console.log("Answers = "+a);
			res.redirect("/dashboard/students");
		}
	});
});


// exporting it
module.exports = router;