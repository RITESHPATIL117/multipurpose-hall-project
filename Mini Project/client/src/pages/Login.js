import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import SuccessPopup from '../components/SuccessPopup';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      if (response.data.token) {
        // Store the token and user data
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));

        // Store booking information if available
        const selectedDate = localStorage.getItem('selectedDate');
        if (selectedDate) {
          localStorage.setItem('pendingBookingDate', selectedDate);
        }

        // Dispatch login event
        window.dispatchEvent(new CustomEvent('userLogin', {
          detail: response.data.user
        }));

        // Clear stored paths but keep the date for Booking page
        localStorage.removeItem('redirectPath');

        // Show success popup
        setShowSuccessPopup(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePopupComplete = () => {
    // Navigate to booking page after popup animation
    const selectedDate = localStorage.getItem('pendingBookingDate');
    const queryParams = selectedDate ? `?date=${selectedDate}` : '';
    navigate(`/booking${queryParams}`);
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login to Your Account</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="login-footer">
          <p>Don't have an account? <a href="/signup">Sign up</a></p>
          <p><a href="/forgot-password">Forgot Password?</a></p>
        </div>
      </div>
      {showSuccessPopup && <SuccessPopup onComplete={handlePopupComplete} />}
    </div>
  );
};

export default Login;
