import React from "react";
import fb1 from "../../assets/images/Bmv_images/fb1.webp";
import fb2 from "../../assets/images/Bmv_images/fb2.webp";
import "../../assets/styles/Finace_Bmw.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from 'antd'; // Import Button from Ant Design
const FinanceBMW = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle "CONTACT US" button click
  const handleContactUsClick = () => {
    navigate("/about/contact"); // Navigate to the contact page
  };

  // Function to handle "GO TO VEHICLES" button click
  const handleGoToVehiclesClick = () => {
    navigate("/vehicles"); // Navigate to the vehicles page
  };
  return (
    <div className="bmw_main_finance">
      <div className="title-finance-bmw1">
        BMW is an official BMW showroom that fully meets the strict standards of
        the global BMW Group.
      </div>
      <div className="title-finance-bmw2">Your benefits at a glance</div>
      <div className="finance-bmw-img">
        <div className="finance-bmw-img1">
          <img src={fb1} alt="fb1" />
        </div>
        <div className="finance-bmw-img2">
          <img src={fb2} alt="fb2" />
        </div>
      </div>
      <div className="finance-bmw-text">
        <div className="finance-bmw-text1">
          <div className="finance-bmw-text11">
            BMW applies a special incentive policy for customers buying BMW
            cars. Specifically, you will immediately enjoy the following
            incentives :
          </div>
          <div className="finance-bmw-text12">
            ✔️ ️ Up to 275 million VND discount for BMW 320i.
            <br /> ✔️ 100% discount on registration fee for BMW 218i Gran Tourer
            <br /> ✔️ 50% discount on registration fee for BMW X1 and BMW 118i
            models <br />
            ✔️ 3 years / 30,000 km free maintenance for BMW 520i (whichever
            comes first). <br />
            ✔️ 1 year free physical insurance and service voucher worth up to
            100 million VND for other car models
          </div>
        </div>
        <div className="finance-bmw-text2">
          <div className="finance-bmw-text21">
            When buying a car at BMW, customers will enjoy financial support
            services:
          </div>
          <div className="finance-bmw-text22">
            ✔️ Loan support up to 80% of the car value.
            <br />
            ✔️ Special preferential interest rates only for customers buying BMW
            cars
            <br />
            ✔️ Simple procedures, application approval within 04 hours.
            <br />
            ✔️ Loan term up to 09 years
          </div>
        </div>
      </div>
      <div className="but">
      <Button type="primary" className="but1" onClick={handleContactUsClick}>
          CONTACT US
        </Button>
        <Button type="primary" className="but2" onClick={handleGoToVehiclesClick}>
          GO TO VEHICLES
        </Button>
      </div>
    </div>
  );
};
export default FinanceBMW;
