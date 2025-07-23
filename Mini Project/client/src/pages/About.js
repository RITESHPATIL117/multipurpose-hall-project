import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import './About.css';

const About = () => {
  const { t } = useLanguage();
  
  const hallImages = [
    {
      url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
      title: t('about.hall1.title'),
      description: t('about.hall1.description')
    },
    {
      url: "https://images.unsplash.com/photo-1561912774-79769a0a0a7a",
      title: t('about.hall2.title'),
      description: t('about.hall2.description')
    },
    {
      url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
      title: t('about.hall3.title'),
      description: t('about.hall3.description')
    }
  ];

  return (
    <div className="about-container">
      <div className="about-header">
        <h1>{t('about.welcome')}</h1>
        <p className="tagline">{t('about.tagline')}</p>
      </div>

      <section className="about-intro">
        <h2>{t('about.title')}</h2>
        <p>{t('about.description')}</p>
      </section>

      <section className="our-spaces">
        <h2>{t('about.spaces.title')}</h2>
        <div className="hall-grid">
          {hallImages.map((hall, index) => (
            <div key={index} className="hall-card">
              <img src={hall.url} alt={hall.title} />
              <h3>{hall.title}</h3>
              <p>{hall.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="features">
        <h2>{t('about.features.title')}</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>{t('about.features.versatile.title')}</h3>
            <p>{t('about.features.versatile.description')}</p>
          </div>
          <div className="feature">
            <h3>{t('about.features.amenities.title')}</h3>
            <p>{t('about.features.amenities.description')}</p>
          </div>
          <div className="feature">
            <h3>{t('about.features.support.title')}</h3>
            <p>{t('about.features.support.description')}</p>
          </div>
          <div className="feature">
            <h3>{t('about.features.location.title')}</h3>
            <p>{t('about.features.location.description')}</p>
          </div>
        </div>
      </section>

      <section className="capacity-info">
        <h2>{t('about.capacity.title')}</h2>
        <div className="capacity-details">
          <div className="capacity-item">
            <h3>{t('about.capacity.grand.title')}</h3>
            <p>{t('about.capacity.grand.description')}</p>
          </div>
          <div className="capacity-item">
            <h3>{t('about.capacity.conference.title')}</h3>
            <p>{t('about.capacity.conference.description')}</p>
          </div>
          <div className="capacity-item">
            <h3>{t('about.capacity.cultural.title')}</h3>
            <p>{t('about.capacity.cultural.description')}</p>
          </div>
        </div>
      </section>

      <section className="contact-section">
        <h2>{t('about.contact.title')}</h2>
        <p>{t('about.contact.description')}</p>
        <div className="contact-info">
          <p>{t('about.contact.phone')}</p>
          <p>{t('about.contact.email')}</p>
          <p>{t('about.contact.address')}</p>
        </div>
      </section>
    </div>
  );
};

export default About; 