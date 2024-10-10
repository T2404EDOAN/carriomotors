import React, { useState } from "react";
import {
  Row,
  Col,
  Button,
  Typography,
  Card,
  Image,
  Input,
  Drawer,
  Collapse,
  Statistic,
} from "antd";
import {
  LeftOutlined,
  CloseOutlined,
  RightOutlined,
  UnorderedListOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "./CarInfoTab.css";

const { Title } = Typography;
const { Panel } = Collapse;

const CarInfoTab = ({ car, onDrawerToggle }) => {
  const colorKeywords = {
    Standard: "standard",
    Black: "black",
    Yellow: "yellow",
    Grey: "gray",
    Red: "red",
  };

  const colorImagesMap = car.colors.reduce((acc, color) => {
    const colorKey = colorKeywords[color];
    const imagesForColor = car.images.filter((img) =>
      img.image_url.toLowerCase().includes(colorKey)
    );
    acc[color] = imagesForColor;
    return acc;
  }, {});

  const [currentColor, setCurrentColor] = useState(car.colors?.[0]);
  const [mainImage, setMainImage] = useState(
    colorImagesMap[currentColor]?.[0]?.image_url || car.main_img
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTechnicalDataVisible, setIsTechnicalDataVisible] = useState(false);

  const thumbnailsPerPage = 6;
  const totalThumbnails = colorImagesMap[currentColor]?.length || 0;

  const visibleThumbnails =
    colorImagesMap[currentColor]?.slice(
      currentIndex,
      Math.min(currentIndex + thumbnailsPerPage, totalThumbnails)
    ) || [];

  const handleColorChange = (color) => {
    setCurrentColor(color);
    const colorImages = colorImagesMap[color];
    if (colorImages && colorImages.length > 0) {
      const firstImageOfColor = colorImages[0].image_url;
      setMainImage(firstImageOfColor);
      setCurrentIndex(0);
    } else {
      setMainImage(car.main_img);
    }
  };

  const handleThumbnailClick = (imgUrl) => {
    setMainImage(imgUrl);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(
        prevIndex + thumbnailsPerPage,
        totalThumbnails - thumbnailsPerPage
      )
    );
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - thumbnailsPerPage, 0));
  };

  const showTechnicalDataDrawer = () => {
    setIsTechnicalDataVisible(true);
    onDrawerToggle(true);
  };

  const closeTechnicalDataDrawer = () => {
    setIsTechnicalDataVisible(false);
    onDrawerToggle(false);
  };

  return (
    <div className={isTechnicalDataVisible ? "blur-background" : ""}>
      <Row gutter={20} justify="center">
        <Col xs={24} md={16} style={{ maxWidth: "1200px", width: "100%" }}>
          <Card
            cover={
              <Image
                src={mainImage}
                alt="Main Car"
                preview={false}
                style={{
                  width: "100%",
                  height: "500px",
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
        </Col>

        <Col xs={24} md={8}>
          <div
            style={{
              padding: "10px",
              border: "1px solid #e8e8e8",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <Input placeholder="Search color" />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "5px 10px",
                  borderRadius: "8px",
                  transition: "background-color 0.3s ease",
                }}
                className="hover-item"
                onClick={showTechnicalDataDrawer}
              >
                <UnorderedListOutlined style={{ marginRight: "5px" }} />
                Technical Data
              </p>

              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: "5px 10px",
                  borderRadius: "8px",
                  transition: "background-color 0.3s ease",
                }}
                className="hover-item"
              >
                <CheckCircleOutlined style={{ marginRight: "5px" }} />
                Standard Equipment
              </p>
            </div>
          </div>

          <div
            style={{
              padding: "10px",
              border: "1px solid #e8e8e8",
              borderRadius: "10px",
            }}
          >
            <Title level={3}>Exterior Colours</Title>
            <Row
              justify="center"
              style={{
                marginTop: "20px",
                flexWrap: "wrap",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {car.colors.map((color) => (
                <div
                  key={color}
                  style={{
                    width: "160px",
                    height: "70px",
                    margin: "5px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Button
                    onClick={() => handleColorChange(color)}
                    style={{
                      backgroundColor: color.toLowerCase(),
                      width: "100%",
                      height: "44px",
                      border:
                        currentColor === color
                          ? "2px solid #1890ff"
                          : color.toLowerCase() === "white" ||
                            color.toLowerCase() === "#ffffff"
                          ? "1px solid #000000"
                          : "none",
                      cursor: "pointer",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "12px",
                      marginTop: "5px",
                      color: "#000",
                    }}
                  >
                    {color}
                  </span>
                </div>
              ))}
            </Row>
          </div>
        </Col>

        {/* Drawer */}
        <Drawer
          title={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span>Technical Data</span>
              <CloseOutlined
                onClick={closeTechnicalDataDrawer}
                style={{ cursor: "pointer" }}
              />
            </div>
          }
          placement="right"
          closable={false}
          onClose={closeTechnicalDataDrawer}
          visible={isTechnicalDataVisible}
          width="50%"
          bodyStyle={{ padding: "40px" }}
        >
          <Card>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Statistic
                  title="Model Name"
                  className="custom-statistic-value"
                  value={car.car_model_name}
                />
                <Statistic
                  title="Price ($)"
                  className="custom-statistic-value"
                  value={car.price}
                />
                <Statistic
                  title="Year"
                  className="custom-statistic-value"
                  value={car.year}
                />
                <Statistic
                  title="Fuel Type"
                  className="custom-statistic-value"
                  value={car.fuel_type}
                />
                <Statistic
                  title="Transmission"
                  className="custom-statistic-value"
                  value={car.transmission}
                />
                <Statistic
                  title="Seating Capacity"
                  className="custom-statistic-value"
                  value={car.seating_capacity}
                />
                <Statistic
                  title="Fuel Tank Capacity (L)"
                  className="custom-statistic-value"
                  value={car.fuel_tank_capacity}
                />
              </Col>
              <Col span={12}>
                <Image
                  src={car.main_img} // Hiển thị lại ảnh của xe
                  alt="Car Top View"
                  width="100%"
                />
              </Col>
            </Row>
          </Card>

          <Collapse accordion className="custom-collapse">
            {/* Phần Collapse cho Performance */}
            <Panel header="Performance" key="1">
              <div className="statistic-list">
                <div className="statistic-item">
                  <span className="statistic-title">Top Speed :</span>
                  <span className="statistic-value">{car.top_speed} km/h</span>
                </div>
                <div className="statistic-item">
                  <span className="statistic-title">
                    Acceleration 0-100 km/h :
                  </span>
                  <span className="statistic-value">
                    {car.acceleration_0_100} s
                  </span>
                </div>
                <div className="statistic-item">
                  <span className="statistic-title">Torque :</span>
                  <span className="statistic-value">{car.torque} Nm</span>
                </div>
                <div className="statistic-item">
                  <span className="statistic-title">Braking Distance :</span>
                  <span className="statistic-value">
                    {car.braking_distance} m
                  </span>
                </div>
                <div className="statistic-item">
                  <span className="statistic-title">Curb Weight :</span>
                  <span className="statistic-value">{car.curb_weight} kg</span>
                </div>
                <div className="statistic-item">
                  <span className="statistic-title">Fuel Efficiency :</span>
                  <span className="statistic-value">
                    {car.fuel_efficiency} L/100km
                  </span>
                </div>
              </div>
            </Panel>

            {/* Phần Collapse cho Power Unit */}
            <Panel header="Power Unit" key="2">
              <div className="statistic-list">
                <div className="statistic-item">
                  <span className="statistic-title">Engine Power :</span>
                  <span className="statistic-value">{car.engine_power} PS</span>
                </div>
                <div className="statistic-item">
                  <span className="statistic-title">Engine Type :</span>
                  <span className="statistic-value">{car.engine_type}</span>
                </div>
                <div className="statistic-item">
                  <span className="statistic-title">Horsepower :</span>
                  <span className="statistic-value">{car.horsepower} hp</span>
                </div>
                <div className="statistic-item">
                  <span className="statistic-title">Drivetrain :</span>
                  <span className="statistic-value">{car.drivetrain}</span>
                </div>
                <div className="statistic-item">
                  <span className="statistic-title">CO2 Emission :</span>
                  <span className="statistic-value">
                    {car.co2_emission} g/km
                  </span>
                </div>
              </div>
            </Panel>

            {/* Phần Collapse cho Other details */}
            <Panel header="Other Details" key="3">
              <div>{/* Hiển thị các thông tin khác nếu có */}</div>
            </Panel>
          </Collapse>
        </Drawer>
      </Row>
    </div>
  );
};

export default CarInfoTab;
