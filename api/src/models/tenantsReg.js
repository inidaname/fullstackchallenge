const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


const tenantsSchema = new mongoose.Schema({
	fullName: {
		type: String,
		required: true,
		trim: true
	},
	phoneNumber:{
		type: String,
		trim: true,
		required: true
	},
	email: {
		type: String,
		lowercase: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	status: {
		type: Boolean,
		default: false
	},
	dateCreated: {
		type:Date,
		default: Date.now
	},
	dateModified: {
		type:Date
	},
    
},
{autoIndex: true});

module.exports = mongoose.model("Tenants", tenantsSchema, "Tenants");
