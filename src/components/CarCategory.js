import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import { RiseOutlined } from "@ant-design/icons";
import axios from "axios";
import "../assets/styles/CarCategory.css";
import CarDetailModal from "./PopupDetail/CarDetailModal";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { useNavigate } from "react-router-dom";
const CarCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="car-category">
      <div className="car-category-header">Brand</div>
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
                  brandId={product.id}
                />
              ))}
      </div>
      {error && (
        <p className="error-message">Error loading products: {error}</p>
      )}
    </div>
  );
};

const CarCard = ({ imageSrc, carName, index, brandId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("brandId trước khi điều hướng:", brandId);
    if (brandId) {
      navigate(`/vehicles`, { state: { brandId } }); // Đảm bảo `brandId` không bị null
    } else {
      console.error("brandId bị null hoặc undefined");
    }
  };

  const isEven = index % 2 === 0;
  return (
    <div
      className={`car-card ${index % 2 === 0 ? "even" : "odd"}`}
      onClick={handleClick}
    >
      <div className="car-card-image-container">
        <img src={imageSrc} alt={carName} />
        <div className="icon-container"></div>
      </div>
      <div className="car-card-content">
        <h2>{carName}</h2>
      </div>
    </div>
  );
};

export default CarCategory;
