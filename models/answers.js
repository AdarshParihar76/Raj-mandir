var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose")

var AnsSchema = new mongoose.Schema({
	ans: [String],
	testId: String,
	stdUsername: String
});

AnsSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Answer", AnsSchema);