import React, { useEffect, useState } from "react";
import { Row, Col, Card, Image } from "antd";
import "../../assets/styles/Location.css"; // Import your new CSS file

const Location = () => {
  const [locationData, setLocationData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the API
  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await fetch("https://carriomotors.io.vn/api/get_location.php");
        const data = await response.json();
        setLocationData(data); // Assuming data is an array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching location data:", error);
        setLoading(false);
      }
    };

    fetchLocationData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="Location-Container">
      {/* Banner Section */}
      <div className="location-banner">
        <Image
          src="https://i.ibb.co/k0gqd0G/banner-Location.png" // Replace this with your actual banner image path
          alt="Banner"
          preview={false}
          className="location-banner-image"
        />
      </div>

      {/* Location Info Section with padding */}
      <div className="Location-Info">
        <Row gutter={[16, 16]} justify="start">
          {locationData.map((location, index) => (
            <Col xs={24} sm={12} md={12} lg={6} key={index}>
              <Card
                hoverable
                bordered={false}
              >
                {/* Logo Section */}
                <div className="location-logo-section">
                  <Image
                    src="/src/bmwlogo.jpg"
                    alt="Logo"
                    preview={false}
                    className="location-logo"
                  />
                </div>

                {/* Info Section */}
                <div className="location-info-section">
                  <h2>{location.name}</h2>
                  <p>{location.address || "Địa chỉ không có sẵn"}</p>
                  <p className="location-telephone">
                    {location.telephone || "Số điện thoại không có sẵn"}
                  </p>
                  <p className="location-details">Chi tiết</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Location;
