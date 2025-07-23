const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  event: {
    type: String,
    required: [true, 'Event type is required'],
    enum: ['Wedding', 'Birthday', 'Corporate', 'Conference', 'Social', 'Other']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  time: {
    type: String,
    required: [true, 'Time slot is required'],
    enum: ['morning', 'afternoon', 'evening', 'fullday']
  },
  tickets: {
    type: Number,
    required: [true, 'Number of tickets is required'],
    min: [1, 'Minimum 1 ticket required'],
    max: [500, 'Maximum 500 tickets allowed']
  },
  totalPrice: {
    type: Number,
    required: [true, 'Total price is required'],
    min: [0, 'Price cannot be negative']
  },
  services: {
    catering: {
      type: String,
      enum: ['', 'basic', 'premium', 'deluxe']
    },
    decoration: {
      type: String,
      enum: ['', 'basic', 'premium', 'deluxe']
    },
    photography: {
      type: String,
      enum: ['', 'basic', 'premium', 'deluxe']
    },
    sound: {
      type: String,
      enum: ['', 'basic', 'premium', 'deluxe']
    }
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required']
  },
  customerEmail: {
    type: String,
    required: [true, 'Customer email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  customerPhone: {
    type: String,
    required: [true, 'Customer phone is required']
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);