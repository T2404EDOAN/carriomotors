import React, { useState, useEffect } from "react";
import "../assets/styles/Trendvehicls.css";
import axios from "axios";
import { Button, Divider, Radio } from "antd"; // Ensure 'antd' is installed
import * as icons from "@ant-design/icons";
const Trendvehicls = () => {
  const [size, setSize] = useState("large");
  const { ArrowRightOutlined } = icons;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://carriomotors.io.vn/api/get_vehicle.php")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error loading products: {error}</p>;
  }

  return (
    <div className="trend-container">
      <div className="trend-vehicles">
        <div className="trend-vehicles-header">
        <h2>Drive Your Dream with Carrio Motors</h2>
          <div>
            <Button type="primary" shape="round" size={size}>
              View all
              <ArrowRightOutlined />
            </Button>
          </div>
        </div>

        <div className="trend-vehicles-grid">
        {products.slice(1, 5).map((product, index) => (
  <TrendVehicleCard
    key={product.id}
    imageSrc={product.main_img}
    vehicleName={`${product.brand_name} ${product.car_model_name}`}  // Kết hợp brand name và model name
    price={product.price}
    isOdd={index % 2 === 0}
  />
))}

        </div>
      </div>
    </div>
  );
};


const TrendVehicleCard = ({ imageSrc, vehicleName, price, isOdd }) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <div className="trend-vehicle-card">
      <img src={imageSrc} alt={vehicleName} />
      <div
        className="trend-vehicle-card-content"
        style={{ color: isOdd ? "#fff" : "#000" }}
      >
        <h3>{vehicleName}</h3> {/* Hiển thị tên brand và model */}
      </div>
      <img src={imageSrc} alt={vehicleName} />
      <div className="trend-vehicle-footer">
        <p className="vehicle-price">
          {price ? formattedPrice : "Price not available"}
        </p>
        <Button
          type="default"
          shape="round"
          size="small"
          className="view-now-button"
        >
          View Now
        </Button>
      </div>
    </div>
  );
};


export default Trendvehicls;
