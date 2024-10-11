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
          <h3>About us</h3>
          <ul>
            <li>Carrio Motors</li>
            <li>Store system</li>
            <li>Contact</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Services and finance</h3>
          <ul>
            <li>Warranty policy</li>
            <li>Finance policy</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <ul>
            <li>Facebook</li>
            <li>Zalo</li>
            <li>Email</li>
            <li>Youtube</li>
            <li>Tiktok</li>
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
