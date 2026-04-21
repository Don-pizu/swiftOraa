//routes/participantRoutes.js

const express = require('express');
const router = express.Router();
const { getMyParticipant, getParticipants } = require('../controllers/participantController');
const { protect }  = require('../middleware/authMiddleware');


router.get('/:meeting_code/participant', protect, getMyParticipant);
router.get('/:meeting_code/participants', protect, getParticipants);

module.exports = router;