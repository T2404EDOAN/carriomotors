import React, { useState } from "react";
import { Row, Col, Button, Typography, Card, Image } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars-2';

const { Title, Text } = Typography;

const CarInfoTab = ({ car, mainImage, setMainImage }) => {
  const placeholderImages = [
    "https://via.placeholder.com/800x400?text=Car+Image+1",
    "https://via.placeholder.com/800x400?text=Car+Image+2",
    "https://via.placeholder.com/800x400?text=Car+Image+3",
    "https://via.placeholder.com/800x400?text=Car+Image+4",
    "https://via.placeholder.com/800x400?text=Car+Image+5"
  ];

  const images = car && car.images && car.images.length > 0 ? car.images : placeholderImages;

  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailsPerPage = 6;
  const totalThumbnails = images.length;
  const visibleThumbnails = images.slice(currentIndex, currentIndex + thumbnailsPerPage);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + thumbnailsPerPage, totalThumbnails - thumbnailsPerPage));
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - thumbnailsPerPage, 0));
  };

  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };

  return (
    <Row gutter={0} justify="center">
      <Col xs={24} md={16} style={{ maxWidth: '1200px', width: '100%' }}>
        <Card
          cover={<Image 
            src={mainImage}
            alt="Main Car"
            preview={false}
            style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: '16px' }} />}
          style={{ margin: 0 }}
          bodyStyle={{ padding: 0 }}
        />
        <div style={{ position: 'relative', width: '100%' }}>
          {currentIndex > 0 && (
            <Button 
              shape="circle" 
              icon={<LeftOutlined />} 
              onClick={handlePrevClick} 
              style={{ position: 'absolute', top: '50%', left: '-5px', transform: 'translateY(-50%)', zIndex: 1 }} 
            />
          )}
          <Row gutter={8} style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '10px' }}>
            {visibleThumbnails.map((img, idx) => (
              <Col key={idx} style={{ display: 'inline-block', justifyContent: 'center' }}>
                <Image
                  src={img}
                  alt={`Thumbnail ${currentIndex + idx}`}
                  preview={false}
                  onClick={() => handleThumbnailClick(img)}
                  style={{ cursor: 'pointer', width: '110px', height: '70px', objectFit: 'cover', borderRadius: '10px', border: mainImage === img ? "2px solid #1890ff" : "2px solid transparent", padding: '2px' }}
                />
              </Col>
            ))}
          </Row>
          {currentIndex + thumbnailsPerPage < totalThumbnails && (
            <Button 
              shape="circle" 
              icon={<RightOutlined />} 
              onClick={handleNextClick} 
              style={{ position: 'absolute', top: '50%', right: '5px', transform: 'translateY(-50%)', zIndex: 1 }} 
            />
          )}
        </div>

        <Row justify="space-between" style={{ padding: 0 }}>
          <Title level={4}>{car.name || "Sample Car Name"}</Title>
          <Text strong style={{ fontSize: '18px' }}>Price: ${car.price || "99999"}</Text>
        </Row>
      </Col>

      <Col xs={24} md={8}>
        <Scrollbars autoHeight autoHeightMax={400}>
          <Card title="Car Details" style={{ marginLeft: 20 }}> 
            <Text><strong>Engine:</strong> {car.engine || "Sample Engine"}</Text><br />
            <Text><strong>Transmission:</strong> {car.transmission || "Automatic"}</Text><br />
            <Text><strong>Top Speed:</strong> {car.topSpeed || "250 km/h"}</Text><br />
            <Text><strong>Acceleration (0-100):</strong> {car.acceleration || "3.5s"}</Text>
          </Card>
        </Scrollbars>
      </Col>
    </Row>
  );
};

export default CarInfoTab;
