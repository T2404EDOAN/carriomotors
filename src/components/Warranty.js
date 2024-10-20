// src/components/WarrantyPage.js
import React, { useState } from "react";
import "./Warranty.css";
import warranty1 from "../assets/images/Warranty/Merc1.jpg";
import warranty2 from "../assets/images/Warranty/Merc2.jpg";
import warranty3 from "../assets/images/Warranty/Merc3.jpg";
import bmwlogo from "../assets/images/Warranty/bmwlogo.png";
import icon1 from "../assets/images/Warranty/Merc5.jpg";
import icon2 from "../assets/images/Warranty/Merc1.jpg";
import icon3 from "../assets/images/Warranty/Merc4.jpg";
import icon4 from "../assets/images/Warranty/bmw1111.jpg";
import icon5 from "../assets/images/Warranty/bmwa.jpg";
import icon6 from "../assets/images/Warranty/bmw.webp";
import icon7 from "../assets/images/Warranty/BMWparts.jpg";
import icon8 from "../assets/images/Warranty/Audi_logo.png";
import icon9 from "../assets/images/Warranty/Audi1.jpg";
import icon10 from "../assets/images/Warranty/Audi2.jpg";
import icon11 from "../assets/images/Warranty/Porsche1.jpg";
import icon12 from "../assets/images/Warranty/Porsche2.jpg";
import icon13 from "../assets/images/Warranty/Porsche3_11zon.jpg";
import icon14 from "../assets/images/Warranty/Porscher4_11zon.jpg";
import icon15 from "../assets/images/Warranty/Porsche5_11zon.jpg";
import icon16 from "../assets/images/Warranty/Porsche6_11zon.jpg";
import icon17 from "../assets/images/Warranty/bmwlogo.png";
import icon18 from "../assets/images/Warranty/bmwlogo.png";

