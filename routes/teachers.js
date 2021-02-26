var  express 	= require("express"),
	router  	= express.Router(),
	mongoose	= require("mongoose"),
	passport	= require("passport"),
	User 		= require("../models/user"),
	Student		= require("../models/student"),
	Test 		= require("../models/test"),
	Box 		= require("../models/box"),
	Teacher 	= require("../models/teacher"),
	Answer 		= require("../models/answers"),
	middleware = require("../middleware")

// get routes
router.get("/testq", middleware.isTeacher, function(req, res){
	res.render("teachers/testq", {noq:'null', test: "null", Tname: req.user.username});
});

router.get("/schedule", middleware.isTeacher, function(req, res){
	res.render("teachers/schedule");
});

router.get("/addTeacher", middleware.isTeacher, function(req, res){
	res.render("teachers/addTeacher");
});

router.get("/seeTest", middleware.isTeacher, function(req, res){
	res.render("teachers/seeStudents", {answers: 'null'});
});

router.get("/deleteTest/:teacher", middleware.isTeacher, function(req, res){
	Test.find({Tname: req.params.teacher}, function(err, t){
		if (err) {
			req.flash("error", err.message);
			res.redirect("back");
		}else{
			if(t.length>0){
				Answer.deleteMany({testId: t[0].id}, function(err, a){

				});
				Test.remove({Tname: req.params.teacher}, function(err){});
				req.flash("success", "All the tests have been deleted..!");
				res.redirect("/dashboard/teachers");
				}else{
					req.flash("error", "No tests Available..!");
					res.redirect("back");
				}
		}
	});
});

router.get("/seeStudents/:class", middleware.isTeacher, function(req, res){
	Test.find({class: req.params.class}, function(err, t){
		if (err) {
			console.log(err);
		}else{
			Answer.find({testId: t[0].id}, function(err, a){
				if (err) {
					console.log(err);
				}else{
					Box.find({testId: t[0].id}, function(err, b){
						if (err) {
							console.log(err);
						}else{
							console.log("boxes ="+b);
							console.log("test = "+t);
							res.render("teachers/seeStudents", {answers: a, boxes: b});
						}
					});
				}
			})
		}
	});	
});

router.get("/test/done", middleware.isTeacher, function(req, res){
	delete req.session.temp;
	res.redirect("/dashboard/teachers");
});

// post routes
router.post("/testq", middleware.isTeacher, function(req, res){
	Test.create({class: req.body.class, noq: req.body.noq, Tname: req.body.Tname}, function(err, t){
		if (err) {
			console.log(err);
		}else{
			Box.create({q: req.body.q, testId: t.id}, function(err, b){
				if (err) {
					console.log(err);
				}else{
					console.log("Box = "+b);
					Test.findByIdAndUpdate(t.id, {boxes: [b]}, function(err, ut){
						if (err) {
							console.log(err);
						}else{
							console.log(t);
							console.log("Updated test = "+ut);
						}
					});
				}
			});
			req.session.temp = 1;
			res.render("teachers/testq", {noq: t.noq, test: t, temp: req.session.temp});
			
		}
	});
});

router.post("/postTest/:id", middleware.isTeacher, function(req, res){
	req.session.temp = req.session.temp+1;
	var temp = req.session.temp;
	console.log(temp);
	Test.findById(req.params.id, function(err, t){		
		if (err) {
			console.log(err);
		}else{
			Box.create({q: req.body.q, testId: t.id}, function(err, b){
				if (err) {
					console.log(err);
				}else{
					console.log("box = "+b);
					Test.findByIdAndUpdate(t.id, {boxes: [b]}, function(err, ut){
						if (err) {
							console.log(err);
						}else{
							console.log(t);
							console.log("Updated test = "+ut);
						}
					});
				}
			});
			console.log("test = "+t);
			res.render("teachers/testq", {test: t, noq: t.noq, temp: temp});
		}
	});
});

router.post("/addTeacher", middleware.isTeacher, function(req, res){
	User.register(new User({username: req.body.username}), req.body.password, function(err, u){
		if (err) {
			console.log(err);
			res.redirect("back");
		}else{
			Teacher.create({username: u.username, sub: req.body.sub}, function(err, t){
				if (err) {
					console.log(err);
				}else{
					console.log("teacher = "+t);
					res.redirect("/dashboard/teachers");
				}
			});
		}
	});
});

router.post("/postClass", middleware.isTeacher, function(req, res){
	res.redirect("/teachers/seeStudents/"+req.body.class);
});

// exporting it
module.exports = router;