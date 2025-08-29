import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="hero">
      <h2>Legal Expertise You Can Trust</h2>
      <p>Serving clients with integrity, dedication, and results.</p>
      <Link to="/booking">
        <button>Book a Consultation</button>
      </Link>
    </section>
  );
}

export default Hero;