import { div } from "framer-motion/client";
import React from "react";
import anh1 from "../../../assets/images/Mec_images/anh1.webp";
import anh2 from "../../../assets/images/Mec_images/anh2.webp";
import anh3 from "../../../assets/images/Mec_images/anh3.webp";
import anh4 from "../../../assets/images/Mec_images/anh4.webp";
import anh56 from "../../../assets/images/Mec_images/anh56.webp";
import anh7 from "../../../assets/images/Mec_images/anh7.webp";
import "../../../assets/styles/mec.css";
import {  Button, Flex  } from 'antd';
import { useNavigate } from "react-router-dom"; // Import useNavigate
const Mec_main = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const handleLearnMoreClick = () => {
    navigate("/about/careers"); // Navigate to the careers page
  };
  return (
    <div className="mec_main_container">
      <div className="box1">
        <div className="title1">Convenience Service Options</div>
        <div className="content1">
          <div className="content-left1">
            <div className="content-left1-img">
              <img src={anh1} alt="anh1" />
            </div>
            <div className="content-left1-text">
              Mobile Service <br />
              Convenient, comprehensive, and contact free, Mobile Service by
              Mercedes-Benz brings exceptional care right to your preferred
              location with offerings like:
              <br />
              <ul>
                <li>Oil services</li>
                <li>Recalls/campaigns Wiper replacement</li>
                <li>Multipoint inspections</li>
                <li>Brake services</li>
                <li>Software updating Glass repair or replacement</li>
                <li>Tire rotations</li>
                <li>Electric vehicle services</li>
                <li>And more</li>
              </ul>
            </div>
          </div>
          <div className="content-right1">
            <div className="content-right1-img">
              <img src={anh2} alt="anh2" />
            </div>
            <div className="content-right1-text">
              Express Service <br />
              Available with or without an appointment, Express Service is
              dedicated vehicle care in about 60 minutes or less. With two
              diagnostic technicians working on your Mercedes-Benz using the
              latest tools and tests, it’s a comprehensive and complete way to
              get thorough service – in less time than you think. Services
              Offered in Mercedes-Benz Express Service include:
              <ul>
                <li>Service A/B</li>
                <li>Air/Cabin Filter Replacement</li>
                <li>Wiper Blade Replacement</li>
                <li>Tire Rotation and Replacement</li>
                <li>Battery Replacement</li>
                <li>Brake Pads/Rotors Replacement</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="content2">
          <div className="content-left2">
            <div className="content-left2-img">
              <img src={anh3} alt="anh3" />
            </div>
            <div className="content-left2-text">
              Night Drop
              <br /> We understand it’s not always convenient to bring your
              vehicle in during regular dealership business hours. With Night
              Drop, available at participating Mercedes-Benz dealerships, you
              can securely leave your vehicle at the dealership after-hours,
              ready to be serviced the next morning.
            </div>
          </div>
          <div className="content-right2">
            <div className="content-right2-img">
              <img src={anh4} alt="anh4" />
            </div>
            <div className="content-right-text">
              Pick-Up and Delivery <br />
              Providing the utmost convenience for our owners, participating
              Mercedes-Benz
              <br /> dealers will pick-up your vehicle and drop it off at your
              home, office or the location of your
              <br /> choosing when the service maintenance is complete.
            </div>
          </div>
        </div>
      </div>
      <div className="box2">
        <div className="title2">
          <div className="title2-main">Customer support</div>
          <div className="title2-extra">
            Keep your Mercedes-Benz running like new with our recommended
            service intervals.
          </div>
        </div>
        <div className="content3">
          <div className="content3-left-text">
            Roadside Assistance <br />
            <br />
            <br />
            The Mercedes-Benz Roadside Assistance Program is available 24/7 to
            help fix a flat, jumpstart the battery or fuel up — whatever it
            takes to get you back on the road. Call 1-800-367-6372, press the
            me-button in your vehicle, or use the Mercedes me connect app to
            contact us.<br></br>
            <Button type="primary"className="more3" onClick={handleLearnMoreClick}>
              Learn More about Roadside Assistance
            </Button>
          
          </div>
          <div className="content3-right-img">
            <img src={anh56} anh="anh5" />
          </div>
        </div>
        <div className="content4">
          <div className="content4-left4-img">
            <img src={anh56} anh="anh6" />
          </div>
          <div className="content4-right4-text">
            Certified Collision Centers
            <br /> In the event of an accident, Mercedes-Benz Collision Centers
            have the tools, equipment and training to restore your vehicle to
            its pre-collision condition.
            <Button type="primary" className="more3" onClick={handleLearnMoreClick}>
              Learn More about Roadside Assistance
            </Button>
          </div>
        </div>
        <div className="content5">
          <div className="content5-left5-text">
            Recall Information <br />
            Mercedes-Benz is committed to keeping you informed about any recalls
            on your vehicle. Visit the link for the most up-to-date information
            on current or previous recalls. Mercedes-Benz Recall Information.<br></br>
            <Button type="primary" className="more3" onClick={handleLearnMoreClick}>
              Learn More about Roadside Assistance
            </Button>
          </div>
          <div className="content5-right5-img">
            <img src={anh7} alt="anh7" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Mec_main;
