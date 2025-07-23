const Booking = require('../models/Booking');
const asyncHandler = require('express-async-handler');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = asyncHandler(async (req, res) => {
  console.log('Creating booking with data:', req.body);
  
  const { 
    event,
    date,
    time,
    tickets,
    totalPrice,
    services,
    customerName,
    customerEmail,
    customerPhone,
    notes
  } = req.body;

  // Check which fields are missing
  const requiredFields = {
    event,
    date,
    time,
    tickets,
    totalPrice,
    customerName,
    customerEmail,
    customerPhone
  };

  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    console.log('Missing fields:', missingFields);
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(', ')}`
    });
  }

  // Validate event type
  const validEventTypes = ['Wedding', 'Birthday', 'Corporate', 'Conference', 'Social', 'Other'];
  if (!validEventTypes.includes(event)) {
    return res.status(400).json({
      success: false,
      message: `Invalid event type. Must be one of: ${validEventTypes.join(', ')}`
    });
  }

  try {
    // Check if the date is already booked
    const existingBooking = await Booking.findOne({
      date: new Date(date),
      time,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'This date and time slot is already booked'
      });
    }

    // Check if the date is in the past
    if (new Date(date) < new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Cannot book a date in the past'
      });
    }

    // Create the booking
    const booking = await Booking.create({
      event,
      user: req.user._id,
      date: new Date(date),
      time,
      tickets: parseInt(tickets),
      totalPrice: parseFloat(totalPrice),
      services: services || {},
      customerName,
      customerEmail,
      customerPhone,
      notes: notes || '',
      status: 'pending',
      isPaid: false
    });

    console.log('Booking created successfully:', booking);

    return res.status(201).json({
      success: true,
      booking: {
        _id: booking._id,
        event: booking.event,
        date: booking.date,
        time: booking.time,
        tickets: booking.tickets,
        totalPrice: booking.totalPrice,
        services: booking.services,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        customerPhone: booking.customerPhone,
        status: booking.status,
        isPaid: booking.isPaid
      }
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error creating booking'
    });
  }
});

// @desc    Get all booked dates
// @route   GET /api/bookings/dates
// @access  Public
const getBookedDates = asyncHandler(async (req, res) => {
  const bookedDates = await Booking.find({
    status: { $in: ['pending', 'confirmed'] }
  }).select('date time status');

  res.json(bookedDates);
});

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .sort('-createdAt');
  
  res.json(bookings);
});

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private
const updateBookingStatus = asyncHandler(async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user is authorized
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    booking.status = req.body.status;
    const updatedBooking = await booking.save();

    return res.json({
      success: true,
      booking: updatedBooking
    });
  } catch (error) {
    console.error('Booking update error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error updating booking'
    });
  }
});

module.exports = {
  createBooking,
  getBookedDates,
  getMyBookings,
  updateBookingStatus
};