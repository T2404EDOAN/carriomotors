import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Input, Button, Drawer } from "antd";
import {
  SearchOutlined,
  UserOutlined,
  EnvironmentOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const ImprovedHeader = () => {
  // Quản lý trạng thái mở rộng của thanh tìm kiếm
  const [searchExpanded, setSearchExpanded] = useState(false);
  // Quản lý trạng thái hiển thị của Drawer khi màn hình nhỏ
  const [drawerVisible, setDrawerVisible] = useState(false);
  // Quản lý trạng thái màn hình lớn hay nhỏ
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  // Hàm lắng nghe khi thay đổi kích thước màn hình để xác định màn hình lớn hay nhỏ
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Các item trong menu điều hướng
  const menuItems = [
    { key: "home", label: "Home", link: "/" },
    { key: "vehicles", label: "Vehicles", link: "/vehicles" },
    { key: "services", label: "Services", link: "/services" },
    { key: "finance", label: "Finance", link: "/shopping" },
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

  // Hàm render menu, có thể điều chỉnh chế độ hiển thị "horizontal" hoặc "vertical"
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
    // Header được thiết lập cố định trên cùng và chiếm toàn bộ chiều rộng màn hình
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white">
      <div className="w-full px-4">
        <div className="flex items-center h-16 px-8">
          {/* Logo của trang */}
          <div className="flex-none mr-8">
            <Link to="/">
              <img src="/logo2.png" alt="Logo" className="h-12 md:h-16" />
            </Link>
          </div>
          {/* Hiển thị menu điều hướng khi màn hình lớn */}
          <div className="flex-grow flex justify-center">
            {isLargeScreen && renderMenu()}
          </div>
          {/* Các nút điều hướng bên phải */}
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
            />
            {/* Hiển thị nút mở menu khi màn hình nhỏ */}
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
      {/* Drawer chứa menu khi màn hình nhỏ */}
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
      {/* Style tùy chỉnh để bỏ in đậm và gạch chân khi hover */}
      <style jsx>{`
        /* Đảm bảo các liên kết trong menu không có gạch chân và không in đậm */
        .ant-menu-item a,
        .ant-menu-submenu-title {
          text-decoration: none !important; /* Không có gạch chân */
          font-weight: normal !important; /* Font bình thường */
        }
        /* Không có gạch chân khi hover vào liên kết */
        .ant-menu-item a:hover,
        .ant-menu-submenu-title:hover {
          text-decoration: none !important; /* Không có gạch chân khi hover */
          font-weight: normal !important; /* Font bình thường khi hover */
        }

        /* Chỉnh sửa vấn đề ellipsis */
        .ant-menu-item,
        .ant-menu-submenu-title {
          white-space: nowrap !important; /* Không cho phép xuống dòng */
          overflow: visible !important; /* Đảm bảo văn bản không bị ẩn */
          text-overflow: initial !important; /* Không cắt văn bản */
        }

        /* Các thuộc tính khác của input và button */
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

        /* Remove underline and ellipsis */
        .ant-menu-item a,
        .ant-menu-submenu-title a {
          text-decoration: none !important;
        }

        .ant-menu-item:hover,
        .ant-menu-item-active,
        .ant-menu-item-selected,
        .ant-menu-submenu:hover,
        .ant-menu-submenu-active,
        .ant-menu-submenu-selected {
          background-color: transparent !important;
          border-bottom: none !important;
        }

        .ant-menu-item a:hover,
        .ant-menu-submenu-title:hover {
          text-decoration: none !important;
        }
      `}</style>
    </header>
  );
};

export default ImprovedHeader;
