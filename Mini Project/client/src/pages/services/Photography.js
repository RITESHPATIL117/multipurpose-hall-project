import React from 'react';
import { Link } from 'react-router-dom';
import './ServicePage.css';

const Photography = () => {
  const packages = [
    {
      name: "Basic Package",
      price: "₹20,000",
      features: [
        "4 Hours Coverage",
        "100 Edited Photos",
        "Online Gallery",
        "Basic Photo Editing",
        "USB Drive Delivery"
      ],
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Premium Package",
      price: "₹40,000",
      features: [
        "6 Hours Coverage",
        "250 Edited Photos",
        "Online Gallery",
        "Premium Photo Editing",
        "USB Drive Delivery",
        "Photo Book",
        "Drone Shots",
        "Same Day Preview"
      ],
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      name: "Luxury Package",
      price: "₹80,000",
      features: [
        "8 Hours Coverage",
        "500 Edited Photos",
        "Online Gallery",
        "Premium Photo Editing",
        "USB Drive Delivery",
        "Premium Photo Book",
        "Drone Shots",
        "Same Day Preview",
        "Video Coverage",
        "Photo Booth",
        "Custom Album Design",
        "Engagement Shoot"
      ],
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  ];

  return (
    <div className="service-page">
      <div className="service-hero">
        <h1>Photography Services</h1>
        <p>Capture your special moments with our professional photography services</p>
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
        <h2>Our Photography Gallery</h2>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <img 
              key={index}
              src={image} 
              alt={`Photography ${index + 1}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/400x300?text=Photography+Image";
              }}
            />
          ))}
        </div>
      </div>

      <div className="service-cta">
        <h2>Need Custom Photography Package?</h2>
        <p>We can create a personalized photography package tailored to your specific needs and preferences.</p>
        <Link to="/contact" className="contact-btn">Contact Us</Link>
      </div>
    </div>
  );
};

export default Photography; 