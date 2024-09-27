import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../assets/styles/Banner.css";

const Banner = ({ images, interval = 5000 }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const location = useLocation(); // Lấy đường dẫn hiện tại
  const autoSlide = location.pathname === "/"; // Chỉ bật auto-slide nếu đang ở trang chủ

  useEffect(() => {
    if (autoSlide && images.length > 1) {
      const timer = setInterval(() => {
        setCurrentImage((prevImage) => (prevImage + 1) % images.length);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [autoSlide, images.length, interval]);

  // Kiểm tra nếu không có ảnh, hiển thị placeholder
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
        <img
          key={index}
          src={image.src}
          alt={image.alt}
          className={`hero-image ${index === currentImage ? "active" : ""}`}
        />
      ))}
      <div className="hero-overlay"></div>
      {images.length > 1 && (
        <div className="hero-indicators">
          {images.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentImage ? "active" : ""}`}
              onClick={() => setCurrentImage(index)} // Cho phép chọn ảnh thủ công
            ></div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Banner;
