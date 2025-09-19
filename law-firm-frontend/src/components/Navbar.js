import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container" style={{ display: 'flex', alignItems: 'center' }}>
  <img src="/images/big-palm-logo.png" alt="Big Palm Legal Logo" style={{ height: '80px' }} />
  <span style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '10px' }}>
    Big Palm Legal
  </span>
</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/team">Team</Link></li>
        <li><Link to="/booking">Booking</Link></li>
        <li><Link to="/blog">Blog</Link></li>
        <li><Link to="/testimonials">Testimonials</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/admin/login">Admin</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;