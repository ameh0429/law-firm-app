import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: "url('/images/hero-legal.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '0.5rem'
      }}
    >
      <div className="hero-overlay">
        <h2>Legal Expertise You Can Trust</h2>
        <p>Serving our clients with integrity, dedication, and results.</p>
        <Link to="/booking">
          <button style={{ marginTop: '1rem' }}>Book a Consultation</button>
        </Link>
      </div>
    </section>
  );
}

export default Hero;