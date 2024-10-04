import { div } from "framer-motion/client";
import React from "react";
import './BMWService.css';
import anh1 from '../../../assets/images/Bmv_images/BMWcareoil.jpg';
import anh2 from '../../../assets/images/Bmv_images/BMWbatteries.jpg';
import anh3 from '../../../assets/images/Bmv_images/Original BMW tires.jpg';
import anh4 from '../../../assets/images/Bmv_images/BMWapp.webp';


const Bmv_main = () => {
   // return (<div className="Bmv_main_container">bmv</div>)
  
    const handleDiscoverClick = () => {
    };
  
  
    return (
      <div className="container">
        {/* Services Section */}
        <div className="services">
          <div className="service-box">
            <img src={anh1} alt="BMW Ultimate Care Oil Services" />
            <div className="service-title">BMW ULTIMATE CARE OIL SERVICES</div>
            <div className="service-description">
              3 years prepaid for $225 for BMWs that have reached 60 months or 60,000 miles.
            </div>
          </div>
  
          <div className="service-box">
            <img src={anh2} alt="Original BMW Batteries" />
            <div className="service-title">ORIGINAL BMW BATTERIES</div>
            <div className="service-description">
              Find the battery that’s right for your vehicle.
            </div>
          </div>
  
          <div className="service-box">
            <img src={anh3} alt="Original BMW Tires" />
            <div className="service-title">ORIGINAL BMW TIRES</div>
            <div className="service-description">Refresh your ride this season.</div>
          </div>
        </div>
  
        {/* My BMW App Section */}
        <div className="app-section">
    <div className="app-content">
      <div className="text-content">
        <h2>MY BMW APP</h2>
        <h3>THE DIRECT LINK TO YOUR BMW.</h3>
        <p>
          The My BMW app keeps you connected to your BMW at all times and provides you with all the
          relevant information at a glance. We’ll keep you informed - whether a service is due, an
          error message is displayed or to find out about our comprehensive service offerings.
        </p>
      </div>
  
      <div className="benefitpara">
        <img src={anh4} alt="My BMW App" className="app-image" />
  
        <div className="benefitinfos">
          <div className="tinyheader">
            <p>YOUR BENEFITS</p>
          </div>
          <ul className="benefits">
            <li>Flexible online appointment scheduling</li>
            <li>Overview of services and upcoming maintenance for your BMW</li>
            <li>Automatic transmission of your vehicle data and location ensures rapid BMW Roadside Assistance</li>
            <li>Control and monitor your vehicle with ease, no matter where you are</li>
            <li>News and updates on all things BMW</li>
          </ul>
          <button className="discover-button" onClick={handleDiscoverClick}>
            Discover now
          </button>
        </div>
      </div>
    </div>
  </div>
  
      </div>
    );
}
export default Bmv_main;