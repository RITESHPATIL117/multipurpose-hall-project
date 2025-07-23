import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { t, currentLanguage, changeLanguage, LANGUAGES } = useLanguage();

  return (
    <div className="home" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80")'
    }}>
      <div className="language-selector-home">
        <div className="language-radio-group">
          {LANGUAGES.map((lang) => (
            <label key={lang.code} className="language-radio-label">
              <input
                type="radio"
                name="language"
                value={lang.code}
                checked={currentLanguage === lang.code}
                onChange={() => changeLanguage(lang.code)}
                className="language-radio"
              />
              <span className="language-name">{lang.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <h1>{t('home.heroTitle')}</h1>
          <p>{t('home.heroSubtitle')}</p>
          <div className="hero-buttons">
            <Link to="/services" className="cta-button primary">
              {t('home.exploreServices')}
            </Link>
            <Link to="/gallery" className="cta-button secondary">
              {t('home.viewGallery')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;