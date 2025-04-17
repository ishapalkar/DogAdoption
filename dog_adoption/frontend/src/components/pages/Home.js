import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>Find Your Forever Friend</h1>
        <p>Browse our available dogs and give them a loving home</p>
        <Link to="/dogs" className="btn btn-primary btn-lg">
          View Available Dogs
        </Link>
      </div>
      
      <div className="home-sections">
        <div className="section">
          <h2>Why Adopt?</h2>
          <p>
            When you adopt a dog, you're not just bringing home a pet; you're saving a life. 
            Every dog in our system needs a second chance at a loving home. By adopting, 
            you're making room for another dog in need.
          </p>
        </div>
        
        <div className="section">
          <h2>Our Mission</h2>
          <p>
            We're dedicated to finding loving homes for all dogs, regardless of their age, 
            breed, or history. We believe every dog deserves a chance at happiness and a 
            forever home with a caring family.
          </p>
        </div>
        
        <div className="section">
          <h2>How It Works</h2>
          <p>
            Browse our available dogs, create an account, and reach out to us to start the 
            adoption process. Our team will guide you through every step to ensure a smooth 
            transition for both you and your new companion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;