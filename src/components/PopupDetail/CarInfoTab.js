import React, { useState } from "react";
import { Row, Col, Button, Typography, Card, Image,Input } from "antd";
import { LeftOutlined, RightOutlined,UnorderedListOutlined,CheckCircleOutlined } from "@ant-design/icons";
import "./CarInfoTab.css";
const { Title, Text } = Typography;

const CarInfoTab = ({ car }) => {
  // Dữ liệu xe nhận được
  console.log("Dữ liệu xe nhận được:", car);

  // Quy tắc xác định màu từ URL hình ảnh
  const colorKeywords = {
    Red: "red",
    Standard: "standard",
    Black: "black",
    Yellow: "yellow"
  };

  // Tạo map liên kết màu với các hình ảnh tương ứng
  const colorImagesMap = car.colors.reduce((acc, color) => {
    const colorKey = colorKeywords[color]; // Tìm từ khóa tương ứng với màu
    const imagesForColor = car.images.filter((img) => img.image_url.toLowerCase().includes(colorKey));
    acc[color] = imagesForColor;
    return acc;
  }, {});

  // Màu hiện tại đang chọn
  const [currentColor, setCurrentColor] = useState(car.colors?.[0]);
  const [mainImage, setMainImage] = useState(
    colorImagesMap[currentColor]?.[0]?.image_url || car.main_img
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const thumbnailsPerPage = 6;
  const totalThumbnails = colorImagesMap[currentColor]?.length || 0;
  
  // Hiển thị các thumbnail cho màu hiện tại
  const visibleThumbnails = colorImagesMap[currentColor]?.slice(
    currentIndex,
    Math.min(currentIndex + thumbnailsPerPage, totalThumbnails)
  ) || [];

  // Hàm xử lý khi đổi màu xe
  const handleColorChange = (color) => {
    setCurrentColor(color); 
    const colorImages = colorImagesMap[color]; 
    if (colorImages && colorImages.length > 0) {
      const firstImageOfColor = colorImages[0].image_url; 
      setMainImage(firstImageOfColor); 
      setCurrentIndex(0); //
    } else {
      setMainImage(car.main_img); 
    }
  };

  const handleThumbnailClick = (imgUrl) => {
    setMainImage(imgUrl);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + thumbnailsPerPage, totalThumbnails - thumbnailsPerPage)
    );
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - thumbnailsPerPage, 0));
  };

  return (
    <Row gutter={20} justify="center">
      <Col xs={24} md={16} style={{ maxWidth: "1200px", width: "100%" }}>
        {/* Ảnh chính */}
        <Card
          cover={
            <Image
              src={mainImage} // Ảnh chính là ảnh đầu tiên hoặc ảnh đã chọn
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
              <Col key={idx} style={{ display: "inline-block", justifyContent: "center" }}>
                <Image
                  src={img.image_url} 
                  alt={`Thumbnail ${currentIndex + idx}`}
                  preview={false}
                  onClick={() => handleThumbnailClick(img.image_url)} 
                  style={{
                    cursor: "pointer",
                    width: "110px",
                    height: "70px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    border:
                      mainImage === img.image_url
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

        <Row justify="space-between" style={{ padding: 0, marginTop: "20px" }}>
          <Title level={4}>{car.name || "Sample Car Name"}</Title>
          <Text strong style={{ fontSize: "18px" }}>
            ${car.price || "99999"}
          </Text>
        </Row>
      </Col>
      <Col xs={24} md={8}>
     
        <div style={{ padding: "10px", border: "1px solid #e8e8e8", borderRadius: "10px" ,marginBottom:"20px"}}>
      <Input placeholder="Search color" />

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
       
        <p
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: "5px 10px",
            borderRadius: "8px",
            transition: "background-color 0.3s ease", // Hiệu ứng mượt khi thay đổi màu nền
          }}
          className="hover-item"
        >
          <UnorderedListOutlined style={{ marginRight: "5px" }} />Technical Data
        </p>

        {/* Standard Equipment */}
        <p
          style={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            padding: "5px 10px",
            borderRadius: "8px",
            transition: "background-color 0.3s ease", // Hiệu ứng mượt khi thay đổi màu nền
          }}
          className="hover-item"
        >
          <CheckCircleOutlined style={{ marginRight: "5px" }} />Standard Equipment
        </p>
      </div>
    </div>
    <div style={{ padding: "10px", border: "1px solid #e8e8e8", borderRadius: "10px" }}>
  <Title level={4}>{car.name || "Sample Car Name"}</Title>
  

  <Row
  justify="center"
  style={{ marginTop: "20px", flexWrap: "wrap", display: "flex", justifyContent: "space-between" }}
>
  {car.colors.map((color, index) => (
    <Button
      key={color}
      onClick={() => handleColorChange(color)}
      style={{
        backgroundColor: color.toLowerCase(),
        color: "white",
        width: "160px",
        height: "44px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "5px",
        border:
          currentColor === color
            ? "2px solid #1890ff"
            : color.toLowerCase() === "white" || color.toLowerCase() === "#ffffff"
            ? "1px solid #000000" // Áp dụng viền cho màu trắng
            : "none", // Không viền nếu không phải trắng
        cursor: "pointer",
      }}
    >
      {/* Không hiển thị chữ trên nút */}
    </Button>
  ))}
</Row>

</div>

      
      </Col>
    </Row>
  );
};

export default CarInfoTab;
