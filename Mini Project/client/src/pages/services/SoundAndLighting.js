import React from 'react';
import { Link } from 'react-router-dom';
import './ServicePage.css';

const SoundAndLighting = () => {
  const packages = [
    {
      name: "Basic Package",
      price: "₹30,000",
      features: [
        "Basic Sound System",
        "Basic Lighting Setup",
        "2 Speakers",
        "Basic DJ Setup",
        "4 Hours Coverage"
      ],
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Premium Package",
      price: "₹60,000",
      features: [
        "Professional Sound System",
        "Advanced Lighting Effects",
        "4 Speakers",
        "Professional DJ",
        "6 Hours Coverage",
        "Fog Machine",
        "Basic Stage Lighting"
      ],
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Luxury Package",
      price: "₹1,20,000",
      features: [
        "Premium Sound System",
        "Advanced Lighting Effects",
        "6 Speakers",
        "Professional DJ",
        "8 Hours Coverage",
        "Fog & Bubble Machines",
        "LED Wall Setup",
        "Moving Head Lights",
        "Laser Effects",
        "Custom Light Show"
      ],
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className="service-page">
      <div className="service-hero">
        <h1>Sound & Lighting</h1>
        <p>State-of-the-art sound and lighting equipment for the perfect ambiance</p>
      </div>

      <div className="service-packages">
        {packages.map((pkg, index) => (
          <div key={index} className="package-card">
            <div className="package-image">
              <img src={pkg.image} alt={pkg.name} />
            </div>
            <div className="package-content">
              <h2>{pkg.name}</h2>
              <div className="package-price">{pkg.price}</div>
              <ul className="package-features">
                {pkg.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <Link to="/contact" className="enquire-btn">Enquire Now</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="service-gallery">
        <h2>Our Sound & Lighting Gallery</h2>
        <div className="gallery-grid">
          <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Sound & Lighting 1" />
          <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Sound & Lighting 2" />
          <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Sound & Lighting 3" />
        </div>
      </div>

      <div className="service-cta">
        <h2>Need Custom Sound & Lighting Setup?</h2>
        <p>We can create a personalized sound and lighting setup tailored to your event's specific needs.</p>
        <Link to="/contact" className="contact-btn">Contact Us</Link>
      </div>
    </div>
  );
};

export default SoundAndLighting; 