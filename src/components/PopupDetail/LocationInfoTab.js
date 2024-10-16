import React, { useState } from "react";
import { Row, Col, Card, Image } from "antd";

const LocationInfoTab = ({ locationData, onSelectLocation }) => {
  if (!locationData || locationData.length === 0) {
    return <p>Không có thông tin địa điểm.</p>;
  }

  return (
    <Row gutter={[16, 16]} justify="start">
      {locationData.map((location, index) => (
        <Col xs={24} sm={12} md={24} lg={12} key={index}>
          <Card
            hoverable
            bordered={false}
            style={{
              textAlign: "left",
              height: "100%",
              width: "100%", // Chiều rộng full của div cha
              border: "1px solid rgba(0, 0, 0, 0.1)", // Viền mờ nhạt
              boxShadow: "none", // Không đổ bóng mặc định
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
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)"; // Đổ bóng khi hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none"; // Không đổ bóng khi không hover
            }}
          >
            {/* Phần logo riêng */}
            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginBottom: "10px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.1)", // Mỏng và mờ hơn
                paddingBottom: "10px", // Tạo khoảng cách giữa logo và viền dưới
              }}
            >
              <Image
                src="/src/bmwlogo.jpg"
                alt="BMW Logo"
                preview={false}
                style={{
                  width: "150px", // Kích thước logo
                  height: "150px",
                  objectFit: "contain",
                  borderRadius: "0",
                }}
              />
            </div>

            {/* Phần thông tin */}
            <div
              style={{
                padding: "10px",
              }}
            >
              <h3>{location.LocationName}</h3>
              <p>{location.Address || "Địa chỉ không có sẵn"}</p>
              {/* Thêm viền trên số điện thoại, không full chiều rộng */}
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "16px",
                  marginBottom: "8px",
                  borderTop: "1px solid rgba(0, 0, 0, 0.1)", // Thêm viền trên
                  width: "90%", // Chỉ chiếm 50% chiều rộng
                  margin: "10px auto 0", // Căn giữa
                  paddingTop: "10px", // Khoảng cách giữa viền và nội dung
                }}
              >
                {location.Telephone || "Số điện thoại không có sẵn"}
              </p>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const GoogleMap = ({ iframeLink }) => {
  if (!iframeLink) {
    return <p>Không có bản đồ cho địa điểm này.</p>;
  }

  // Kiểm tra và xử lý iframe_link
  const sanitizedIframeLink = iframeLink.startsWith("<iframe")
    ? new DOMParser()
        .parseFromString(iframeLink, "text/html")
        .querySelector("iframe")?.src
    : iframeLink;

  if (!sanitizedIframeLink) {
    return <p>Liên kết bản đồ không hợp lệ.</p>;
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
      <Col xs={24} md={12}>
        {selectedLocation ? (
          <GoogleMap iframeLink={selectedLocation.iframe_link} />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              height: "500px",
              backgroundColor: "#f0f2f5",
            }}
          >
            <p style={{ fontSize: "18px", color: "#8c8c8c" }}>
              Vui lòng chọn một địa điểm để xem bản đồ
            </p>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default MainLayout;
