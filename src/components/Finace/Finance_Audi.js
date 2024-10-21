import React from "react";
import audi1 from "../../assets/images/Audi_images/audi1.jpg";
import audi2 from "../../assets/images/Audi_images/audi2.jpg";
import "../../assets/styles/Finance_Audi.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from 'antd'; // Import Button from Ant Design
import pdfFile from "../../PDF/audi_finance.pdf";

const FinanceAudi = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle "CONTACT US" button click
  const handleContactUsClick = () => {
    navigate("/about/contact"); // Navigate to the contact page
  };

  // Function to handle "GO TO VEHICLES" button click
  const handlePdfOpen = () => {
    window.open(pdfFile, "_blank"); 
  };
  return (
    <div className="audi_main_finance">
      <div className="title-finance-audi1">Audi Financing</div>
      <div className="title-finance-audi2">
        When you purchase your Audi through Audi Financial Services, every
        payment you make brings you one step closer to ownership. Our loan terms
        are flexible, ranging from 12 months to 84 months.* You’ll enjoy our
        competitive interest rates, ease of application, convenient payment
        plans and no prepayment penalties.
      </div>
      <div className="finance-audi-img">
        <div className="finance-audi-img1">
          <img src={audi1} alt="audi1" />
        </div>
        <div className="finance-audi-img2">
          <img src={audi2} alt="audi2" />
        </div>
      </div>
      <div className="but">
      <Button type="primary" className="but1" onClick={handleContactUsClick}>
          CONTACT US
        </Button>
        <Button type="primary" className="but2"  onClick={handlePdfOpen}>
        Download extended Finance Handbook
        </Button>
      </div>
    </div>
  );
};
export default FinanceAudi;
