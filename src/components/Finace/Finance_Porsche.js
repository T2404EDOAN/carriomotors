import React from "react";
import porsche1 from "../../assets/images/Porsce_images/porsche1.jpg";
import porsche2 from "../../assets/images/Porsce_images/porsche2.jpg";
import porsche3 from "../../assets/images/Porsce_images/porsche 3.jpg";
import "../../assets/styles/Finance_Porsche.css";
const FinancePorsche = () => {
  return (
    <div className="porsche_main_finance">
      <div className="title-finance-porsche1">
        PFS is set up exclusively for Porsche customers in Vietnam. With
        diverse, flexible credit products and competitive interest rates,
        customers will be proactive in their financial plans and take advantage
        of profitable investment{" "}
        <span className="tab1">capital in the future.</span>
      </div>
      <div className="title-finance-porsche2">FINANCIAL PRODUCTS FROM PFS</div>
      <div className="box-finance-porsche">
        <div className="box-finance-porsche1">
          <div className="finance-porsche-img1">
            <div className="finance-porsche-img">
              <img src={porsche1} alt="porsche1" />
            </div>
            <div className="finance-porsche-img-text">
              Superior <br />
              credit <br />
              benefits
            </div>
          </div>
          <div className="finance-porsche-text1">
            <div className="finance-porsche-text11">TRADITIONAL PRODUCTS</div>
            <div className="finance-porsche-text12">
              <ul className="ulli">
                <li>Monthly installments on decreasing balance.</li>
                <li> Maximum loan ratio up to 85% of vehicle value.</li>
                <li>Loan term up to 84 months.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="box-finance-porsche2">
          <div className="finance-porsche-img1">
            <div className="finance-porsche-img">
              <img src={porsche2} alt="porsche2" />
            </div>
            <div className="finance-porsche-img-text">
              Optimal payment <br />
              benefits
            </div>
          </div>
          <div className="finance-porsche-text2">
            <div className="finance-porsche-text21">BALLOON PRODUCTS</div>
            <div className="finance-porsche-text22">
              <ul className="ulli">
                <li>
                  Divided into 3 installment stages: Prepayment, periodic
                  installments and final Balloon payment up to 30% of the
                  vehicle value
                </li>
                <li> Maximum loan ratio up to 85% of the vehicle value.</li>
                <li>Loan term up to 84 months.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="box-finance-porsche3">
          <div className="finance-porsche-img3">
            <div className="finance-porsche-img">
              <img src={porsche3} alt="porsche3" />
            </div>
            <div className="finance-porsche-img-tex1">
              Flexible credit
              <br /> benefits
            </div>
          </div>
          <div className="finance-porsche-text3">
            <div className="finance-porsche-text31">PRODUCT 50-50</div>
            <div className="finance-porsche-text32">
              <ul className="ulli">
                <li>
                  Pay principal and interest in one lump sum at the end of the
                  term with a fixed interest rate throughout the loan period.
                </li>
                <li>Maximum loan ratio is 60% of the vehicle value</li>
                <li>Loan term is 12 months.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="but-por">
        <div className="but1-por">CONTACT US</div>
        <div className="but2-por">GO TO PORSCHE VEHICLES</div>
      </div>
    </div>
  );
};
export default FinancePorsche;
