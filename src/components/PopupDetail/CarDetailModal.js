import React, { useState, useEffect } from "react";
import { Modal, Tabs, Row, Col, Typography } from "antd";
import CarInfoTab from "./CarInfoTab";
import "./CarDetailModal.css";
import FinanceInfoTab from "./FinanceInfoTab";
import LocationInfoTab from "./LocationInfoTab";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const CarDetailModal = ({
  isVisible,
  onClose,
  car,
  mainImage,
  setMainImage,
}) => {
  const [activeTab, setActiveTab] = useState("1");
  const [isTechnicalDataVisible, setIsTechnicalDataVisible] = useState(false);

  // Reset tab về tab đầu tiên khi modal đóng
  useEffect(() => {
    if (!isVisible) {
      setActiveTab("1");
    }
  }, [isVisible]);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleDrawerToggle = (isOpen) => {
    setIsTechnicalDataVisible(isOpen); // Quản lý trạng thái mở/đóng Drawer
  };

  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={1200}
      // bodyStyle={{ height: "700px" }}
      className={isTechnicalDataVisible ? "blur-background" : ""}
    >
      <Row justify="space-between" align="middle" style={{ marginTop: "30px" }}>
        <Col>
          <Title level={4}>{car?.car_model_name}</Title>
        </Col>
        <Col>
          <Text strong style={{ fontSize: "18px" }}>
            ${car?.price || "99999"}
          </Text>
        </Col>
      </Row>
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Exterior Colours" key="1">
          {/* Hiển thị thông tin và hình ảnh trong CarInfoTab */}
          <CarInfoTab
            car={car}
            mainImage={mainImage}
            setMainImage={setMainImage}
            onDrawerToggle={handleDrawerToggle} // Truyền hàm để điều khiển Drawer
          />
        </TabPane>
        <TabPane tab="Exterior" key="2">
          <div>
            <FinanceInfoTab />
          </div>
        </TabPane>
        <TabPane tab="Finance" key="3">
          <div>
            <FinanceInfoTab />
          </div>
        </TabPane>
        <TabPane tab="Location" key="4">
          <div>
            <LocationInfoTab />
          </div>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default CarDetailModal;
