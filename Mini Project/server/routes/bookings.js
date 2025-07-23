const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { 
  createBooking, 
  getBookedDates, 
  getMyBookings,
  updateBookingStatus
} = require('../controllers/bookings');

const router = express.Router();

// Public routes
router.get('/dates', getBookedDates);

// Protected routes
router.post('/', protect, createBooking);
router.get('/mybookings', protect, getMyBookings);
router.put('/:id', protect, updateBookingStatus);

module.exports = router;