import { div } from "framer-motion/client";
import React from "react";
import './Audi_main.css'
import anh1 from '../../../assets/images/Bmv_images/730x730_ASER_P_161048.jpg';
import anh2 from '../../../assets/images/Bmv_images/download.png';
import anh3 from '../../../assets/images/Bmv_images/images.jpg';
import anh4 from '../../../assets/images/Bmv_images/883x496-recall-min.jpg';
import anh5 from '../../../assets/images/Bmv_images/883x496-tires-min.jpg';
import anh6 from '../../../assets/images/Bmv_images/883x496-roadsideassist-min.jpg';
import anh7 from '../../../assets/images/Bmv_images/844x476_S5-Cab_2RS6CR~A-min.jpg';

const Audi_main = () => {
    return (<div className="audi-container">
        {/* Intro Section */}
        <section className="intro-section">
          <h2>Keep your Audi performing like an Audi.</h2>
          <p>
            Quality service starts with our factory-trained Audi technicians who use the latest
            diagnostic equipment and Genuine Audi Parts to keep your vehicle in-tune. Learn more
            about your maintenance schedule, warranties, and owner’s manual below. You’ll also
            find the many ways we are here for you, including Roadside Assistance and remote
            service appointments.
          </p>
        </section>
  
        {/* Service Details */}
        <section className="service-details">
          <img src={anh1} alt="Audi Service" className="service-image" />
          <div className="service-info">
            <h3>Nobody knows your Audi better.</h3>
            <p>
              Each time you bring in your Audi for service, we offer a Complimentary Multi-Point
              Inspection, which includes an assessment of your vehicle. Your Service Consultant
              will review an inspection checklist with you to help you understand the condition
              of your Audi. Our dealers are committed to providing the care you expect, which
              includes the following:
            </p>
            <ul>
              <li>Factory-trained technicians who use Audi-specific tools and Audi Genuine Parts.</li>
              <li>Complimentary vehicle wash with service.</li>
              <li>Loaner vehicle or alternate transportation.</li>
            </ul>
          </div>
        </section>
  
        {/* Service Plans */}
        <section className="service-plans">
          <h3>Service Plans</h3>
          <div className="plans">
            <div className="plan">
              <img src={anh2} alt="Audi Care" />
              <p><strong>Audi Care:</strong> Save on prepaid, scheduled maintenance.</p>
            </div>
            <div className="plan">
              <img src={anh3} alt="Term Protection" />
              <p><strong>Term Protection:</strong> Get coverage for virtually any mechanical failure.</p>
            </div>
          </div>
        </section>
        <section className="customer-support">
          <h3>Customer support</h3>
          <div className="support-options">
            <div className="support-option">
              <img src={anh4} alt="Roadside Assistance" />
              <p><strong>Roadside assistance</strong><br />Around-the-clock service, no matter where you are.</p>
              <a href="#">Explore Roadside assistance</a>
            </div>
            <div className="support-option">
              <img src={anh5} alt="Warranty" />
              <p><strong>Warranty</strong><br />Experience peace of mind with an Audi warranty.</p>
              <a href="#">Learn about Audi warranty</a>
            </div>
          </div>
        </section>
  
        {/* Keep Your Car in Top Form Section */}
        <section className="additional-support">
          <h3>Keep your car in top form.</h3>
          <div className="Spacer">
            <h3> .</h3>
          </div>
          <div className="support-campaigns">
            <div className="campaign">
              <img src={anh6} alt="Recalls & Campaigns" />
              <p><strong>Recalls & service campaigns</strong><br />Look up recall and campaign information for the past 15 years.</p>
              <a href="#">Explore Recalls</a>
            </div>
            <div className="campaign">
              <img src={anh7} alt="Audi Tires" />
              <p><strong>Recalls & service campaigns</strong><br />Look up recall and campaign information for the past 15 years.</p>
              <a href="#">Learn about Audi tires</a>
            </div>
          </div>
        </section>
  
        
      </div>)

    
}
export default Audi_main;