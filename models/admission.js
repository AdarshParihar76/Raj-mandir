var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose")

var AdmissionSchema = new mongoose.Schema({
	name: String,
	class: Number,
	wn: String,
	Mobno: String
});

AdmissionSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Admission", AdmissionSchema);