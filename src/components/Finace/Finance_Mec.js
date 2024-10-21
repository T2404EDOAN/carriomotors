import React from "react";
import f1 from "../../assets/images/Mec_images/f1.webp";
import f2 from "../../assets/images/Mec_images/f2.webp";
import f3 from "../../assets/images/Mec_images/f3.webp";
import f4 from "../../assets/images/Mec_images/f4.webp";
import "../../assets/styles/Finance_Mec.css";
import pdfFile from "../../PDF/mercedes-finance.pdf";
const FinanceMec = () => {
  const handlePdfOpen = () => {
    window.open(pdfFile, "_blank"); // Opens the PDF file in a new tab
  };
  return (
    <div className="mec_main_finance">
      <div className="box-finance1">
        <div className="box-finance11">Get Started</div>
        <div className="box-finance12">
          Whether you’re a new or current customer, we can help you find the
          right car, payment terms and protection products to fit your budget.
        </div>
      </div>
      <div className="box-finance2">
        <div className="box-finance21">
          <div className="box-finance2-img">
            <img src={f1} alt="f1" />
          </div>
          <div className="box-finance2-text">
            <div className="text1">Protection for Your Investment</div>
            <div className="text2">
              Our protection products and maintenance plans keep your vehicle
              <br />
              running smoothly and safely.
            </div>
          </div>
        </div>
        <div className="box-finance211">
          <div className="box-finance2-img">
            <img src={f2} alt="f2" />
          </div>
          <div className="box-finance2-text">
            <div className="text1">Payment Estimator</div>
            <div className="text2">
              Our protection products and maintenance plans keep your vehicle{" "}
              <br />
              running smoothly and safely.
            </div>
          </div>
        </div>
      </div>
      <div className="box-finance3">
        <div className="box-finance21">
          <div className="box-finance2-img">
            <img src={f3} alt="f3" />
          </div>
          <div className="box-finance2-text">
            <div className="text1">Auto Payment</div>
            <div className="text2">
              Enroll in Auto Pay and your monthly payments will be automatically{" "}
              <br />
              deducted from your selected banking account.
            </div>
          </div>
        </div>
        <div className="box-finance211">
          <div className="box-finance2-img">
            <img src={f4} alt="f4" />
          </div>
          <div className="box-finance2-text">
            <div className="text1">Access your Account</div>
            <div className="text2">
              Head over to Mercedes-Benz Financial Services to log-in to your
              <br />
              account, update your payment info or enroll in Auto Pay.
            </div>
          </div>
        </div>
      </div>
      <button onClick={handlePdfOpen} className="btn-pdf" style={{marginLeft:"50px"}}>
        Details
      </button>
    </div>
  );
};
export default FinanceMec;
