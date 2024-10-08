import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
          {/* Chỉ hiển thị title khi hình ảnh hiện tại active */}
          {index === currentImage && (
            <div className="hero-title">
              <h2>{image.alt}</h2>
            </div>
          )}
        </div>
      ))}
      <div className="hero-overlay"></div>
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
