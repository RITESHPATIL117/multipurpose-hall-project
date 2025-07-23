import React from 'react';
import { Link } from 'react-router-dom';
import './ServicePage.css';

const Decorations = () => {
  const packages = [
    {
      name: "Basic Package",
      price: "₹25,000",
      features: [
        "Basic Stage Decoration",
        "Table Centerpieces",
        "Entryway Decoration",
        "Basic Lighting Setup",
        "Basic Floral Arrangements"
      ],
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Premium Package",
      price: "₹50,000",
      features: [
        "Elaborate Stage Design",
        "Premium Floral Arrangements",
        "Custom Backdrop",
        "Advanced Lighting Effects",
        "Themed Table Settings",
        "Ceiling Decorations",
        "Photo Booth Setup"
      ],
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Luxury Package",
      price: "₹1,00,000",
      features: [
        "Custom Theme Design",
        "Premium Floral Installations",
        "LED Wall Setup",
        "Advanced Lighting & Effects",
        "Custom Furniture Arrangement",
        "Premium Photo Booth",
        "Outdoor Decoration",
        "VIP Area Setup"
      ],
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className="service-page">
      <div className="service-hero">
        <h1>Decorations</h1>
        <p>Transform your venue into a magical space with our premium decoration services</p>
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
        <h2>Our Decoration Gallery</h2>
        <div className="gallery-grid">
          <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Decoration 1" />
          <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Decoration 2" />
          <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Decoration 3" />
        </div>
      </div>

      <div className="service-cta">
        <h2>Need a Custom Decoration Package?</h2>
        <p>We can create a personalized decoration package tailored to your specific needs and theme.</p>
        <Link to="/contact" className="contact-btn">Contact Us</Link>
      </div>
    </div>
  );
};

export default Decorations; 