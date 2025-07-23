import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Events.css';

function Events() {
  const [date, setDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  // Check authentication status
  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData'));
    return { isAuthenticated: !!(token && userData), token, userData };
  };

  // Fetch booked dates from the database with timeout
  const fetchBookedDates = async () => {
    try {
      setRefreshing(true);
      setError(null);
      const response = await axios.get('http://localhost:5000/api/bookings/dates', {
        timeout: 3000,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data) {
        const dates = response.data.map(booking => new Date(booking.date));
        setBookedDates(dates);
      }
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again.');
      } else {
        setError('Failed to fetch booked dates. Please try again.');
      }
      console.error('Error fetching booked dates:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial fetch with retry mechanism
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 2;

    const fetchWithRetry = async () => {
      try {
        await fetchBookedDates();
      } catch (error) {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(fetchWithRetry, 1000);
        }
      }
    };

    fetchWithRetry();
  }, []);

  // Refresh booked dates every 60 seconds
  useEffect(() => {
    const interval = setInterval(fetchBookedDates, 60000);
    return () => clearInterval(interval);
  }, []);

  // Handle date click
  const handleDateClick = async (clickedDate) => {
    // Check if the date is already booked
    const isBooked = bookedDates.some(bookedDate => 
      bookedDate.toDateString() === clickedDate.toDateString()
    );

    if (isBooked) {
      alert('This date is already booked. Please select another date.');
      return;
    }

    // Check if the date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (clickedDate < today) {
      alert('Cannot select a past date. Please select a future date.');
      return;
    }

    // Check authentication status
    const { isAuthenticated, token } = checkAuth();

    if (!isAuthenticated) {
      // Store the selected date and intended destination
      const dateString = clickedDate.toISOString().split('T')[0];
      localStorage.setItem('selectedDate', dateString);
      localStorage.setItem('redirectPath', `/booking?date=${dateString}`);
      
      // Redirect to login
      navigate('/login');
      return;
    }

    // Verify token validity with backend
    try {
      await axios.get('http://localhost:5000/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      // If verification successful, proceed to booking
      setDate(clickedDate);
      const dateString = clickedDate.toISOString().split('T')[0];
      navigate(`/booking?date=${dateString}`);
    } catch (error) {
      // If token is invalid, clear storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      localStorage.setItem('selectedDate', clickedDate.toISOString().split('T')[0]);
      localStorage.setItem('redirectPath', `/booking?date=${clickedDate.toISOString().split('T')[0]}`);
      navigate('/login');
    }
  };

  // Custom tile content to show "Booked" on booked dates
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const isBooked = bookedDates.some(bookedDate => 
        bookedDate.toDateString() === date.toDateString()
      );
      
      if (isBooked) {
        return <div className="booked-indicator">Booked</div>;
      }
    }
    return null;
  };

  // Custom tile class for styling booked dates
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const isBooked = bookedDates.some(bookedDate => 
        bookedDate.toDateString() === date.toDateString()
      );
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
      const isHovered = hoveredDate && date.toDateString() === hoveredDate.toDateString();
      
      let className = '';
      if (isBooked) className += 'booked ';
      if (isPast) className += 'past ';
      if (isHovered) className += 'hovered ';
      
      return className.trim();
    }
    return null;
  };

  // Handle mouse enter on date tile
  const handleTileMouseEnter = ({ date }) => {
    setHoveredDate(date);
  };

  // Handle mouse leave on date tile
  const handleTileMouseLeave = () => {
    setHoveredDate(null);
  };

  if (loading && bookedDates.length === 0) {
    return (
      <div className="events-page">
        <div className="calendar-container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading calendar...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="events-page">
      <div className="calendar-container">
        <div className="calendar-header">
          <h2>Event Calendar</h2>
          <div className="calendar-legend">
            <div className="legend-item">
              <span className="legend-color available"></span>
              <span>Available</span>
            </div>
            <div className="legend-item">
              <span className="legend-color booked"></span>
              <span>Booked</span>
            </div>
            <div className="legend-item">
              <span className="legend-color past"></span>
              <span>Past</span>
            </div>
          </div>
          <button 
            onClick={fetchBookedDates} 
            className="refresh-button" 
            disabled={refreshing}
          >
            {refreshing ? (
              <>
                <span className="spinner-small"></span>
                Refreshing...
              </>
            ) : (
              <>
                <i className="fas fa-sync-alt"></i>
                Refresh Calendar
              </>
            )}
          </button>
        </div>
        {error && (
          <div className="error-message">
            {error}
            <button onClick={fetchBookedDates} className="retry-button">
              Retry
            </button>
          </div>
        )}
        <div className="calendar-wrapper">
          <Calendar
            onChange={handleDateClick}
            value={date}
            tileContent={tileContent}
            tileClassName={tileClassName}
            minDate={new Date()}
            className="custom-calendar"
            onClickTile={handleDateClick}
            onMouseEnter={handleTileMouseEnter}
            onMouseLeave={handleTileMouseLeave}
            showNeighboringMonth={true}
            formatShortWeekday={(locale, date) => 
              date.toLocaleDateString(locale, { weekday: 'short' }).slice(0, 3)
            }
            formatMonthYear={(locale, date) => 
              date.toLocaleDateString(locale, { month: 'long', year: 'numeric' })
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Events; 