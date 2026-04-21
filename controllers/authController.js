//controllers/authController.js

const User = require('../models/User');
const createToken = require('../utils/jwt');
const generateOTP = require('../utils/OTP');
const otpStore = require('../utils/otpStore');
const{ sendOTP } = require('../utils/emailService');


//Register and Request OTP
exports.requestOtp = async( req, res ) => {
	try {
		const { email } = req.body;

		//validate email
		if (!email)
			return res.status(400).json({ message: 'Email is required'});

		//Generate otp
		const otp = generateOTP();

		//store otp
		otpStore.set(email, {
			otp,
			expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
		});

		//Get or Create user
		let user = await User.findOne({ email });

		if(!user) {
			user = await User.create({ email });
		}

		//send email otp
		await sendOTP({ to: email, otp});

		res.status(200).json({ message: `OTP sent to ${email}` });

	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error'});
	}
};


//Login and verify OTP
exports.verifyOTP = async (req, res) => {
	try {

		const { email, otp } = req.body;

		if (!email || !otp)
			return res.status(400).json({ message: 'email and otp are required'});
	

		//for incorrect otp or expired otp
		const record = otpStore.get(email);

		if (!record || record.otp !== otp || record.expiresAt < Date.now()) {
			return res.status(400).json({ message: 'Invalid or expired OTP' });
		}

		//Delete otp after us
		otpStore.delete(email);

		//find user
		let user = await User.findOne({ email });

		if (!user) {
			user = await User.create({ email });
		}

		res.json({
			email: email,
			token: createToken (user),
		});

	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error'});
	}
};


//Resend OTP
exports.resendOTP = async ( req, res ) => {
	try {
		const { email } = req.body;

		if (!email)
			return res.status(400).json({ message: 'Email is required' });

		//Generate otp
		const otp = generateOTP();

		//store otp
		otpStore.set (email, otp);

		//send otp
		await sendOTP ({ to:email, otp });

		res.status(200).json({ message: `OTP sent to ${email}` });

	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
};