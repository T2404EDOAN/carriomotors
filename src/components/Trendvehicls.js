import React, { useState, useEffect } from "react";
import "../assets/styles/Trendvehicls.css";
import axios from "axios";
import { Button } from "antd";  // Dùng Ant Design
import * as icons from "@ant-design/icons";  // Dùng biểu tượng từ Ant Design
const Trendvehicls = () => {
  const [size, setSize] = useState("large");
  const { ArrowRightOutlined, LeftOutlined, RightOutlined } = icons;
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Theo dõi vị trí hiện tại
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://carriomotors.io.vn/api/get_vehicle.php")
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

  // Hàm điều khiển di chuyển sang phải
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 4 < products.length ? prevIndex + 4 : 0
    );
  };

  // Hàm điều khiển di chuyển sang trái
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(products.length - 4, 0) : prevIndex - 4
    );
  };

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

        {/* Khu vực điều hướng */}
        <div className="trend-vehicles-navigation">
          {/* Nút điều hướng trái */}
          <Button
            type="primary"
            shape="circle"
            icon={<LeftOutlined />}
            onClick={prevSlide}
            size="large"
            className="trend-navigation-button trend-navigation-left"
          />

          {/* Khu vực hiển thị sản phẩm */}
          <div className="trend-vehicles-grid">
            {products.slice(currentIndex, currentIndex + 4).map((product, index) => (
              <TrendVehicleCard
                key={product.id}
                imageSrc={product.main_img}
                vehicleName={product.car_model_name}
                price={product.price}
                isOdd={index % 2 === 0}
              />
            ))}
          </div>

          {/* Nút điều hướng phải */}
          <Button
            type="primary"
            shape="circle"
            icon={<RightOutlined />}
            onClick={nextSlide}
            size="large"
            className="trend-navigation-button trend-navigation-right"
          />
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
      <div
        className="trend-vehicle-card-content"
        style={{ color: isOdd ? "#fff" : "#000" }}
      >
        <h2>{vehicleName}</h2>
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
