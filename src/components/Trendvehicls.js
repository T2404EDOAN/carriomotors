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
      .get("https://carriomotors.online/api/get_products.php")
      .then((response) => {
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
          <p>Trend Vehicles</p>
          <div>
            <Button type="primary" shape="round" size={size}>
              View all
              <ArrowRightOutlined />
            </Button>
          </div>
        </div>

        <div className="trend-vehicles-grid">
          {products.slice(4, 8).map((product, index) => (
            <TrendVehicleCard
              key={product.id}
              imageSrc={product.img}
              vehicleName={product.className}
              isOdd={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const TrendVehicleCard = ({ imageSrc, vehicleName, isOdd }) => {
  return (
    <div className="trend-vehicle-card">
      <img src={imageSrc} alt={vehicleName} />
      <div
        className="trend-vehicle-card-content"
        style={{ color: isOdd ? "#fff" : "#000" }}
      >
        <h2>{vehicleName}</h2>
      </div>
    </div>
  );
};

export default Trendvehicls;
