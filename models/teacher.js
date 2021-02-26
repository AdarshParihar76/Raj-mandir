var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose")

var TeacherSchema = new mongoose.Schema({
	username: String,
	sub: String
});

TeacherSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Teacher", TeacherSchema);