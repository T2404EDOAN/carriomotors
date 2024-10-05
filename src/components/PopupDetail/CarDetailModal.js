import React, { useState, useEffect } from "react";
import { Modal, Tabs } from "antd"; // Sử dụng Tabs từ Ant Design
import CarInfoTab from "./CarInfoTab";

const { TabPane } = Tabs; // Sử dụng TabPane từ Ant Design

const CarDetailModal = ({
  isVisible,
  onClose,
  car,
  mainImage,
  setMainImage,
}) => {
  const [activeTab, setActiveTab] = useState("1");

  // Reset tab về tab đầu tiên khi modal đóng
  useEffect(() => {
    if (!isVisible) {
      setActiveTab("1");
    }
  }, [isVisible]);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    <Modal
      title={car?.model || "Car Details"}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      width={1400}
    >
      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <TabPane tab="Design" key="1">
          {/* Hiển thị thông tin và hình ảnh trong CarInfoTab */}
          <CarInfoTab
            car={car}
            mainImage={mainImage}
            setMainImage={setMainImage}
          />
        </TabPane>
        <TabPane tab="Exterior" key="2">
          <div>Thông số kỹ thuật xe</div>
        </TabPane>
        <TabPane tab="Service" key="3">
          <div>Bình luận về xe</div>
        </TabPane>
      </Tabs>
    </Modal>
  );
};

export default CarDetailModal;
