import React, { useState, useEffect } from 'react';
import '../assets/styles/CarCategory.css';
import axios from 'axios'; // Import axios để gọi API

const CarCategory = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Gọi API từ PHP backend
        axios.get('https://carriomotors.online/api/get_products.php') // Thay bằng URL API của bạn
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
            <div className="car-grid">
                {products.slice(0, 4).map((product) => ( // Chỉ lấy 4 sản phẩm đầu tiên
                    <CarCard 
                        key={product.id} // Sử dụng id sản phẩm làm key
                        imageSrc={`${product.name.toLowerCase()}.jpg`} // Giả sử hình ảnh theo tên sản phẩm
                        carName={product.name} 
                    />
                ))}
            </div>
        </div>
    );
};

const CarCard = ({ imageSrc, carName }) => {
    return (
        <div className="car-card">
            <img src={imageSrc} alt={carName} />
            <div className="car-card-content">
                <h2>{carName}</h2>
            </div>
        </div>
    );
};

export default CarCategory;
