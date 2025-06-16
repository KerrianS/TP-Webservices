import React from 'react';
import './home.css';

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Discover Your Next Adventure</h1>
        <p>Explore the world with OpomlyTravel</p>
      </div>

      <div className="features-section">
        <div className="feature-card">
          <i className="fas fa-plane"></i>
          <h3>Flight Booking</h3>
          <p>Find the best deals on flights worldwide</p>
        </div>

        <div className="feature-card">
          <i className="fas fa-hotel"></i>
          <h3>Hotel Reservations</h3>
          <p>Book comfortable stays at amazing prices</p>
        </div>

        <div className="feature-card">
          <i className="fas fa-map-marked-alt"></i>
          <h3>Travel Packages</h3>
          <p>Complete vacation packages for unforgettable experiences</p>
        </div>
      </div>

      <div className="popular-destinations">
        <h2>Popular Destinations</h2>
        <div className="destinations-grid">
          <div className="destination-card">
            <img src="/images/paris.jpg" alt="Paris" />
            <h4>Paris, France</h4>
            <p>The city of love and lights</p>
          </div>
          <div className="destination-card">
            <img src="/images/tokyo.jpg" alt="Tokyo" />
            <h4>Tokyo, Japan</h4>
            <p>Where tradition meets future</p>
          </div>
          <div className="destination-card">
            <img src="/images/bali.jpg" alt="Bali" />
            <h4>Bali, Indonesia</h4>
            <p>Paradise island getaway</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Start Your Journey?</h2>
        <button className="cta-button">Plan Your Trip Now</button>
      </div>
    </div>
  );
};

export default Home;