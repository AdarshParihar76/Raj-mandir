var  express 	= require("express"),
	router  	= express.Router(),
	mongoose	= require("mongoose"),
	passport	= require("passport"),
	User 		= require("../models/user"),
	Student		= require("../models/student"),
	Admission 	= require("../models/admission")

// get routes
router.get("/", function(req, res){
	res.render("home");
});

router.get("/register", function(req, res){
	res.render("register");
});

router.get("/login", function(req, res){
	res.render("login");
});

router.get("/admit", function(req, res){
	res.render("admit");
});


// logout logic
router.get("/logout", function(req, res){
	req.logout();
	res.redirect("/login");
});

// post routes
router.post("/register", function(req, res){
	var cp = req.body.cp,
		password = req.body.password

	if(cp==password){
		User.register(new User({username: req.body.username}), req.body.password, function(err, u){
			if (err) {
				req.flash("error", err.message+", Try Again..!");
				res.redirect("back");
			}else{
				Student.create({username: req.body.username, Mobno: req.body.Mobno, class: req.body.class}, function(err, st){
					if (err) {
						console.log(err);
					}else{
						req.flash("success", st.username+" registered successfully..!");
						res.redirect("/");
					}
				});
			}
		});
	}else{
		console.log("Passwords should match");
	}
});

router.post("/login", passport.authenticate("local", {
		successRedirect: "/dashboard",
		failureRedirect: "/login"
	}), function(req, res){
});

router.post("/admit", function(req, res){
	Admission.create({class: req.body.class, name: req.body.name, Mobno: req.body.Mobno, wn: req.body.wn}, function(err, adm){
		if (err) {
			console.log(err);
			res.redirect("back");
		}else {
			req.flash("success", adm.name+"'s request sent successfully !");
			res.render("home");
		}
	})
});

// eporting it
module.exports = router;