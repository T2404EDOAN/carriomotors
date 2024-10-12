import React from "react";
import { Row, Col, Image } from "antd";
import "../../assets/styles/FinanceInfoTab.css";

const FinanceInfoTab = () => {
  return (
    <div className="box-finance-tab">
      <div className="box-finance-tab-insurance">
        <div className="title-insurance">Insurance package</div>
        <div className="box-box">
          <div className="insurance-box1">
            <div className="insurance-box1-name">
              Basic Vehicle Damage Insurance
            </div>
            <div className="insurance-box1-price">583 USD to 833 USD</div>
          </div>
          <div className="insurance-box2">
            <div className="insurance-box2-name">
              Extended Vehicle Damage Insurance
            </div>
            <div className="insurance-box2-price"> 625 USD to 958 USD</div>
          </div>
          <div className="insurance-box3">
            <div className="insurance-box3-name">Custom Insurance</div>
            <div className="insurance-box3-price">208 USD to 417 USD</div>
          </div>
          <div className="insurance-box4">
            <div className="insurance-box4-name">
              Extended Liability Insuranc
            </div>
            <div className="insurance-box4-price">417 USD </div>
          </div>
        </div>
      </div>
      <div className="box-finance-tab-pay">
        <div className="title-pay">Form Of Payment</div>
        <div className="offers-container">
          <h4 className="title3">Gifts and other offers</h4>
          <ul>
            <li>
              <span role="img" aria-label="gift">
                🎁
              </span>
              Get a discount code up to 5,500,000₫ for purchasing a Beecube
              projector.
            </li>
            <li>
              <span role="img" aria-label="trade">
                ♻️
              </span>
              Get a 2,000,000₫ discount when trading in your old device.
            </li>
          </ul>
        </div>
        <div className="buttons">
          <div className="button1">Consultant</div>
          <div className="button2">Installment</div>
        </div>
      </div>
    </div>
  );
};

export default FinanceInfoTab;
