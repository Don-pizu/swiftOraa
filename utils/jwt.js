//utils/jwt.js

const jwt = require('jsonwebtoken');


//Generate JWT Token
const createToken = (user) => {
	return jwt.sign (
		{id: user._id},
		process.env.JWT_SECRET,
		{ expiresIn: '1h' }
	);
};

module.exports = createToken;