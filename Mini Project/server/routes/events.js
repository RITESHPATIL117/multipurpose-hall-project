const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createEvent, getEvents, getEventById } = require('../controllers/events');

const router = express.Router();

router.route('/')
  .post(protect, createEvent)
  .get(getEvents);

router.route('/:id').get(getEventById);

module.exports = router;