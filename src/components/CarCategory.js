import React, { useState, useEffect } from "react";
import "../assets/styles/CarCategory.css";
import axios from "axios";

const CarCategory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://carriomotors.online/api/get_products.php")
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

  return (
    <div className="car-category">
      <div className="car-category-header">Car Category</div>
      <div className="car-grid">
        {products.slice(0, 4).map((product, index) => (
          <CarCard
            key={product.id}
            imageSrc={product.img}
            carName={product.name}
            index={index}
          />
        ))}
      </div>
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
