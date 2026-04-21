//controllers/participantController.js

const Participant = require('../models/participant');
const Meeting = require('../models/meeting');
const User = require('../models/User');



exports.getMyParticipant = async (req, res) => {
	try {
		const { meeting_code } = req.params;
		const { email } = req.query;

		if(!meeting_code)
			return res.status(400).json({ message: 'Meeting code url is required'});

		if (!email)
			return res.status(400).json({ message: 'Email is required' });

		//Find meeting
		const meeting = await Meeting.findOne({ meeting_code });

		if (!meeting) 
			return res.status(404).json({ message: 'Meeting not found' });
		
		// Find user by email
		const user = await User.findOne({ email });
		if (!user)
			return res.status(404).json({ message: 'User not found' });

		// Find participant
		const participant = await Participant.findOne({
			meeting_id: meeting._id,
			user_id: user._id
		}).populate('user_id', 'email');

		if (!participant) 
			return res.status(404).json({ message: 'Participant not found in this meeting' });
		

		res.json(participant);

	} catch {
		res.status(500).json({ message: 'Internal Server Error' });
	}
};



exports.getParticipants = async (req, res) => {
	try {
		const { meeting_code } = req.params;

		if (!meeting_code)
			return res.status(400).json({ message: 'Meeting code is required' });

		const meeting = await Meeting.findOne({ meeting_code });

		if (!meeting) 
			return res.status(404).json({ message: 'Meeting not found' });
		

		const participants = await Participant.find({
			meeting_id: meeting._id
		})
		.populate('user_id', 'email');

		res.status(200).json({
			total: participants.length,
			participants
		});

	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
};