const Warranty = () => {
  // State to track the active tab

  const [activeTab, setActiveTab] = useState("manufacturer");

  // Function to handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
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
          className={`tab ${activeTab === "manufacturer" ? "active" : ""}`}
          onClick={() => handleTabClick("manufacturer")}
        >
          Manufacturer Warranty
        </div>
        <div
          className={`tab ${activeTab === "spare-parts" ? "active" : ""}`}
          onClick={() => handleTabClick("spare-parts")}
        >
          Spare Parts Warranty
        </div>
      </div>

      {/* Content for Manufacturer Warranty */}
      {activeTab === "manufacturer" && (
        <>
          <div className="warranty-content">
            <div className="warranty-content-img">
              <img src={warranty1} alt="Warranty1" className="warranty-image" />
            </div>

            <div className="warranty-details">
              <h2>On the safe side from the outset.</h2>
              <p>
                <strong>MERCEDES-BENZ PASSENGER CARS</strong>
                <br />A three-year new vehicle warranty with unlimited mileage
                from the date of invoicing to the customer has been provided on
                all Mercedes-Benz passenger cars throughout Vietnam.
              </p>
              <p>
                <strong>MERCEDES-BENZ VANS (V-Class, Vito)</strong>
                <br />A three-year new vehicle warranty as of the date of
                invoicing to the customer or 200,000 Km (whichever comes first)
                has been provided on all Mercedes-Benz Vans throughout Vietnam.
              </p>
            </div>
          </div>

          <div className="warranty-content">
            <div className="warranty-details">
              <span className="extended-warranty-label">
                Extended Warranty Program
              </span>
              <h2>Worry-free to enjoy the ride.</h2>
              <p>
                The Extended Limited Warranty Programme offers 1-year & 2-year
                plans for you to choose from. You will be enjoying an additional
                1-year or 2-year extended warranty with unlimited mileage
                coverage.
              </p>
              <ul>
                <li>Flexibility to choose the plan that suits you best.</li>
                <li>Enhanced resale value for your vehicle.</li>
                <li>
                  Unlimited mileage coverage, giving you peace of mind no matter
                  how far you travel.
                </li>
                <li>
                  Access to trusted repair services at all authorized dealers,
                  ensuring genuine parts and top-notch service quality.
                </li>
                <li>
                  Exclusive privileges such as 24-hour Star Assist (RSA) and
                  more.
                </li>
              </ul>
            </div>
            <div className="warranty-content-img">
              <img src={warranty2} alt="warranty2" className="warranty-image" />
            </div>
          </div>

          <div className="warranty-content">
            <div className="warranty-content-img">
              <img
                src={warranty3}
                alt="wearingtrace"
                className="warranty-image"
              />
            </div>

            <div className="warranty-details">
              <h2>Combat the traces of everyday wear.</h2>
              <p>
                A scratch in the outside mirror on the way to your holiday
                destination – what now? Mercedes-Benz helps. Scratches, dents,
                or stone chips can hardly be avoided during the service life of
                a vehicle. That is what Mercedes-Benz SmallRepair is all about.
              </p>
              <p>Mercedes-Benz quality, of course.</p>
            </div>
          </div>
        </>
      )}

      {/* Content for Spare Parts Warranty */}
      {activeTab === "spare-parts" && (
        <>
          <div className="warranty-content">
            <div className="warranty-content-img">
              <img src={icon1} alt="icon1" className="warranty-image" />
            </div>

            <div className="warranty-details">
              <h2>The seal of quality for spare parts.</h2>
              <p>
                Mercedes-Benz genuine parts come with a two-year warranty with
                unlimited mileage from the date of installation at Mercedes-Benz
                Vietnam authorized dealers.
              </p>
            </div>
          </div>

          <div className="warranty-content">
            <div className="warranty-details">
              <span className="extended-warranty-label">
                Extended Warranty Program
              </span>
              <h2>Worry-free to enjoy the ride.</h2>
              <p>
                The Extended Limited Warranty Programme offers 1-year & 2-year
                plans for you to choose from. You will be enjoying an additional
                1-year or 2-year extended warranty with unlimited mileage
                coverage.
              </p>
              <ul>
                <li>Flexibility to choose the plan that suits you best.</li>
                <li>Enhanced resale value for your vehicle.</li>
                <li>
                  Unlimited mileage coverage, giving you peace of mind no matter
                  how far you travel.
                </li>
                <li>
                  Access to trusted repair services at all authorized dealers,
                  ensuring genuine parts and top-notch service quality.
                </li>
                <li>
                  Exclusive privileges such as 24-hour Star Assist (RSA) and
                  more.
                </li>
              </ul>
            </div>
            <div className="warranty-content-img">
              <img src={icon2} alt="icon2" className="warranty-image" />
            </div>
          </div>

          <div className="warranty-content">
            <div className="warranty-content-img">
              <img src={icon3} alt="icon3" className="warranty-image" />
            </div>

            <div className="warranty-details">
              <h2>The matching solution for any issue.</h2>
              <p>
                "Arranged to go to a party and caught up in a collision? What
                can I do?" Mercedes-Benz helps. Even damage after a collision
                and major accident damage is carefully rectified by experienced
                Mercedes-Benz specialists.
              </p>
            </div>
          </div>
        </>
      )}
      {/* Separator Header Section */}
      <div className="separator-header">
        <div className="header-content">
          <img
            src={bmwlogo}
            alt="icon4"
            style={{ width: "100px", height: "100px" }}
            className="header-logo"
          />
          <h1>“I’M EQUIPPED FOR EVERYTHING. EVEN THE UNEXPECTED”</h1>
          <p>BMW Warranty</p>
          <button className="contact-button">CONTACT US</button>
        </div>
      </div>
      {/* Your benefits section */}
      <div className="benefits-section">
        <h2>Your benefits at a glance</h2>
        <p>Carrio Motors Dealer grants the following coverage:</p>
        <ul>
          <li>3-year warranty for the paintwork.</li>
          <li>12-year warranty against rust perforation.</li>
          <li>
            24-month warranty for replacing original parts, installing
            accessories due to damage stemming from the manufacturers in terms
            of quality and technical faults with no distance limit.
          </li>
        </ul>
        <p>
          Thanks to your BMW Warranty you can enjoy sheer driving pleasure. You
          can count on our network of Authorised BMW Dealers in Vietnam to
          ensure a quick and professional resolution of any necessary repairs
          and take care of all your needs.
        </p>
        <p>
          For more information about the BMW Warranty please contact your local
          authorised Carrio Motors.
        </p>
      </div>

      {/* Second Part Sections with Images and Text */}
      <div className="warranty-content">
        <div className="warranty-details">
          <h2>New Car Warranty</h2>
          <p>
            The BMW Three Year Unlimited Mileage Retailer Warranty gives you
            peace of mind for the first three years of your ownership and even
            includes BMW Roadside Assistance. As always, any work you do require
            will be completed by a trained BMW Technician at a BMW Authorised
            Workshop.
          </p>
        </div>
        <div className="warranty-content-img">
          <img src={icon4} alt="icon6" className="warranty-image" />
        </div>
      </div>

      <div className="warranty-content">
        <div className="warranty-details">
          <h2>BMW i Warranty</h2>
          <p>
            The BMW i Warranty offers three-year unlimited mileage cover from
            the date of first registration. The warranty for your BMW i vehicle
            also includes BMW Roadside Assistance and protection for the BMW i
            high voltage battery for up to eight years from first registration
            or 100,000 miles, whichever comes first.
          </p>
        </div>
        <div className="warranty-content-img">
          <img src={icon5} alt="Placeholder" className="warranty-image" />
        </div>
      </div>

      <div className="warranty-content">
        <div className="warranty-details">
          <h2>BMW PHEV Warranty</h2>
          <p>
            The BMW PHEV warranty offers three-year unlimited mileage cover from
            the date of first registration. It includes BMW Roadside Assistance
            and protection for the BMW high voltage battery. The duration and
            mileage of the PHEV battery warranty vary by model.
          </p>
          <p>
            Generation 3 or 4 PHEV batteries - 6 years or 62,000 miles from the
            first registration date, whichever occurs first.
          </p>
          <p>
            Generation 5 PHEV batteries - 8 years or 100,000 miles from the
            first registration date, whichever occurs first.
          </p>
        </div>
        <div className="warranty-content-img">
          <img src={icon6} alt="icon6" className="warranty-image" />
        </div>
      </div>

      <div className="warranty-content">
        <div className="warranty-details">
          <h2>Genuine BMW Parts</h2>
          <p>
            We offer excellent warranty on our BMWs as well as our Genuine BMW
            Parts. All Genuine BMW Parts come with a two-year warranty as
            standard for added peace of mind.
          </p>
        </div>
        <div className="warranty-content-img">
          <img src={icon7} alt="icon7" className="warranty-image" />
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
          <img src={icon8} alt="Audi Logo" />
        </div>

        {/* Warranty Cards */}

        <div className="warranty-cards">
          <div className="warranty-card">
            <img
              src={icon9}
              alt="Audi New Vehicle"
              className="warranty-card-image"
            />
            <div className="warranty-card-content">
              <h2>New Vehicle Limited Warranty</h2>
              <p>
                The Audi New Vehicle Limited Warranty lasts four years or 50,000
                miles—whichever occurs first. In addition, enjoy four years of
                Audi 24-Hour Roadside Assistance at no additional cost.
              </p>
              <button className="learn-more-button">
                Learn more about Audi Warranty
              </button>
            </div>
          </div>

          <div className="warranty-card">
            <div className="warranty-card-content">
              <h2>Audi Certified pre-owned Limited Warranty</h2>
              <p>
                The Audi Certified pre-owned (CPO) Limited Warranty features
                coverage for 1 year or 20,000 miles—whichever occurs first. See
                your owner's manual or local Audi dealer for exclusions and
                limitations.
              </p>
              <button className="learn-more-button">View more</button>
            </div>
            <img
              src={icon10}
              alt="Audi Certified Pre-Owned"
              className="warranty-card-image"
            />
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
          <button
            className="tab"
            onClick={() => handleScrollToSection("benefits")}
          >
            Your benefits
          </button>
          <button
            className="tab"
            onClick={() => handleScrollToSection("types")}
          >
            Warranty types
          </button>
          <button className="tab" onClick={() => handleScrollToSection("info")}>
            Further information
          </button>
        </div>
        {/* Introduction Section */}
        <div id="warranty-intro" className="content-section warranty-intro">
          <h2>
            A new level of peace of mind with the Porsche Approved Warranty.
          </h2>
          <p>
            With the Porsche Approved Warranty, you can enjoy unlimited driving
            pleasure – and along with it a new level of peace of mind. Because
            no matter how often or how far you drive your Porsche, the Porsche
            Approved Warranty applies without any mileage limit during the
            contract term up to a vehicle age of 15 years – even without prior
            warranty coverage.
          </p>
        </div>
        {/* Benefits Section */}
        <div id="benefits" className="content-section benefits-row">
          <div className="benefits-details">
            <h2>Your benefits at a glance</h2>
            <ul>
              <li>Valid worldwide – redeemable at any Porsche Centre</li>
              <li>
                Warranty coverage for Porsche vehicles up to an age of 15 years,
                with the possibility to conclude the warranty for vehicles of up
                to 14 years of age / 125,000 miles – even without prior warranty
                coverage.
              </li>
              <li>
                Flexible terms of 12, 24 or 36 months – without mileage
                limitation during the duration of the warranty period.
              </li>
              <li>
                Coverage of all vehicle components* and assumption of 100% of
                labour and material costs up to the vehicle’s current value –
                without any deductible.
              </li>
              <li>
                Ensuring Porsche value retention and longevity – exclusive use
                of Porsche Genuine Parts.
              </li>
              <li>
                Increase in value, extendability and transferability – in case
                of private sale or sale to a Porsche Centre – optionally with
                the Porsche Assistance.
              </li>
            </ul>
          </div>
          <img src={icon11} alt="Porsche benefits" className="benefits-image" />
        </div>

        {/* Warranty Types Section */}
        <div id="warranty-types" className="content-section warranty-types-row">
          <div className="warranty-content-img">
            <img src={icon12} alt="Warranty Types" className="warranty-image" />
          </div>
          <div className="warranty-text">
            <h2>Warranty types</h2>
            <p>
              The Porsche Approved Warranty is available in the following
              variants:
            </p>
            <ul>
              <li>
                As an extension warranty to extend an existing new vehicle
                warranty or Porsche Approved Warranty.
              </li>
              <li>
                As a pre-owned vehicle warranty when purchasing a Porsche
                Approved Pre-Owned Car.
              </li>
              <li>
                As a stand-alone warranty for a Porsche vehicle without existing
                warranty protection after successful completion of the 111 Point
                Check*
              </li>
            </ul>
            <p>
              * Carrying out the 111 Point Check involves additional costs,
              which your Porsche Centre can provide further information on. For
              standalone policies, the warranty policy must be added the same
              day as completion of the 111 Point Check.
            </p>
          </div>
        </div>

        {/* Further Information Section */}
        <div id="info" className="content-section">
          <h2>Further information</h2>
          <div className="info-cards-scrollable">
            <div className="info-card">
              <img src={icon13} alt="111 Point Check" />
              <h3>111 Point Check</h3>
              <p>
                Using a 111 Point Check list, our technicians meticulously check
                the functionality of the entire vehicle as well as the complete
                vehicle documentation and history. For your peace of mind
              </p>
            </div>
            <div className="info-card">
              <img src={icon14} alt="Porsche Assistance" />
              <h3>Porsche Assistance</h3>
              <p>
                In combination with our warranty services, Porsche Assistance
                offers you an exclusive mobility guarantee – 24 hours a day, 365
                days a year. From roadside assistance to organising your return
                journey – we take care of your needs.
              </p>
            </div>
            <div className="info-card">
              <img src={icon15} alt="Porsche Approved Pre-Owned Cars" />
              <h3>Porsche Approved Pre-Owned Cars</h3>
              <p>
                Our Porsche Approved Pre-Owned cars are just as thrilling as
                they were when they were first driven. And with our Porsche
                Approved Warranty, you have nothing to worry about.
              </p>
            </div>
            <div className="info-card">
              <img src={icon16} alt="icon16" />
              <h3>Porsche Finder</h3>
              <p>
                Discover the attractive range of pre-owned cars at your Porsche
                Centre and in our online pre-owned car search.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Warranty;
