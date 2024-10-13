import React, { useState } from "react";
import { Button } from "antd";
import { Select } from "antd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Insu1 from "../../assets/images/Finance_images/Insu1.jpg";
import Insu2 from "../../assets/images/Finance_images/Insu2.jpg";
import Insu3 from "../../assets/images/Finance_images/Insu3.jpg";
import Insu4 from "../../assets/images/Finance_images/Insu4.jpg";
import "../../assets/styles/FinanceInfoTab.css";

const FinanceInfoTab = ({ car }) => {
  const [isFinanceTabVisible, setIsFinanceTabVisible] = useState(true);
  const [installmentAmount, setInstallmentAmount] = useState(car?.price);
  const [selectedPercentage, setSelectedPercentage] = useState(0.1);
  const handleInstallmentClick = () => {
    setIsFinanceTabVisible(false);
  };

  const handleCloseClick = () => {
    setIsFinanceTabVisible(true);
  };
  const handleChange = (value) => {
    const percentage = parseFloat(value) / 100;
    setSelectedPercentage(percentage);
  };
  const calculatedAmount = installmentAmount * selectedPercentage;
  const calculatedAmount1 = (installmentAmount - calculatedAmount) / 12;
  const calculatedAmount2 = (installmentAmount - calculatedAmount) / 24;
  const calculatedAmount3 = (installmentAmount - calculatedAmount) / 48;
  const totalInstallmentWithFee = calculatedAmount1 + 0.01 * calculatedAmount1;
  const totalInstallmentWithFee1 = calculatedAmount2 + 0.03 * calculatedAmount2;
  const totalInstallmentWithFee2 = calculatedAmount3 + 0.05 * calculatedAmount3;

  const monthlyInstallment12 = totalInstallmentWithFee;
  const monthlyInstallment24 = totalInstallmentWithFee1;
  const monthlyInstallment48 = totalInstallmentWithFee2;

  const calculateMonthlyDifference =
    monthlyInstallment12 - (installmentAmount - calculatedAmount) / 12;
  const calculateMonthlyDifference1 =
    monthlyInstallment24 - (installmentAmount - calculatedAmount) / 24;
  const calculateMonthlyDifference2 =
    monthlyInstallment48 - (installmentAmount - calculatedAmount) / 48;
  return (
    <div>
      {isFinanceTabVisible ? (
        <div className="box-finance-tab">
          <div className="title11111">
            Carrio Insurance - Protect your Dream
          </div>
          <div className="ata">
            <div className="booxx1">
              <div className="title-finance">Basic auto damage insurance</div>
              <div className="price-finance">583 USD to 833 USD</div>
              <div className="img-finance">
                <img src={Insu1} alt="anh1" />
              </div>
              <ul>
                <li>Vehicle damage (after deductible)</li>
                <li>Personal injury from collisions</li>
                <li>
                  Liability for damage to others' vehicles, property, or
                  injuries
                </li>
              </ul>
            </div>
            <div className="booxx2">
              <div className="title-finance">
                Extended Vehicle Damage Insurance
              </div>
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
            <Button
              type="primary"
              className="buttt2"
              onClick={handleInstallmentClick}
            >
              INSTALLMENT
            </Button>
          </div>
        </div>
      ) : (
        <div className="new-div">
          <div className="bo1">
            <Button
              type="default"
              onClick={handleCloseClick}
              style={{ border: "none" }}
            >
              <ArrowBackIcon />
            </Button>
            <h2>Installment Information</h2>
          </div>
          <div className="price-install">
            Choose the installment amount (%) :
          </div>
          <Select
            defaultValue="10%"
            style={{ width: "100%" }}
            onChange={handleChange}
            options={[
              { value: "10%", label: "10%" },
              { value: "20%", label: "20%" },
              { value: "30%", label: "30%" },
              { value: "40%", label: "40%" },
              { value: "50%", label: "50%" },
              { value: "60%", label: "60%" },
            ]}
          />
          <div className="price-plan">Refer to the installment plan :</div>
          <table className="installment-table">
            <thead>
              <tr>
                <th>Kỳ hạn</th>
                <th>12 tháng</th>
                <th>24 tháng</th>
                <th>48 tháng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Giá mua trả góp</td>
                <td>${installmentAmount.toLocaleString()}</td>
                <td>${installmentAmount.toLocaleString()}</td>
                <td>${installmentAmount.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Tổng giảm giá</td>
                <td>$0</td>
                <td>$0</td>
                <td>$0</td>
              </tr>
              <tr>
                <td>Tổng tiền trả góp</td>
                <td>${calculatedAmount.toLocaleString()}</td>
                <td>${calculatedAmount.toLocaleString()}</td>
                <td>${calculatedAmount.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Thanh toán khi nhận máy</td>
                <td>0 đ</td>
                <td>0 đ</td>
                <td>0 đ</td>
              </tr>
              <tr>
                <td>Góp mỗi tháng</td>
                <td>
                  <strong>${monthlyInstallment12.toLocaleString()}</strong>
                </td>
                <td>
                  <strong>${monthlyInstallment24.toLocaleString()}</strong>
                </td>
                <td>
                  <strong>${monthlyInstallment48.toLocaleString()}</strong>
                </td>
              </tr>
              <tr>
                <td>Chênh lệch trả tháng</td>
                <td>${calculateMonthlyDifference.toLocaleString()}</td>
                <td>${calculateMonthlyDifference1.toLocaleString()}</td>
                <td>${calculateMonthlyDifference2.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FinanceInfoTab;
