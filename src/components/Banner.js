import React, { useState, useEffect } from "react";
import "../assets/styles/Banner.css";

const images = [
  { src: "/banner1.jpg", alt: "BMW iX 1" },
  {
    src: "/banner2.jpg",
    alt: "BMW iX 2",
  },
  { src: "/banner3.jpg", alt: "BMW iX 3" },
  { src: "/banner4.jpg", alt: "BMW iX 4" },
  { src: "/banner5.jpg", alt: "BMW iX 5" },
];

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

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
      {/* <div className="hero-content">
        <h1 className="hero-title">
          LEASE THE 100% ELECTRIC 2025 BMW iX xDRIVE50.
        </h1>
        <p className="hero-subtitle">
          $899 Per Month for 36 months with $6,619 due at signing.
        </p>
        <div className="hero-buttons">
          <button className="button button-primary">Offer Details</button>
          <button className="button button-secondary">See All Offers</button>aaaaaaaa
        </div>
      </div> */}
      <div className="hero-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`hero-indicator ${
              index === currentImage ? "active" : ""
            }`}
            onClick={() => setCurrentImage(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Banner;
