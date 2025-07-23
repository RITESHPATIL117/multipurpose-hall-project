import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, 
  faCalendarAlt, 
  faServer, 
  faInfoCircle, 
  faEnvelope, 
  faUser, 
  faSignOutAlt, 
  faUserEdit, 
  faChevronDown,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    // Check for user data in localStorage on component mount
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }

    // Listen for login event
    const handleLogin = (event) => {
      setUserData(event.detail);
    };

    // Add scroll event listener
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Handle clicks outside profile dropdown
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    window.addEventListener('userLogin', handleLogin);
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    // Close menu when route changes
    setIsMenuOpen(false);

    // Cleanup
    return () => {
      window.removeEventListener('userLogin', handleLogin);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    // Clear user data and token
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    setUserData(null);
    setIsProfileOpen(false);
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-brand">
        <Link to="/">AMHT</Link>
      </div>

      <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className={`nav-link ${isActive('/')}`}>
          <FontAwesomeIcon icon={faHome} className="nav-icon" /> {t('common.home')}
        </Link>
        <Link to="/events" className={`nav-link ${isActive('/events')}`}>
          <FontAwesomeIcon icon={faCalendarAlt} className="nav-icon" /> {t('common.events')}
        </Link>
        <Link to="/services" className={`nav-link ${isActive('/services')}`}>
          <FontAwesomeIcon icon={faServer} className="nav-icon" /> {t('common.services')}
        </Link>
        <Link to="/about" className={`nav-link ${isActive('/about')}`}>
          <FontAwesomeIcon icon={faInfoCircle} className="nav-icon" /> {t('common.about')}
        </Link>
        <Link to="/contact" className={`nav-link ${isActive('/contact')}`}>
          <FontAwesomeIcon icon={faEnvelope} className="nav-icon" /> {t('common.contact')}
        </Link>
      </div>

      <div className="navbar-end">
        {userData ? (
          <div className="profile-section" ref={profileRef}>
            <button className="profile-button" onClick={toggleProfile}>
              <span className="user-name">{userData.name}</span>
              <FontAwesomeIcon icon={faChevronDown} className="icon-sm" />
            </button>
            {isProfileOpen && (
              <div className="profile-dropdown">
                <Link to="/profile" className="dropdown-item">
                  <FontAwesomeIcon icon={faUser} className="dropdown-icon" /> {t('common.profile')}
                </Link>
                <Link to="/edit-profile" className="dropdown-item">
                  <FontAwesomeIcon icon={faUserEdit} className="dropdown-icon" /> Edit Profile
                </Link>
                <button onClick={handleLogout} className="dropdown-item">
                  <FontAwesomeIcon icon={faSignOutAlt} className="dropdown-icon" /> {t('common.logout')}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">{t('common.login')}</Link>
            <Link to="/signup" className="signup-btn">{t('common.signup')}</Link>
          </div>
        )}
      </div>

      <button className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} className="menu-bars" />
      </button>
    </nav>
  );
};

export default Navbar;