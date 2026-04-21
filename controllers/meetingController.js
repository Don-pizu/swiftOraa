//controllers/meetingController.js

const Meeting = require('../models/meeting');
const Participant = require('../models/participant');
const { nanoid } = require('nanoid');    //generate unique URL-friendly IDs


//Create meeting
exports.createMeeting = async ( req, res ) => {
	try {
		const code = nanoid(8);

		const meeting = await Meeting.create({
			meeting_code: code,
			host_id: req.user._id,
		});

		//Create participant for the meeting (host)
		await Participant.create ({
			meeting_id: meeting._id,
			user_id: req.user._id,
			role: 'host',
		});

		// populate before sending response
		const populatedMeeting = await Meeting.findById(meeting._id)
						.populate('host_id', 'email');


		res.status(201).json({
			meeting: populatedMeeting
		});

	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error'});
	}
}



//Join Meeting
exports.joinMeeting = async ( req, res ) => {
	try {

		const { meeting_code } = req.body;

		if (!meeting_code)
		 	return res.status(400).json({ message: 'Meeting code is required '});

		//find meeting
		const meeting = await Meeting.findOne({ meeting_code })
						.populate('host_id', 'email');

		if (!meeting)
		 	return res.status(404).json({ message: 'Meeting not found' });

		//Find participants related to meeting id
		//checking if user joining is already a participant
		const existing = await Participant.findOne({
		 	meeting_id: meeting._id,
		 	user_id: req.user._id,
		});

		//if user/participant does not exist
		if (!existing) {
			await Participant.create({
				meeting_id: meeting._id,
				user_id: req.user._id,
			});
		}

		res.status(200).json({
			message: 'Joined Meeting',
			meeting
		})

	} catch {
		res.status(500).json({ message: 'Internal Server Error'});
	}
}



