//models/participant.js

const mongoose = require('mongoose');

//participantschema
const participantSchema = new mongoose.Schema({
	meeting_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Meeting",
	},
	user_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	role: {
		type: String,
		enum: [ 'host', 'participant' ],
		default: 'participant',
	},
	joined_at: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model ('Participant',participantSchema);
