// EventBookingForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import './Booking.css';

const EVENT_PRICES = {
  'Wedding': 50000,
  'Birthday': 25000,
  'Corporate': 35000,
  'Conference': 30000,
  'Social': 20000,
  'Other': 15000
};

const TIME_SLOT_MULTIPLIERS = {
  'morning': 1,
  'afternoon': 1,
  'evening': 1.2,
  'fullday': 2.5
};

const ADDITIONAL_SERVICES = {
  catering: {
    name: 'Catering Service',
    options: [
      { id: 'basic', name: 'Basic Package', pricePerPerson: 500 },
      { id: 'premium', name: 'Premium Package', pricePerPerson: 1000 },
      { id: 'deluxe', name: 'Deluxe Package', pricePerPerson: 1500 }
    ]
  },
  decoration: {
    name: 'Decoration',
    options: [
      { id: 'basic', name: 'Basic Decor', price: 15000 },
      { id: 'premium', name: 'Premium Decor', price: 25000 },
      { id: 'deluxe', name: 'Deluxe Decor', price: 40000 }
    ]
  },
  photography: {
    name: 'Photography',
    options: [
      { id: 'basic', name: 'Basic Coverage', price: 15000 },
      { id: 'premium', name: 'Premium Coverage', price: 25000 },
      { id: 'deluxe', name: 'Deluxe Coverage', price: 35000 }
    ]
  },
  sound: {
    name: 'Sound System',
    options: [
      { id: 'basic', name: 'Basic Sound', price: 10000 },
      { id: 'premium', name: 'Premium Sound', price: 20000 },
      { id: 'deluxe', name: 'Deluxe Sound', price: 30000 }
    ]
  }
};

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedDate = queryParams.get('date');

  const [formData, setFormData] = useState({
    eventType: '',
    date: selectedDate || '',
    time: '',
    guests: '',
    services: [],
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [totalAmount, setTotalAmount] = useState(0);

  const servicePrices = {
    'Decorations': 25000,
    'Catering': 500,
    'Sound & Lighting': 30000,
    'Photography': 20000
  };

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('userData')) || {};

  useEffect(() => {
    if (selectedDate) {
      setFormData(prev => ({ ...prev, date: selectedDate }));
    }
  }, [selectedDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    let updatedServices;
    
    if (checked) {
      updatedServices = [...formData.services, value];
    } else {
      updatedServices = formData.services.filter(service => service !== value);
    }

    setFormData(prev => ({
      ...prev,
      services: updatedServices
    }));

    // Calculate total amount
    const newTotal = updatedServices.reduce((sum, service) => sum + servicePrices[service], 0);
    setTotalAmount(newTotal);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Navigate to payment page with booking details
    navigate('/payment', {
      state: {
        bookingDetails: {
          ...formData,
          totalAmount
        }
      }
    });
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1>Book Your Event</h1>
        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-section">
            <h2>Event Details</h2>
            <div className="form-group">
              <label>Event Type</label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Event Type</option>
                <option value="Wedding">Wedding</option>
                <option value="Corporate">Corporate Event</option>
                <option value="Birthday">Birthday Party</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Number of Guests</label>
              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>Additional Services</h2>
            <div className="services-grid">
              <div className="service-option">
                <input
                  type="checkbox"
                  id="decorations"
                  name="services"
                  value="Decorations"
                  onChange={handleServiceChange}
                />
                <label htmlFor="decorations">Decorations (₹25,000)</label>
              </div>

              <div className="service-option">
                <input
                  type="checkbox"
                  id="catering"
                  name="services"
                  value="Catering"
                  onChange={handleServiceChange}
                />
                <label htmlFor="catering">Catering (₹500 per person)</label>
              </div>

              <div className="service-option">
                <input
                  type="checkbox"
                  id="sound"
                  name="services"
                  value="Sound & Lighting"
                  onChange={handleServiceChange}
                />
                <label htmlFor="sound">Sound & Lighting (₹30,000)</label>
              </div>

              <div className="service-option">
                <input
                  type="checkbox"
                  id="photography"
                  name="services"
                  value="Photography"
                  onChange={handleServiceChange}
                />
                <label htmlFor="photography">Photography (₹20,000)</label>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Contact Information</h2>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="total-section">
            <h3>Total Amount: ₹{totalAmount}</h3>
          </div>

          <button type="submit" className="submit-button">
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;
