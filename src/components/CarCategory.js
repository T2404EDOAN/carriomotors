import React, { useState, useEffect } from "react";
import "../assets/styles/CarCategory.css";
import axios from "axios";
import { Skeleton } from "antd";

const CarCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://carriomotors.io.vn/api/get_brands.php")
      .then((response) => {
        console.log(response.data); // Kiểm tra phản hồi từ API
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

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
                />
              ))}
      </div>
      {error && (
        <p className="error-message">Error loading products: {error}</p>
      )}
    </div>
  );
};

const CarCard = ({ imageSrc, carName, index }) => {
  const isEven = index % 2 === 0;
  return (
    <div className={`car-card ${isEven ? "even" : "odd"}`}>
      <img src={imageSrc} alt={carName} />
      <div className="car-card-content">
        <h2>{carName}</h2>
      </div>
    </div>
  );
};

export default CarCategory;
