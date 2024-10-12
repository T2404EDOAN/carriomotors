import React from "react";
import { Row, Col, Image, Button } from "antd";
import Insu1 from "../../assets/images/Finance_images/Insu1.jpg";
import Insu2 from "../../assets/images/Finance_images/Insu2.jpg";
import Insu3 from "../../assets/images/Finance_images/Insu3.jpg";
import Insu4 from "../../assets/images/Finance_images/Insu4.jpg";
import "../../assets/styles/FinanceInfoTab.css";

const FinanceInfoTab = () => {
  return (
    <div className="box-finance-tab">
      <div className="title11111">Carrio Insurance - Protect your Dream</div>
      <div className="ata">
        <div className="">
          <div className="title-finance">Basic auto damage insurance</div>
          <div className="price-finance">583 USD to 833 USD</div>
          <div className="img-finance">
            <img src={Insu1} alt="anh1" />
          </div>
          <ul>
            <li>Vehicle damage (after deductible)</li>
            <li>Personal injury from collisions</li>
            <li>
              Liability for damage to others' vehicles, property, or injuries
            </li>
          </ul>
        </div>
        <div className="booxx2">
          <div className="title-finance">Extended Vehicle Damage Insurance</div>
          <div className="price-finance">625 USD to 958 USD</div>
          <div className="img-finance">
            <img src={Insu2} alt="anh2" />
          </div>
          <ul>
            <li className="dam">Accidental Damage:</li>
            <div className="text-finance-1">
              Covers repairs for accidents and collisions.
            </div>
            <li className="dam">Parts & Labor</li>
            <li className="dam">Roadside Assistance:</li>
            <div className="text-finance-2">24/7 emergency help.</div>
            <li className="dam">Rental Reimbursement: </li>
            <div className="texr-finance-3">
              Up to $50/day for rentals during repairs.
            </div>
            <li className="dam">Weather Damage</li>
          </ul>
        </div>
        <div className="booxx3">
          <div className="title-finance">Custom Insurance</div>
          <div className="price-finance">208 USD to 417 USD</div>
          <div className="img-finance">
            <img src={Insu3} alt="anh3" />
          </div>
          <ul>
            <li className="dam">Basic ($208/year): </li>
            <div className="text-finance-1">
              Third-party liability, partial collision.
            </div>
            <li className="dam">Standard ($325/year):</li>
            <div className="text-finance-2">
              Adds windshield and tire/wheel coverage.
            </div>
            <li className="dam">Premium ($417/year):</li>
            <div className="text-finance-3">
              Full protection, including personal injury.
            </div>
          </ul>
        </div>
        <div className="booxx4">
          {" "}
          <div className="title-finance">Extended Liability Insurance</div>
          <div className="price-finance">417 USD/year</div>
          <div className="img-finance">
            <img src={Insu4} alt="anh4" />
          </div>
          <ul>
            <li className="dam">Medical Payments:</li>
            <div className="text-finance-1">
              Up to $10,000 for passenger injuries.
            </div>
            <li className="dam">Uninsured Motorist:</li>
            <div className="text-finance-2">
              Protection against underinsured drivers.
            </div>
            <li className="dam">Hit-and-Run:</li>
            <div className="text-finance-3">
              Covers damages from hit-and-runs.
            </div>
          </ul>
        </div>
      </div>
      <div className="butts">
        <Button
          type="default"
          className="buttt1"
          style={{ backgroundColor: "#99999D" }}
        >
          CONSULTANT
        </Button>
        <Button type="primary" className="buttt2">
          INSTALLMENT
        </Button>
      </div>
    </div>
  );
};

export default FinanceInfoTab;
