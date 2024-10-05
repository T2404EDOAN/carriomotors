import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import { RiseOutlined } from "@ant-design/icons";
import axios from "axios";
import "../assets/styles/CarCategory.css";
import CarDetailModal from "./PopupDetail/CarDetailModal";

const CarCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    axios
      .get("https://carriomotors.io.vn/api/get_brands.php")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const showModal = (product) => {
    setSelectedCar(product);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedCar(null);
  };

  return (
    <div className="car-category">
      <div className="car-category-header">Car Category</div>
      <div className="car-grid">
        {loading
          ? Array(4)
              .fill()
              .map((_, index) => (
                <div
                  key={index}
                  className={`car-card ${index % 2 === 0 ? "even" : "odd"}`}
                >
                  <Skeleton.Image style={{ width: "100%", height: "100%" }} />
                  <div className="car-card-content">
                    <Skeleton.Input
                      style={{ width: 120 }}
                      active
                      size="small"
                    />
                  </div>
                </div>
              ))
          : products
              .slice(0, 4)
              .map((product, index) => (
                <CarCard
                  key={product.id}
                  imageSrc={product.image_url}
                  carName={product.name}
                  index={index}
                  onClick={() => showModal(product)}
                />
              ))}
      </div>
      {error && (
        <p className="error-message">Error loading products: {error}</p>
      )}

      {/* Sử dụng PopupVehiclesDetail để hiển thị thông tin xe */}
      <CarDetailModal
        isVisible={isModalVisible}
        onClose={closeModal}
        car={selectedCar}
      />
    </div>
  );
};

const CarCard = ({ imageSrc, carName, index, onClick }) => {
  const isEven = index % 2 === 0;
  return (
    <div className={`car-card ${isEven ? "even" : "odd"}`} onClick={onClick}>
      <div className="car-card-image-container">
        <img src={imageSrc} alt={carName} />
        <div className="icon-container">
          <RiseOutlined style={{ fontSize: "34px", color: "#fff" }} />
        </div>
      </div>
      <div className="car-card-content">
        <h2>{carName}</h2>
      </div>
    </div>
  );
};

export default CarCategory;
