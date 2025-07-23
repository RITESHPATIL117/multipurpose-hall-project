import React from 'react';
import { Link } from 'react-router-dom';
import './ServicePage.css';

const Catering = () => {
  const packages = [
    {
      name: "Basic Package",
      price: "₹500 per person",
      features: [
        "3 Course Meal",
        "Soft Drinks",
        "Basic Dessert",
        "Professional Staff",
        "Basic Table Setup"
      ],
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Premium Package",
      price: "₹1,000 per person",
      features: [
        "5 Course Meal",
        "Premium Beverages",
        "Live Cooking Stations",
        "Premium Dessert Selection",
        "Professional Staff",
        "Premium Table Setup",
        "Custom Menu Options"
      ],
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Luxury Package",
      price: "₹2,000 per person",
      features: [
        "7 Course Gourmet Meal",
        "Premium Alcoholic Beverages",
        "Multiple Live Cooking Stations",
        "International Cuisine Options",
        "Premium Dessert Buffet",
        "Professional Staff",
        "Luxury Table Setup",
        "Custom Menu Design",
        "Chef's Special Creations"
      ],
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <div className="service-page">
      <div className="service-hero">
        <h1>Catering Services</h1>
        <p>Delight your guests with our exquisite catering services and diverse menu options</p>
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
        <h2>Our Catering Gallery</h2>
        <div className="gallery-grid">
          <img src="https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Catering 1" />
          <img src="https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Catering 2" />
          <img src="https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Catering 3" />
        </div>
      </div>

      <div className="service-cta">
        <h2>Need a Custom Menu?</h2>
        <p>We can create a personalized menu tailored to your specific preferences and dietary requirements.</p>
        <Link to="/contact" className="contact-btn">Contact Us</Link>
      </div>
    </div>
  );
};

export default Catering; 