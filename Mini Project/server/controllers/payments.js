const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');

// @desc    Process payment for a booking
// @route   POST /api/payments
// @access  Private
const processPayment = asyncHandler(async (req, res) => {
  console.log('Received payment request:', req.body);
  
  const { 
    bookingId, 
    amount, 
    paymentMethod,
    event,
    date,
    time,
    tickets,
    services,
    customerName,
    customerEmail,
    customerPhone
  } = req.body;

  try {
    // Validate required fields
    if (!bookingId || !amount || !paymentMethod || !event || !date || !time || !tickets || 
        !customerName || !customerEmail || !customerPhone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: bookingId, amount, paymentMethod, event, date, time, tickets, and customer details'
      });
    }

    // Find the booking
    const booking = await Booking.findById(bookingId);
    
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `Booking not found with id: ${bookingId}`
      });
    }

    console.log('Found booking:', {
      bookingId: booking._id,
      userId: booking.user,
      requestUserId: req.user._id,
      amount: amount,
      bookingAmount: booking.totalPrice
    });

    // Verify booking belongs to user
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'You are not authorized to process payment for this booking'
      });
    }

    // Verify amount matches
    if (parseFloat(booking.totalPrice) !== parseFloat(amount)) {
      return res.status(400).json({
        success: false,
        message: `Payment amount (${amount}) does not match booking amount (${booking.totalPrice})`
      });
    }

    // Check if booking is already paid
    if (booking.isPaid) {
      return res.status(400).json({
        success: false,
        message: 'This booking has already been paid for'
      });
    }

    // Update booking with latest information
    booking.event = event;
    booking.date = date;
    booking.time = time;
    booking.tickets = tickets;
    booking.services = services || {};
    booking.customerName = customerName;
    booking.customerEmail = customerEmail;
    booking.customerPhone = customerPhone;
    booking.status = 'confirmed';
    booking.isPaid = true;

    await booking.save();

    console.log('Payment processed successfully');

    return res.status(200).json({
      success: true,
      message: 'Payment processed successfully',
      booking: {
        _id: booking._id,
        status: booking.status,
        isPaid: booking.isPaid,
        amount: booking.totalPrice,
        date: booking.date,
        event: booking.event,
        customerName: booking.customerName
      }
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing the payment',
      error: error.message
    });
  }
});

module.exports = {
  processPayment
}; 