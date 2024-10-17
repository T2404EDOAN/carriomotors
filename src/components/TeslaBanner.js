import React from "react";
import "../assets/styles/TeslaBanner.css";

const TeslaBanner = () => {
  return (
    <div className="tesla-banner">
      <div className="single-image-content">
        <h2>Carrio Motors Social</h2>
        <div className="single-image-gallery">
          <img src="/Homenormal_images/porsche-normal.jpg" alt="Single Image" />
          <div className="overlay-text">Information on data processing</div>
          <div className="overlay-text1">
            On our website we provide content from Storystream. To view this
            content, you must agree to the data processing by Storystream.
          </div>
        </div>
      </div>
      <div className="banner-content">
        <h2>Discover</h2>
        <div className="image-gallery">
          <img src="/Homenormal_images/porsche-normal.webp" alt="Image 1" />
          <img src="/Homenormal_images/porsche-normal (1).webp" alt="Image 2" />
          <img src="/Homenormal_images/porsche-normal (2).webp" alt="Image 3" />
          <img src="/Homenormal_images/porsche-normal (3).webp" alt="Image 4" />
        </div>
      </div>
    </div>
  );
};

export default TeslaBanner;
