var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose")

var BoxSchema = new mongoose.Schema({
	q: String,	
	testId: String
});

BoxSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Box", BoxSchema);