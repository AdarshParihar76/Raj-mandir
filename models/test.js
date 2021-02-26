var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose")

var TestSchema = new mongoose.Schema({
	class: Number,
	noq: Number,
	Tname: String,
	boxes:[ 
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Box"
		}
	]
});

TestSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Test", TestSchema);