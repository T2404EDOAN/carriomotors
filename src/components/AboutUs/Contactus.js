import React from "react";
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      {/* Header Section */}
      <section className="header-section">
        <h1>Contact Us</h1>
        <p>
          Looking for a quick answer? Check out our <a href="#">FAQ page</a>.
          If you don’t find what you’re looking for, please contact us using one
          of the methods below.
        </p>
      </section>

      {/* Contact Information Section */}
      <section className="contact-info">
        <div className="contact-box">
          <i className="fas fa-headset"></i>
          <h3>Customer Relations</h3>
          <p>
            For general inquiries regarding BMW's vehicles, services, products,
            and more.
          </p>
          <p><strong>1-800-831-1117</strong></p>
          <a href="#">Connect with Customer Relations</a>
        </div>

        <div className="contact-box">
          <i className="fas fa-cogs"></i>
          <h3>BMW Genius Hotline</h3>
          <p>
            Our Genius product specialists can assist with inquiries regarding
            BMW technology, features, and options.
          </p>
          <p><strong>1-844-4GENIUS (443-6487)</strong></p>
          <a href="#">Connect with BMW Genius</a>
        </div>

        <div className="contact-box">
          <i className="fas fa-bolt"></i>
          <h3>BMWi Hotline</h3>
          <p>
            Contact our specially trained team to inquire about BMW electric or
            plug-in hybrid vehicles.
          </p>
          <p><strong>1-855-236-1025</strong></p>
          <a href="#">Connect with BMWi</a>
        </div>
      </section>

      {/* Corporate Information Section */}
      <section className="corporate-info">
        <div className="contact-box">
          <i className="fas fa-money-check-alt"></i>
          <h3>BMW Financial Services</h3>
          <p>
            For inquiries regarding products and services for new and certified
            pre-owned vehicles, and more.
          </p>
          <p><strong>1-800-578-5000</strong></p>
          <a href="#">BMW Financial Services</a>
        </div>

        <div className="contact-box">
          <i className="fas fa-exclamation-triangle"></i>
          <h3>Safety Recalls</h3>
          <p>
            Safety and emission recall information is available 24 hours a day,
            by phone or online.
          </p>
          <p><strong>1-800-525-7417</strong></p>
          <a href="#">Open Recalls</a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>FAQs</h2>
        <p><a href="#">Go to BMW FAQ</a></p>
      </section>

      {/* Error Reporting Section */}
      <section className="error-reporting">
        <h2>Error Reporting</h2>
        <p>
          If you notice any errors or inaccuracies in BMW's services or products, please report them to us.
        </p>
      </section>
    </div>
  );
};

export default ContactUs;
