import React, { useState } from "react";
import { Row, Col, Button, Typography, Card, Image } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Scrollbars } from "react-custom-scrollbars-2";

const { Title, Text } = Typography;

const CarInfoTab = ({ car, mainImage, setMainImage }) => {
  // Nếu car.images tồn tại và có dữ liệu thì sử dụng nó, ngược lại dùng hình placeholder
  const images =
    car && car.images && car.images.length > 0
      ? car.images.map((imgObj) => imgObj.url) // Chỉ lấy URL của ảnh
      : [
          "https://via.placeholder.com/800x400?text=Car+Image+1",
          "https://via.placeholder.com/800x400?text=Car+Image+2",
          "https://via.placeholder.com/800x400?text=Car+Image+3",
        ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailsPerPage = 6;
  const totalThumbnails = images.length;
  const visibleThumbnails = images.slice(
    currentIndex,
    currentIndex + thumbnailsPerPage
  );

  // Khi bấm vào ảnh nhỏ sẽ đặt ảnh đó làm ảnh chính
  const handleThumbnailClick = (imgUrl) => {
    setMainImage(imgUrl);
  };

  // Khi bấm next sẽ di chuyển qua một nhóm ảnh
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + thumbnailsPerPage, totalThumbnails - thumbnailsPerPage)
    );
  };

  // Khi bấm prev sẽ di chuyển qua một nhóm ảnh
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - thumbnailsPerPage, 0));
  };

  return (
    <Row gutter={0} justify="center">
      <Col xs={24} md={16} style={{ maxWidth: "1200px", width: "100%" }}>
        {/* Ảnh chính */}
        <Card
          cover={
            <Image
              src={mainImage || images[0]} // Ảnh chính là ảnh đầu tiên hoặc ảnh đã chọn
              alt="Main Car"
              preview={false}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
          }
          style={{ margin: 0 }}
          bodyStyle={{ padding: 0 }}
        />
        <div style={{ position: "relative", width: "100%" }}>
          {currentIndex > 0 && (
            <Button
              shape="circle"
              icon={<LeftOutlined />}
              onClick={handlePrevClick}
              style={{
                position: "absolute",
                top: "50%",
                left: "-5px",
                transform: "translateY(-50%)",
                zIndex: 1,
              }}
            />
          )}
          {/* Danh sách ảnh thu nhỏ */}
          <Row
            gutter={8}
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "10px",
            }}
          >
            {visibleThumbnails.map((img, idx) => (
              <Col
                key={idx}
                style={{ display: "inline-block", justifyContent: "center" }}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${currentIndex + idx}`}
                  preview={false}
                  onClick={() => handleThumbnailClick(img)} // Thay đổi ảnh chính khi bấm vào ảnh thu nhỏ
                  style={{
                    cursor: "pointer",
                    width: "110px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    border:
                      mainImage === img
                        ? "2px solid #1890ff"
                        : "2px solid transparent",
                    padding: "2px",
                  }}
                />
              </Col>
            ))}
          </Row>
          {currentIndex + thumbnailsPerPage < totalThumbnails && (
            <Button
              shape="circle"
              icon={<RightOutlined />}
              onClick={handleNextClick}
              style={{
                position: "absolute",
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
                zIndex: 1,
              }}
            />
          )}
        </div>

        {/* Hiển thị tên xe và giá */}
        <Row justify="space-between" style={{ padding: 0,marginTop: '20px' }}>
          <Title level={4}>{car.name || "Sample Car Name"}</Title>
          <Text strong style={{ fontSize: "18px" }}>
             ${car.price || "99999"}
          </Text>
        </Row>
      </Col>

      {/* Thông tin chi tiết xe */}
      <Col xs={24} md={8}>
        <Scrollbars autoHeight autoHeightMax={400}>
          <Card title="Car Details" style={{ marginLeft: 20 }}>
            <Text>
              <strong>Engine:</strong> {car.engine_power || "Sample Engine"}
            </Text>
            <br />
            <Text>
              <strong>Transmission:</strong> {car.transmission || "Automatic"}
            </Text>
            <br />
            <Text>
              <strong>Top Speed:</strong> {car.topSpeed || "250 km/h"}
            </Text>
            <br />
            <Text>
              <strong>Acceleration (0-100):</strong> {car.acceleration || "3.5s"}
            </Text>
          </Card>
        </Scrollbars>
      </Col>
    </Row>
  );
};

export default CarInfoTab;
