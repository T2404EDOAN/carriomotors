import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LeftOutlined, RightOutlined } from "@ant-design/icons"; // Thêm icon từ Ant Design
import "../assets/styles/Banner.css";

const Banner = ({ images, interval = 5000 }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const location = useLocation();
  const autoSlide = location.pathname === "/";

  useEffect(() => {
    if (autoSlide && images && images.length > 1) {
      const timer = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [autoSlide, images, interval]);

  const handlePrevClick = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImage((prevImage) =>
      prevImage === images.length - 1 ? 0 : prevImage + 1
    );
  };

  if (!images || images.length === 0) {
    return (
      <section className="hero-section placeholder">
        <div className="hero-placeholder">
          <p>No images available, placeholder banner</p>
        </div>
      </section>
    );
  }

  return (
    <section className="hero-section">
      {images.map((image, index) => (
        <div
          key={index}
          className={`hero-slide ${index === currentImage ? "active" : ""}`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className={`hero-image ${index === currentImage ? "active" : ""}`}
          />
          {index === currentImage && (
            <div className="hero-title">
              <h2 style={{ fontSize: "50px" }}>{image.alt}</h2>
            </div>
          )}
        </div>
      ))}

      <div className="hero-overlay"></div>

      {/* Nút điều khiển chuyển ảnh với Icon */}
      <button className="prev-button" onClick={handlePrevClick}>
        <LeftOutlined />
      </button>
      <button className="next-button" onClick={handleNextClick}>
        <RightOutlined />
      </button>

      {images.length > 1 && (
        <div className="hero-indicators">
          {images.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentImage ? "active" : ""}`}
              onClick={() => setCurrentImage(index)}
            ></div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Banner;
