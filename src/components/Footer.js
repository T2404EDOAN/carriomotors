// Footer.js
import React from "react";
import "../assets/styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2 className="footer-logo">FRW</h2>
          <form className="newsletter-form">
            <input type="email" placeholder="Email" />
            <button type="submit">➔</button>
          </form>
          <p className="newsletter-text">Subscribe to the newsletter</p>
        </div>

        <div className="footer-section">
          <h3>Top cities</h3>
          <ul>
            <li>New York</li>
            <li>London</li>
            <li>Berlin</li>
            <li>Los Angeles</li>
            <li>Paris</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Explore</h3>
          <ul>
            <li>Intercity rides</li>
            <li>Limousine service</li>
            <li>Chauffeur service</li>
            <li>Private car service</li>
            <li>Airport transfer</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Intercity titles</h3>
          <ul>
            <li>San Francisco - New York</li>
            <li>New York - Washington</li>
            <li>New York - Philadelphia</li>
            <li>Abu Dhabi - Dubai</li>
            <li>London - Birmingham</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottomm">
          <p>&copy; 2023 FRW</p>
          <div className="footer-links">
            <a href="#">Terms</a>
            <a href="#">Privacy policy</a>
            <a href="#">Legal notice</a>
            <a href="#">Accessibility</a>
          </div>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              F
            </a>
            <a href="#" aria-label="Twitter">
              T
            </a>
            <a href="#" aria-label="Instagram">
              I
            </a>
            <a href="#" aria-label="LinkedIn">
              L
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
