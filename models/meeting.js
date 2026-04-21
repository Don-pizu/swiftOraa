// models/meeting.js

const mongoose = require('mongoose');

//meeting schema
const meetingSchema = new mongoose.Schema({
	meeting_code: {
		type: String,
		unique: true,
	},
	host_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	status: {
		type: String,
		enum: ['active', 'ended'],
		default: 'active',
	},
}, { timestamps: true });

module.exports = mongoose.model( "Meeting", meetingSchema);