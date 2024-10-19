import React from "react";
import audi1 from "../../assets/images/Audi_images/audi1.jpg";
import audi2 from "../../assets/images/Audi_images/audi2.jpg";
import "../../assets/styles/Finance_Audi.css";

const FinanceAudi = () => {
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
      <div className="but-audi">
        <div className="but1-audi">CONTACT US</div>
        <div className="but2-audi">GO TO AUDI VEHICLES</div>
      </div>
    </div>
  );
};
export default FinanceAudi;
