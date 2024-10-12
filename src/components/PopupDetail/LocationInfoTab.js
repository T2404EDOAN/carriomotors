import React from "react";
import { Row, Col, Card, Image, Input, Button } from "antd";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import audi from "../../assets/images/Location_images/audi.jpg";
import "../../assets/styles/Location.css";

const LocationInfoTab = ({ locationData }) => {
  if (!locationData || locationData.length === 0) {
    return <p>Không có thông tin địa điểm.</p>;
  }

  return (
    <Row gutter={[330, 330]} justify="start" style={{ marginLeft: "-143px" }}>
      {locationData.map((location, index) => (
        <Col xs={24} sm={12} md={8} lg={6} key={index}>
          <Card
            hoverable
            cover={
              <Image
                src="/src/bmwlogo.jpg" // Thay logo hoặc hình ảnh tương ứng
                alt="BMW Logo"
                preview={false}
                style={{
                  width: "300px",
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
              width: "300px", // Điều chỉnh width phù hợp với layout mới
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            bodyStyle={{
              padding: "10px",
              width: "300px", // Điều chỉnh width phù hợp với layout mới
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
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

const OtherContent = () => {
  return (
    <div>
      {/* <div className="boxx1">
        <LocationOnIcon
          style={{
            fontSize: "48px",
            color: "#555",
            width: "32px",
            borderRadius: "45%",
          }}
        />
        <div className="anhson">CHOOSE YOUR LOCAL LOCATION CARRIO CENTER</div>
      </div>
      <div className="boxx2">
        <img src={audi} alt="audi" />
      </div>
      <div className="boxx3">
        <div>SEARCH BY VEHICLE</div>
        <Input placeholder="e.g. Audi of Anytown" />
        <div>OR</div>
        <div>SEARCH BY LOCATION</div>
        <Input placeholder="ZIP or City/State" />
      </div>
      <div className="boxx4">
        <Button type="primary">SEARCH</Button>
      </div> */}
    </div>
  );
};

const MainLayout = ({ locationData }) => {
  return (
    <Row gutter={5}>
      {/* Phần chiếm 60% */}
      <Col xs={24} md={14}>
        <LocationInfoTab locationData={locationData} />
      </Col>

      {/* Đường kẻ ngăn cách */}
      <Col xs={0} md={1}>
        <div
          style={{
            height: "600px",
            width: "1px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ccc", // Màu sắc của đường kẻ
            margin: "0 auto",
          }}
        />
      </Col>

      {/* Phần chiếm 45% */}
      <Col xs={24} md={8}>
        <OtherContent />
      </Col>
    </Row>
  );
};

export default MainLayout;
