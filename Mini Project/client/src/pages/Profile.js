import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }
    setUserData(user);
  }, [navigate]);

  if (!userData) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>Profile</h1>
          <button 
            className="edit-button"
            onClick={() => navigate('/profile/edit')}
          >
            Edit Profile
          </button>
        </div>
        
        <div className="profile-info">
          <div className="info-group">
            <label>Name</label>
            <p>{userData.name}</p>
          </div>
          
          <div className="info-group">
            <label>Email</label>
            <p>{userData.email}</p>
          </div>
          
          <div className="info-group">
            <label>Phone</label>
            <p>{userData.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile; 