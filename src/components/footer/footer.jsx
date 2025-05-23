import React from 'react';
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <footer className="bg-primary text-white text-center py-3 mt-5">
      <div className="container">
        <p className="mb-1">&copy; {new Date().getFullYear()} My Blog App. All rights reserved.</p>
        <small>
          <Link to="/about" className="text-white me-3">About Us</Link>
          <Link to="/contact" className="text-white">Contact Us</Link>
        </small>
      </div>
    </footer>
  );
}

export default Footer;