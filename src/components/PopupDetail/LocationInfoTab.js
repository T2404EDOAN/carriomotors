import React, { useState } from "react";
import { Row, Col, Card, Image } from "antd";
import { Result, Button } from "antd";
import { FrownOutlined } from "@ant-design/icons";
const LocationInfoTab = ({ locationData, onSelectLocation }) => {
  if (!locationData || locationData.length === 0) {
    return <p>No location information available.</p>;
  }

  return (
    <div
    style={{
      maxHeight: "600px", // Giới hạn chiều cao của danh sách
      overflowY: "auto", // Thêm thanh cuộn dọc
      paddingRight: "10px", // Thêm padding để tránh việc nội dung bị chèn vào thanh cuộn
    }}
  >
    <Row gutter={[16, 16]} justify="start">
      {locationData.map((location, index) => (
        <Col xs={24} sm={12} md={24} lg={12} key={index}>
          <Card
            hoverable
            bordered={false}
            style={{
              textAlign: "left",
              height: "100%",
              width: "100%", // Full width of the parent div
              border: "1px solid rgba(0, 0, 0, 0.1)", // Subtle border
              boxShadow: "none", // No default shadow
              transition: "transform 0.3s, box-shadow 0.3s",
              borderRadius: "0",
            }}
            bodyStyle={{
              padding: "0px",
              display: "flex",
              flexDirection: "column",
              borderRadius: "0",
            }}
            onClick={() => onSelectLocation(location)}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)"; // Add shadow on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none"; // Remove shadow when not hovering
            }}
          >
            {/* Logo section */}
            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginBottom: "10px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)", // Thinner and more subtle
                paddingBottom: "10px", // Space between the logo and the bottom border
              }}
            >
              <Image
                src="./Logolocation.png"
                alt="BMW Logo"
                preview={false}
                style={{
                  width: "150px", // Logo size
                  height: "150px",
                  objectFit: "contain",
                  borderRadius: "0",
                }}
              />
            </div>

            {/* Information section */}
            <div
              style={{
                padding: "10px",
              }}
            >
              <h3>{location.LocationName}</h3>
              <p>{location.Address || "Address not available"}</p>
              {/* Add top border for the phone number, not full width */}
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginBottom: "8px",
                  borderTop: "1px solid rgba(0, 0, 0, 0.1)", // Add top border
                  width: "90%", // Only takes up 90% width
                  margin: "10px auto 0", // Center the content
                  paddingTop: "10px", // Space between the border and content
                }}
              >
                {location.Telephone || "Phone number not available"}
              </p>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
  );
};

const GoogleMap = ({ iframeLink }) => {
  if (!iframeLink) {
    return (
      <Result
        icon={<FrownOutlined  style={{color:"red"}}/>}
        title="No map available for this location."
        
      />
    );
  }
  // Validate and handle iframe_link
  const sanitizedIframeLink = iframeLink.startsWith("<iframe")
    ? new DOMParser()
        .parseFromString(iframeLink, "text/html")
        .querySelector("iframe")?.src
    : iframeLink;

  if (!sanitizedIframeLink) {
    return (
      <Result
        icon={<FrownOutlined />}
        title="Invalid map link."
        extra={<Button type="primary">Next</Button>}
      />
    );
  }

  return (
    <div style={{ width: "100%", height: "500px", marginTop: "20px" }}>
      <iframe
        src={sanitizedIframeLink}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="Google Map"
      ></iframe>
    </div>
  );
};

const MainLayout = ({ locationData }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSelectLocation = (location) => {
    setSelectedLocation(location);
  };

  return (
    <Row gutter={16}>
      <Col xs={24} md={12}>
        <LocationInfoTab
          locationData={locationData}
          onSelectLocation={handleSelectLocation}
        />
      </Col>
      <Col xs={24} md={12}style={{
    height: "600px", 
    overflowY: "auto", 
    border: "1px solid rgba(0, 0, 0, 0.1)",
    padding: "16px", 
    display: "flex",
    alignItems: "center", 
    justifyContent: "center"
  }}>
        {selectedLocation ? (
          <GoogleMap iframeLink={selectedLocation.iframe_link} />
        ) : (
          <div
          style={{
            height: "auto", 
            overflowY: "auto", 
            border: "1px solid rgba(0, 0, 0, 0.1)", 
            padding: "16px", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            flexDirection: "column", 
          }}
          >
            <p style={{ fontSize: "18px", color: "#8c8c8c" }}>
              Please select a location to view the map
            </p>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default MainLayout;
