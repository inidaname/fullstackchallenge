const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


const interestSchema = new mongoose.Schema({
	tenant: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Tenants",
		required: true
	},
	property: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Properties",
		required: true
	},
	dateOfInt:  {
		type:Date,
		default: Date.now
	},
	dateModified:  {
		type:Date
	},
});

module.exports = mongoose.model("Interest", interestSchema, "Interest");

