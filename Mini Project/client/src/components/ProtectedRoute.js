import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!token || !userData) {
      // Store the current path to return after login
      localStorage.setItem('redirectPath', '/booking');
      navigate('/login');
    }
  }, [navigate]);

  return children; // Render the children components
};

export default ProtectedRoute; 