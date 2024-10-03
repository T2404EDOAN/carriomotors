import React from "react";
import "../assets/styles/Trendvehicls.css";

const Trendvehicls = () => {
  return (
    <div className="trend-vehicles-container">
      <div className="vehicle-card">
        <img
          src="https://via.placeholder.com/150"
          alt="Subaru Forester"
          className="vehicle-image"
        />
        <div className="vehicle-info">
          <h3>2013 Subaru Forester</h3>
          <p>11,475 Miles - #2019884</p>
          <p>Seller: Subaru Champlin</p>
          <p>Price: $21,480</p>
          <p>Current Bid: $14,000</p>
        </div>
        <button className="bid-button">Place Bid</button>
      </div>

      <div className="vehicle-card">
        <img
          src="https://via.placeholder.com/150"
          alt="BMW X3"
          className="vehicle-image"
        />
        <div className="vehicle-info">
          <h3>2010 BMW X3</h3>
          <p>11,475 Miles - #2019832</p>
          <p>Seller: BMW Dealer Liana</p>
          <p>Price: $38,800</p>
          <p>Current Bid: $8,000</p>
        </div>
        <button className="bid-button">Place Bid</button>
      </div>

      <div className="vehicle-card">
        <img
          src="https://via.placeholder.com/150"
          alt="Toyota BRZ"
          className="vehicle-image"
        />
        <div className="vehicle-info">
          <h3>2016 Toyota BRZ</h3>
          <p>11,475 Miles - #2019880</p>
          <p>Seller: Toyota Turnpike</p>
          <p>Price: $29,500</p>
          <p>Current Bid: $10,900</p>
        </div>
        <button className="bid-button">Place Bid</button>
      </div>
    </div>
  );
};

export default Trendvehicls;
