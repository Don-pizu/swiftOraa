//routes/authRoutes.js

const express = require ('express');
const router = express.Router();
const { requestOtp, verifyOTP, resendOTP } = require ('../controllers/authController');


router.post('/requestOtp', requestOtp);
router.post('/verifyOtp', verifyOTP);
router.post('/resendOtp', resendOTP);

module.exports = router;