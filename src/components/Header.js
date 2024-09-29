import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Input, Button, Dropdown, Drawer } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  EnvironmentOutlined,
  MenuOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const ImprovedHeader = () => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { key: "home", label: "Home", link: "/" },
    { key: "vehicles", label: "Vehicles", link: "/vehicles" },
    { key: "services", label: "Services", link: "/services" },
    { key: "finance", label: "Finance", link: "/shopping" },
    {
      key: "aboutus",
      label: "About us",
      children: [
        { key: "company", label: "Our Company", link: "/about/company" },
        { key: "careers", label: "Careers", link: "/about/careers" },
        { key: "contact", label: "Contact Us", link: "/about/contact" },
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto mt-6 px-4">
        <div className="bg-white shadow-md rounded-full flex items-center h-20 px-6">
          <div className="flex-none mr-8">
            <Link to="/">
              <img src="/logo2.png" alt="Logo" className="h-12 md:h-16" />
            </Link>
          </div>
          <div className="flex-grow flex justify-center">
            {isLargeScreen && renderMenu()}
          </div>
          <div className="flex-none flex items-center space-x-4">
            <Button
              type="text"
              icon={<EnvironmentOutlined />}
              className="hidden md:flex items-center text-base"
            >
              Store location
            </Button>
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
        <div className="mt-4">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            className="rounded-full text-base mb-4"
          />
          <Button
            type="primary"
            icon={<EnvironmentOutlined />}
            className="w-full mb-4"
          >
            Store location
          </Button>
          <Button type="primary" icon={<UserOutlined />} className="w-full">
            User Account
          </Button>
        </div>
      </Drawer>
      <style jsx>{`
        .ant-menu-horizontal > .ant-menu-item,
        .ant-menu-horizontal > .ant-menu-submenu,
        .ant-drawer .ant-menu-item,
        .ant-drawer .ant-menu-submenu-title {
          font-size: 16px;
        }
        .ant-input {
          font-size: 16px;
        }
        .ant-btn {
          font-size: 16px;
        }
        @media (min-width: 1024px) {
          .ant-menu-horizontal {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};

export default ImprovedHeader;
