import React, { useState, useEffect } from "react";
import "../assets/styles/Trendvehicls.css";
import axios from "axios";
import { Button } from "antd"; // Ensure 'antd' is installed
import { ArrowRightOutlined } from "@ant-design/icons"; // Correct import of icon
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Trendvehicls = () => {
  const [size, setSize] = useState("large");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Initialize the navigate hook

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
            <Button
              type="primary"
              shape="round"
              size={size}
              onClick={() => navigate("/vehicles")}
            >
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
              vehicleName={`${product.brand_name} ${product.car_model_name}`}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const TrendVehicleCard = ({ imageSrc, vehicleName, price }) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return (
    <div className="trend-vehicle-card">
      <img src={imageSrc} alt={vehicleName} />
      <div className="trend-vehicle-card-content" style={{ color: "#000" }}>
        <h3>{vehicleName}</h3>
      </div>
      <div className="trend-vehicle-footer">
        <p className="vehicle-price">
          {price ? formattedPrice : "Coming soon"}
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
