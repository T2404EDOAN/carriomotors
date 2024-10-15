// src/components/WarrantyPage.js
import React, { useState } from 'react';
import './Warranty.css';

const Warranty = () => {
  // State to track the active tab
  
  const [activeTab, setActiveTab] = useState('manufacturer');

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="warranty-page">
      {/* Mercedes Genuine Warranty Header */}
      <div className="warranty-header">
        <div className="header-text">
          <h1>Mercedes Genuine Warranty</h1>
          <p>Worry-free to enjoy your ride.</p>
        </div>
      </div>

      {/* Tabs for Warranty Options */}
      <div className="warranty-tabs">
        <div
          className={`tab ${activeTab === 'manufacturer' ? 'active' : ''}`}
          onClick={() => handleTabClick('manufacturer')}
        >
          Manufacturer Warranty
        </div>
        <div
          className={`tab ${activeTab === 'spare-parts' ? 'active' : ''}`}
          onClick={() => handleTabClick('spare-parts')}
        >
          Spare Parts Warranty
        </div>
      </div>

      {/* Content for Manufacturer Warranty */}
      {activeTab === 'manufacturer' && (
        <>
          <div className="warranty-content">
            <img src="./assets/images/Bmv_images/1.jpg" alt="Placeholder" className="warranty-image" />
            <div className="warranty-details">
              <h2>On the safe side from the outset.</h2>
              <p>
                <strong>MERCEDES-BENZ PASSENGER CARS</strong><br />
                A three-year new vehicle warranty with unlimited mileage from the date of invoicing to
                the customer has been provided on all Mercedes-Benz passenger cars throughout Vietnam.
              </p>
              <p>
                <strong>MERCEDES-BENZ VANS (V-Class, Vito)</strong><br />
                A three-year new vehicle warranty as of the date of invoicing to the customer or 200,000 Km
                (whichever comes first) has been provided on all Mercedes-Benz Vans throughout Vietnam.
              </p>
            </div>
          </div>

          <div className="warranty-content alt">
            <div className="warranty-details">
              <span className="extended-warranty-label">Extended Warranty Program</span>
              <h2>Worry-free to enjoy the ride.</h2>
              <p>
                The Extended Limited Warranty Programme offers 1-year & 2-year plans for you to choose from.
                You will be enjoying an additional 1-year or 2-year extended warranty with unlimited mileage coverage.
              </p>
              <ul>
                <li>Flexibility to choose the plan that suits you best.</li>
                <li>Enhanced resale value for your vehicle.</li>
                <li>Unlimited mileage coverage, giving you peace of mind no matter how far you travel.</li>
                <li>Access to trusted repair services at all authorized dealers, ensuring genuine parts and top-notch service quality.</li>
                <li>Exclusive privileges such as 24-hour Star Assist (RSA) and more.</li>
              </ul>
            </div>
            <img src="./assets/images/Bmv_images/1.jpg" alt="Placeholder" className="warranty-image right-aligned" />
          </div>

          <div className="warranty-content">
            <img src="./assets/images/Bmv_images/1.jpg" alt="Placeholder" className="warranty-image" />
            <div className="warranty-details">
              <h2>Combat the traces of everyday wear.</h2>
              <p>
                A scratch in the outside mirror on the way to your holiday destination – what now?
                Mercedes-Benz helps. Scratches, dents, or stone chips can hardly be avoided during the
                service life of a vehicle. That is what Mercedes-Benz SmallRepair is all about.
              </p>
              <p>Mercedes-Benz quality, of course.</p>
            </div>
          </div>
        </>
      )}

      {/* Content for Spare Parts Warranty */}
      {activeTab === 'spare-parts' && (
        <>
          <div className="warranty-content">
            <img src="./1.jpg" alt="Placeholder" className="warranty-image" />
            <div className="warranty-details">
              <h2>The seal of quality for spare parts.</h2>
              <p>
                Mercedes-Benz genuine parts come with a two-year warranty with unlimited mileage
                from the date of installation at Mercedes-Benz Vietnam authorized dealers.
              </p>
            </div>
          </div>

          <div className="warranty-content alt">
            <div className="warranty-details">
              <span className="extended-warranty-label">Extended Warranty Program</span>
              <h2>Worry-free to enjoy the ride.</h2>
              <p>
                The Extended Limited Warranty Programme offers 1-year & 2-year plans for you to choose from.
                You will be enjoying an additional 1-year or 2-year extended warranty with unlimited mileage coverage.
              </p>
              <ul>
                <li>Flexibility to choose the plan that suits you best.</li>
                <li>Enhanced resale value for your vehicle.</li>
                <li>Unlimited mileage coverage, giving you peace of mind no matter how far you travel.</li>
                <li>Access to trusted repair services at all authorized dealers, ensuring genuine parts and top-notch service quality.</li>
                <li>Exclusive privileges such as 24-hour Star Assist (RSA) and more.</li>
              </ul>
            </div>
            <img src="./1.jpg" alt="Placeholder" className="warranty-image right-aligned" />
          </div>

          <div className="warranty-content">
            <img src="./1.jpg" alt="Placeholder" className="warranty-image" />
            <div className="warranty-details">
              <h2>The matching solution for any issue.</h2>
              <p>
                "Arranged to go to a party and caught up in a collision? What can I do?"
                Mercedes-Benz helps. Even damage after a collision and major accident damage is
                carefully rectified by experienced Mercedes-Benz specialists.
              </p>
            </div>
          </div>
        </>
      )}
       {/* First part is done. Now let's work on the second part. */}
      {/* Separator Header Section */}
      <div className="separator-header">
        <div className="header-content">
          <img src="./assets/images/Bmv_images/1.jpg" alt="BMW Logo" className="header-logo" />
          <h1>“I’M EQUIPPED FOR EVERYTHING. EVEN THE UNEXPECTED”</h1>
          <p>BMW Warranty</p>
          <button className="contact-button">CONTACT US</button>
        </div>
      </div>
      {/* Your benefits section */}
      <div className="benefits-section">
        <h2>Your benefits at a glance</h2>
        <p>
          Carrio Motors Dealer grants the following coverage:
        </p>
        <ul>
          <li>3-year warranty for the paintwork.</li>
          <li>12-year warranty against rust perforation.</li>
          <li>24-month warranty for replacing original parts, installing accessories due to damage stemming from the manufacturers in terms of quality and technical faults with no distance limit.</li>
        </ul>
        <p>
          Thanks to your BMW Warranty you can enjoy sheer driving pleasure. You can count on our network of Authorised BMW Dealers in Vietnam to ensure a quick and professional resolution of any necessary repairs and take care of all your needs.
        </p>
        <p>For more information about the BMW Warranty please contact your local authorised Carrio Motors.</p>
      </div>

      {/* Second Part Sections with Images and Text */}
      <div className="warranty-content">
        <div className="warranty-details">
          <h2>New Car Warranty</h2>
          <p>
            The BMW Three Year Unlimited Mileage Retailer Warranty gives you peace of mind for the first three years of your ownership and even includes BMW Roadside Assistance. As always, any work you do require will be completed by a trained BMW Technician at a BMW Authorised Workshop.
          </p>
        </div>
        <img src="./1.jpg" alt="Placeholder" className="warranty-image" />
      </div>

      <div className="warranty-content alt">
        <img src="./1.jpg" alt="Placeholder" className="warranty-image" />
        <div className="warranty-details">
          <h2>BMW i Warranty</h2>
          <p>
            The BMW i Warranty offers three-year unlimited mileage cover from the date of first registration. The warranty for your BMW i vehicle also includes BMW Roadside Assistance and protection for the BMW i high voltage battery for up to eight years from first registration or 100,000 miles, whichever comes first.
          </p>
        </div>
      </div>

      <div className="warranty-content">
        <div className="warranty-details">
          <h2>BMW PHEV Warranty</h2>
          <p>
            The BMW PHEV warranty offers three-year unlimited mileage cover from the date of first registration. It includes BMW Roadside Assistance and protection for the BMW high voltage battery. The duration and mileage of the PHEV battery warranty vary by model.
          </p>
          <p>
            Generation 3 or 4 PHEV batteries - 6 years or 62,000 miles from the first registration date, whichever occurs first.
          </p>
          <p>
            Generation 5 PHEV batteries - 8 years or 100,000 miles from the first registration date, whichever occurs first.
          </p>
        </div>
        <img src="./1.jpg" alt="Placeholder" className="warranty-image" />
      </div>

      <div className="warranty-content alt">
        <img src="./1.jpg" alt="Placeholder" className="warranty-image" />
        <div className="warranty-details">
          <h2>Genuine BMW Parts</h2>
          <p>
            We offer excellent warranty on our BMWs as well as our Genuine BMW Parts. All Genuine BMW Parts come with a two-year warranty as standard for added peace of mind.
          </p>
        </div>
      </div>
       {/* New Audi Warranties Section */}
       <div className="audi-warranty-header">
        <div className="audi-warranty-overlay">
          <h1>Audi Warranties</h1>
          <p>Get peace of mind with Audi Extended warranties</p>
        </div>
      </div>

      <div className="audi-warranty-content">
        {/* Audi logo */}
        <div className="audi-logo">
          <img src="./1.jpg" alt="Audi Logo" />
        </div>

        {/* Warranty Cards */}
        <div className="warranty-cards">
          <div className="warranty-card">
            <img src="./1.jpg" alt="Audi New Vehicle" className="warranty-card-image" />
            <div className="warranty-card-content">
              <h2>New Vehicle Limited Warranty</h2>
              <p>
                The Audi New Vehicle Limited Warranty lasts four years or 50,000 miles—whichever occurs first.
                In addition, enjoy four years of Audi 24-Hour Roadside Assistance at no additional cost.
              </p>
              <button className="learn-more-button">Learn more about Audi Warranty</button>
            </div>
          </div>

          <div className="warranty-card">
            <img src="./1.jpg" alt="Audi Certified Pre-Owned" className="warranty-card-image" />
            <div className="warranty-card-content">
              <h2>Audi Certified pre-owned Limited Warranty</h2>
              <p>
                The Audi Certified pre-owned (CPO) Limited Warranty features coverage for 1 year or 20,000 miles—whichever occurs first. See your owner's manual or local Audi dealer for exclusions and limitations.
              </p>
              <button className="learn-more-button">View more</button>
            </div>
          </div>
        </div>
      </div>
      <div className="warranty-page">
      {/* Porsche Approved Warranty Header */}
      <div className="porsche-warranty-header">
        <div className="porsche-warranty-overlay">
          <h1>Porsche Approved Warranty</h1>
          <p>Get peace of mind with Porsche Approved warranties</p>
        </div>
      </div>

      {/* Tabs for Navigation */}
      <div className="warranty-tabs">
        <button className="tab" onClick={() => handleScrollToSection('benefits')}>
          Your benefits
        </button>
        <button className="tab" onClick={() => handleScrollToSection('types')}>
          Warranty types
        </button>
        <button className="tab" onClick={() => handleScrollToSection('info')}>
          Further information
        </button>
      </div>

      {/* Benefits Section */}
      <div id="benefits" className="content-section">
        <h2>Your benefits at a glance</h2>
        <p>With the Porsche Approved Warranty, you can enjoy...</p>
        <ul>
          <li>Valid worldwide – redeemable at any Porsche Centre</li>
          <li>Warranty coverage for Porsche vehicles up to 15 years...</li>
        </ul>
        <img src="./1.jpg" alt="Placeholder" className="content-image" />
      </div>

      {/* Warranty Types Section */}
      <div id="types" className="content-section">
        <h2>Warranty types</h2>
        <div className="warranty-card">
          <img src="./1.jpg" alt="Warranty type" className="warranty-card-image" />
          <p>The Porsche Approved Warranty is available in the following variants...</p>
        </div>
      </div>

      {/* Further Information Section */}
      <div id="info" className="content-section">
        <h2>Further information</h2>
        <div className="info-cards-scrollable">
          <div className="info-card">
            <img src="./1.jpg" alt="111 Point Check" />
            <h3>111 Point Check</h3>
            <p>Using a 111 Point Check list...</p>
          </div>
          <div className="info-card">
            <img src="./1.jpg" alt="Porsche Assistance" />
            <h3>Porsche Assistance</h3>
            <p>In combination with our warranty services...</p>
          </div>
          <div className="info-card">
            <img src="./1.jpg" alt="Porsche Approved Pre-Owned Cars" />
            <h3>Porsche Approved Pre-Owned Cars</h3>
            <p>Our Porsche Approved Pre-Owned cars are just as thrilling as they were when they were first driven. And with our Porsche Approved Warranty, you have nothing to worry about.</p>
          </div>
          <div className="info-card">
            <img src="./1.jpg" alt="Porsche Finder" />
            <h3>Porsche Finder</h3>
            <p>Discover the attractive range of pre-owned cars at your Porsche Centre and in our online pre-owned car search.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Warranty;
