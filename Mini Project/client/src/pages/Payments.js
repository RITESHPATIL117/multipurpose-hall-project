import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Payments.css';

const Payments = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingData, setBookingData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    // Get user data and booking data
    const userData = JSON.parse(localStorage.getItem('userData'));
    const bookingDataStr = localStorage.getItem('currentBooking');
    
    if (!userData) {
      setError('User data not found. Please login again.');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    
    if (!bookingDataStr) {
      setError('No booking data found. Please make a booking first.');
      setTimeout(() => navigate('/booking'), 2000);
      return;
    }

    try {
      const parsedBookingData = JSON.parse(bookingDataStr);
      console.log('Parsed booking data:', parsedBookingData);

      // Validate all required fields
      const requiredFields = [
        'event',
        'date',
        'time',
        'tickets',
        'totalPrice',
        'customerName',
        'customerEmail',
        'customerPhone'
      ];

      const missingFields = requiredFields.filter(field => !parsedBookingData[field]);
      
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      setBookingData(parsedBookingData);
    } catch (error) {
      console.error('Error parsing booking data:', error);
      setError(error.message || 'Invalid booking data');
      setTimeout(() => navigate('/booking'), 2000);
    }
  }, [navigate]);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      setError('Please select a payment method');
      return;
    }

    if (!bookingData) {
      setError('No booking data available. Please try booking again.');
      setTimeout(() => navigate('/booking'), 2000);
      return;
    }

    // Validate all required fields again before submission
    const requiredFields = {
      bookingId: bookingData._id,
      amount: bookingData.totalPrice,
      paymentMethod,
      event: bookingData.event,
      date: bookingData.date,
      time: bookingData.time,
      tickets: bookingData.tickets,
      customerName: bookingData.customerName,
      customerEmail: bookingData.customerEmail,
      customerPhone: bookingData.customerPhone
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length > 0) {
      setError(`Missing required fields: ${missingFields.join(', ')}`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      console.log('Submitting payment with data:', requiredFields);

      const paymentResponse = await axios.post(
        'http://localhost:5000/api/payments',
        {
          ...requiredFields,
          services: bookingData.services || {}
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Payment response:', paymentResponse.data);

      if (paymentResponse.data.success) {
        // Clear the current booking from localStorage
        localStorage.removeItem('currentBooking');
        
        // Show success message and redirect
        alert('Payment successful! Your booking is confirmed.');
        navigate('/dashboard');
      } else {
        throw new Error(paymentResponse.data.message || 'Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error.response || error);
      
      let errorMessage = 'Payment failed. Please try again.';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 401) {
        errorMessage = 'Your session has expired. Please login again.';
        setTimeout(() => navigate('/login'), 2000);
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data.message || 'Invalid payment details. Please check your information.';
      } else if (!navigator.onLine) {
        errorMessage = 'Please check your internet connection.';
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="payments-page">
        <div className="payments-container">
          <h2>Loading Payment Details</h2>
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="payments-page">
      <div className="payments-container">
        <h2>Payment Details</h2>
        
        <div className="price-summary">
          <h3>Booking Summary</h3>
          <div className="price-details">
            <div className="summary-item">
              <span>Event Type:</span>
              <span>{bookingData.event}</span>
            </div>
            <div className="summary-item">
              <span>Date:</span>
              <span>{new Date(bookingData.date).toLocaleDateString()}</span>
            </div>
            <div className="summary-item">
              <span>Number of Guests:</span>
              <span>{bookingData.tickets}</span>
            </div>
            
            <h4>Price Breakdown</h4>
            <div className="summary-item">
              <span>Base Price:</span>
              <span>₹{bookingData.servicePrices.base.toLocaleString()}</span>
            </div>
            {bookingData.servicePrices.catering > 0 && (
              <div className="summary-item">
                <span>Catering:</span>
                <span>₹{bookingData.servicePrices.catering.toLocaleString()}</span>
              </div>
            )}
            {bookingData.servicePrices.decoration > 0 && (
              <div className="summary-item">
                <span>Decoration:</span>
                <span>₹{bookingData.servicePrices.decoration.toLocaleString()}</span>
              </div>
            )}
            {bookingData.servicePrices.photography > 0 && (
              <div className="summary-item">
                <span>Photography:</span>
                <span>₹{bookingData.servicePrices.photography.toLocaleString()}</span>
              </div>
            )}
            {bookingData.servicePrices.sound > 0 && (
              <div className="summary-item">
                <span>Sound System:</span>
                <span>₹{bookingData.servicePrices.sound.toLocaleString()}</span>
              </div>
            )}
            <div className="summary-item total">
              <span>Total Amount:</span>
              <span>₹{bookingData.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handlePaymentSubmit} className="payment-form">
          <div className="form-group">
            <label>Select Payment Method</label>
            <div className="payment-methods">
              <label className="payment-method">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Credit/Debit Card</span>
              </label>
              <label className="payment-method">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>UPI</span>
              </label>
              <label className="payment-method">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="netbanking"
                  checked={paymentMethod === 'netbanking'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span>Net Banking</span>
              </label>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Processing...' : `Pay ₹${bookingData.totalPrice.toLocaleString()}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payments; 