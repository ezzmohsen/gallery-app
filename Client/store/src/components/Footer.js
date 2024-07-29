import React from 'react';
import './Footer.css'; 
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="newsletter">
          <h3>Subscribe To Our Newsletter</h3>
          <p>Sign up for our e-mail to get latest news.</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Email Address" />
            <button>Subscribe</button>
          </div>
        </div>
        <div className="footer-columns">
          <div className="footer-column">
            <img src={logo} alt="Art Gallery" className="footer-logo" />
            <p>Need Help?</p>
            <p>info@artGallery-gallery.com</p>
            <p>+20 1023456</p>
            <p>Address: 21 El mahrane street Cairo, Egypt</p>
          </div>
          <div className="footer-column">
            <h4>Information</h4>
            <ul>
              <li>Contact</li>
              <li>Wishlist</li>
              <li>About Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Categories</h4>
            <ul>
              <li>Antiques</li>
              <li>Tableaux</li>
              <li>Furniture</li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>About Us</h4>
            <p>We think everything in life is ART...</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © Artique Gallery. Developed By Digital Hub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
