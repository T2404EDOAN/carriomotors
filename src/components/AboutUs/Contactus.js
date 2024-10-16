// src/components/ContactUsFull.js
import React from 'react';
import './ContactUs.css';

const ContactUsFull = () => {
  return (
    <div className="contact-container">
      {/* Heading Section */}
      <h1>Contact Us</h1>
      <p>
        Looking for a quick answer? Check out our <a href="#">FAQ</a> page.
        If you don’t find what you’re looking for, please contact us using one of the methods below.
      </p>

      {/* Hours and Address */}
      <div className="contact-info">
        <div className="hours-address">
          <div className="hours">
            <h3>Hours of Operation</h3>
            <p>Monday - Thursday 9:00 AM - 9:00 PM ET</p>
            <p>Friday: 9:00 AM - 6:00 PM ET</p>
          </div>
          <div className="address">
            <h3>Our Address</h3>
            <p>BMW of North America, LLC</p>
            <p>300 Chestnut Ridge Road</p>
            <p>Woodcliff Lake, NJ 07677-7731</p>
          </div>
        </div>
      </div>

      {/* Contact Sections */}
      <div className="contact-sections">
        <div className="contact-box">
          <h3>Customer Relations</h3>
          <p>For general inquiries regarding BMW's vehicles, services, products, and more.</p>
          <p><strong>1-800-831-1117</strong></p>
          <a href="#">Connect with Customer Relations</a>
        </div>
        <div className="contact-box">
          <h3>BMW Genius Hotline</h3>
          <p>Our Genius product specialists can assist with inquiries regarding BMW technology, features, and options.</p>
          <p><strong>1-844-4GENIUS (443-6487)</strong></p>
          <a href="#">Connect with Genius</a>
        </div>
        <div className="contact-box">
          <h3>BMWi Hotline</h3>
          <p>Contact our specially trained team to inquire about BMW electric or plug-in hybrid vehicles.</p>
          <p><strong>1-855-236-1025</strong></p>
          <a href="#">Connect with BMWi</a>
        </div>
      </div>

      {/* Corporate Section */}
      <div className="corporate-section">
        <h2>Corporate</h2>
        <div className="corporate-info">
          <div className="contact-box">
            <h3>BMW Financial Services</h3>
            <p>For inquiries regarding products and services for new and certified pre-owned vehicles, and more.</p>
            <p><strong>1-800-578-5000</strong></p>
            <p>Hours of Operation</p>
            <p>Monday - Thursday: 9:00 AM - 9:00 PM ET</p>
            <p>Friday: 9:00 AM - 6:00 PM ET</p>
            <a href="#">BMW Financial Services</a>
          </div>
          <div className="contact-box">
            <h3>Fraud Warnings</h3>
            <p>Learn how to identify fraudulent emails and communications purported to be BMW or a division of BMW.</p>
            <a href="#">Learn More</a>
          </div>
        </div>
      </div>

      {/* Owners Section */}
      <div className="owners-section">
        <h2>Owners</h2>
        <div className="owner-info">
          <div className="contact-box">
            <h3>BMW Key Replacement</h3>
            <p>If you need assistance with a replacement key, please contact your BMW Center directly.</p>
            <p><strong>1-888-575-5397</strong></p>
            <a href="#">Locate Dealer</a>
          </div>
          <div className="contact-box">
            <h3>Safety Recalls</h3>
            <p>Safety and emission recall information is available 24 hours a day, by phone or online.</p>
            <p><strong>1-800-525-7417</strong></p>
            <a href="#">Open Recalls</a>
          </div>
        </div>
      </div>

      {/* Shop Section */}
      <div className="shop-section">
        <h2>Shop</h2>
        <div className="shop-info">
          <div className="contact-box">
            <h3>Request a Test Drive</h3>
            <p>Discover the thrills of BMW for yourself. Contact your local BMW Center to schedule a test drive.</p>
            <a href="#">Schedule Now</a>
          </div>
          <div className="contact-box">
            <h3>Visit a Dealer</h3>
            <p>Stop by your local BMW Center today – and discover all that BMW has to offer.</p>
            <a href="#">Locate Dealer</a>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>FAQs</h2>
        <p><a href="#">Go to BMW FAQ</a></p>
      </div>

      {/* Error Reporting Section */}
      <div className="error-section">
        <h2>Error Reporting</h2>
        <p>
          While your BMW’s navigation system is powered by a global leader in location data, errors may sometimes occur. To help maintain accuracy, please report any errors or corrections to Map Creator.
        </p>
      </div>
    </div>
  );
};

export default ContactUsFull;
