var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose")

var StudentSchema = new mongoose.Schema({
	username: String,
	Mobno: String,
	class: Number
});

StudentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Student", StudentSchema);