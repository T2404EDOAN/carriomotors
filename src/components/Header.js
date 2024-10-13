import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Input, Button, Drawer, Modal } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  EnvironmentOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import SignInPopup from "./SignInPopup";
import "../assets/styles/Header.css";

const ImprovedHeader = () => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [isSignInPopupVisible, setIsSignInPopupVisible] = useState(false);
  const [realtimeVisitors, setRealtimeVisitors] = useState(1); // Initially set to 1

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchRealtimeVisitors = () => {
    setRealtimeVisitors((prev) => prev + Math.floor(Math.random() * 2) + 1);
  };

  useEffect(() => {
    const initialTimeout = setTimeout(fetchRealtimeVisitors, 10000);

   
    const interval = setInterval(fetchRealtimeVisitors, 30000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
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
    <Menu
      mode={mode}
      className={`border-0 bg-transparent ${
        mode === "vertical" ? "w-full" : ""
      }`}
    >
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
              <img src="/logo2.png" alt="Logo" className="h-13 md:h-16" />
            </Link>
            <div className="flex items-center ml-4">
              <UserOutlined style={{ fontSize: "20px", marginRight: "5px" }} />
              <span className="text-base">{realtimeVisitors}</span>
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
              className={`transition-all duration-300 ease-in-out ${
                searchExpanded ? "w-64" : "w-10"
              } hidden sm:block`}
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
              onClick={() => setIsSignInPopupVisible(true)}
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
