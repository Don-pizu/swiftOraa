//routes/meetingRoutes.js

const express = require('express');
const router = express.Router();
const { createMeeting, joinMeeting } = require('../controllers/meetingController');
const { protect }  = require('../middleware/authMiddleware');


router.post('/meetings/create', protect, createMeeting);
router.post('/meeting/join', protect, joinMeeting);

module.exports = router;