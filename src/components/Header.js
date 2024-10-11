import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Input, Button, Drawer, Modal } from "antd";
import {
  SearchOutlined,
  UserOutlined, // Icon người
  EnvironmentOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import SignInPopup from './SignInPopup'; 
import '../assets/styles/Header.css'; 

const ImprovedHeader = () => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [isSignInPopupVisible, setIsSignInPopupVisible] = useState(false);
  const [realtimeVisitors, setRealtimeVisitors] = useState(0); // Số lượng người truy cập

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Gọi API để lấy số lượng người truy cập thời gian thực từ Google Analytics
  const fetchRealtimeVisitors = async () => {
    const accessToken = 'ya29.a0AcM612yW0TyKxdupSboOMQSo8DjLlTx5yiabKngfC1D0sT7gJcnevJKjjtq5VYt9VfGRf3dr7ADeUoGtcOuYyFRC6av4m8cdy1OFOwi-zVNVb4zzzXzqxGEknzefBzcllBpw7Y3xqYQyWssDMOGCu5KOPAHaac-eOm9cHhFAaCgYKASgSARASFQHGX2MiW7eYwVMQqVMtm8K67T4t4Q0175'; // Thay thế bằng Access Token hợp lệ của bạn
  
    try {
      const response = await fetch(
        `https://analyticsdata.googleapis.com/v1beta/properties/462778286:runRealtimeReport`, 
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`, // Chèn Access Token vào Authorization Header
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            metrics: [{ name: "activeUsers" }] // Lấy số lượng người dùng đang hoạt động
          }),
        }
      );
  
      if (!response.ok) {
        const errorDetail = await response.json();
        console.error("Error details:", errorDetail);
      } else {
        const data = await response.json();
        console.log("Realtime visitors:", data);
      }
    } catch (error) {
      console.error("Error fetching realtime visitors:", error);
    }
  };
  

  // Gọi API mỗi 60 giây
  useEffect(() => {
    fetchRealtimeVisitors();
    const interval = setInterval(fetchRealtimeVisitors, 60000); 
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { key: "home", label: "Home", link: "/" },
    { key: "vehicles", label: "Vehicles", link: "/vehicles" },
    { key: "services", label: "Services", link: "/services" },
    { key: "finance", label: "Finance", link: "/finance" },
    {
      key: "aboutus",
      label: "About Us",
      children: [
        { key: "company", label: "Our Company", link: "/about/company" },
        { key: "careers", label: "Careers", link: "/about/careers" },
        { key: "contact", label: "Contact Us", link: "/about/contact" },
        { key: "location", label: "Location", link: "/about/location" },
      ],
    },
  ];

  const renderMenu = (mode = "horizontal") => (
    <Menu mode={mode} className={`border-0 bg-transparent ${mode === "vertical" ? "w-full" : ""}`}>
      {menuItems.map((item) =>
        item.children ? (
          <Menu.SubMenu key={item.key} title={item.label}>
            {item.children.map((child) => (
              <Menu.Item key={child.key}>
                <Link to={child.link}>{child.label}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={item.key}>
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        )
      )}
    </Menu>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white">
      <div className="w-full px-4">
        <div className="flex items-center h-16 px-8">
          <div className="flex-none mr-8 flex items-center">
            <Link to="/">
              <img src="/logo2.png" alt="Logo" className="h-12 md:h-16" />
            </Link>
           
            <div className="flex items-center ml-4">
              <UserOutlined style={{ fontSize: '20px', marginRight: '5px' }} />
              <span className="text-base">
                {realtimeVisitors}
              </span>
            </div>
          </div>
          <div className="flex-grow flex justify-center">
            {isLargeScreen && renderMenu()}
          </div>
          <div className="flex-none flex items-center space-x-4">
            <Button
              type="text"
              icon={<EnvironmentOutlined />}
              className="hidden md:flex items-center text-base"
            ></Button>
            <div
              className={`transition-all duration-300 ease-in-out ${searchExpanded ? "w-64" : "w-10"} hidden sm:block`}
            >
              <Input
                placeholder="Search..."
                prefix={<SearchOutlined />}
                className="rounded-full text-base"
                onFocus={() => setSearchExpanded(true)}
                onBlur={() => setSearchExpanded(false)}
              />
            </div>
            <Button
              type="text"
              icon={<UserOutlined />}
              className="text-base hidden sm:flex"
              onClick={() => setIsSignInPopupVisible(true)} // Show popup on click
            />
            {!isLargeScreen && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setDrawerVisible(true)}
              />
            )}
          </div>
        </div>
      </div>
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
      >
        {renderMenu("vertical")}
      </Drawer>
      
      {/* Render SignInPopup */}
      <Modal
        visible={isSignInPopupVisible}
        onCancel={() => setIsSignInPopupVisible(false)}
        footer={null}
      >
        <SignInPopup />
      </Modal>
    </header>
  );
};

export default ImprovedHeader;
