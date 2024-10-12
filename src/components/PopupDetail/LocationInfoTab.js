import React from "react";
import { Row, Col, Card, Image } from "antd";

const LocationInfoTab = ({ locationData }) => {
  if (!locationData || locationData.length === 0) {
    return <p>Không có thông tin địa điểm.</p>;
  }

  return (
    <Row gutter={[16, 16]} justify="left">
      {locationData.map((location, index) => (
        <Col xs={24} sm={12} md={6} key={index}>
          <Card
            hoverable
            cover={
              <Image
                src="/src/bmwlogo.jpg" // Thay logo hoặc hình ảnh tương ứng
                alt="BMW Logo"
                preview={false}
                style={{
                  padding: "20px",
                  height: "150px",
                  objectFit: "contain",
                }}
              />
            }
            bordered={false}
            style={{
              textAlign: "center",
              height: "100%",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            bodyStyle={{
              padding: "10px",
              height: "150px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <div
              style={{
                padding: "10px",
                backgroundColor: "#f9f9f9",
                borderRadius: "8px",
              }}
            >
              <h3>{location.LocationName}</h3>
              <p>
                {location.Address ? location.Address : "Địa chỉ không có sẵn"}
              </p>
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginBottom: "8px",
                }}
              >
                {location.Telephone
                  ? location.Telephone
                  : "Số điện thoại không có sẵn"}
              </p>
              {/* Nếu iframe_link không null thì hiển thị */}
              {location.iframe_link && (
                <iframe
                  src={location.iframe_link}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Map"
                ></iframe>
              )}
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default LocationInfoTab;
