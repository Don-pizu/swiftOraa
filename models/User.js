//models/User.js

const mongoose = require("mongoose");

//user schema
const userSchema = new mongoose.Schema({
	email: { 
  		type: String, 
  		unique: true 
  	},
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);