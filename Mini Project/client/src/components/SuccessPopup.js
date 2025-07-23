import React, { useEffect, useState } from 'react';
import './SuccessPopup.css';

const SuccessPopup = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start progress animation
    setProgress(100);

    // Call onComplete after animation finishes
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 3000); // 3 seconds duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="popup-title">Login Successful!</h2>
        <p className="popup-message">Redirecting you to services...</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup; 