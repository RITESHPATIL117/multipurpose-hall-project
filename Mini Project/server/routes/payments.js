const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { processPayment } = require('../controllers/payments');

const router = express.Router();

// Protected route
router.post('/', protect, processPayment);

module.exports = router; 