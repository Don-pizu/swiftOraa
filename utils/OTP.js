//utils/OTP.js
const { randomBytes } = require('crypto');


function generateOTP(length = 6) {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const bytes = randomBytes(length);
	let otp = '';

	for (let i = 0; i < length; i++) {
		otp += chars[bytes[i] % chars.length];
	}

	return otp;
}

module.exports = generateOTP;