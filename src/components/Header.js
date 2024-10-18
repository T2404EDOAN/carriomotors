import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  Input,
  Button,
  Drawer,
  Modal,
  Popover,
  Spin,
  Typography,
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  EnvironmentOutlined,
  MenuOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import SignInPopup from "./SignInPopup";
import "../assets/styles/Header.css";
const { Text } = Typography;

const mapContainerStyle = {
  width: "100%",
  height: "250px",
};

const LocationContent = ({ location, error, isLoading }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (location && !mapRef.current) {
      // Tạo bản đồ và gắn vào ref
      mapRef.current = L.map("mapContainer").setView(
        [location.latitude, location.longitude],
        13
      );

      // Thêm tile layer vào bản đồ
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      // Sử dụng icon mặc định của Leaflet (import từ leaflet/dist/images/)
      const defaultIcon = L.icon({
        iconUrl: "/iconlocation.png",
        iconSize: [25, 25],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      // Thêm marker vào bản đồ với icon mặc định
      markerRef.current = L.marker([location.latitude, location.longitude], {
        icon: defaultIcon,
      }).addTo(mapRef.current);
    }

    // Cleanup khi component unmount hoặc khi location thay đổi
    return () => {
      if (mapRef.current) {
        mapRef.current.remove(); // Xóa bản đồ khi component unmount
        mapRef.current = null;
      }
    };
  }, [location]);

  return (
    <div style={{ width: 300, padding: "8px 0" }}>
      <div
        style={{
          borderBottom: "1px solid #f0f0f0",
          paddingBottom: 8,
          marginBottom: 8,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text strong>Your location</Text>
      </div>

      {isLoading ? (
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          <div style={{ marginTop: 8 }}>
            <Text type="secondary">Đang lấy vị trí...</Text>
          </div>
        </div>
      ) : error ? (
        <div style={{ padding: "10px 0" }}>
          <Text type="danger">{error}</Text>
        </div>
      ) : location ? (
        <div>
          <div id="mapContainer" style={mapContainerStyle}></div>
        </div>
      ) : null}
    </div>
  );
};

const ImprovedHeader = () => {
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
  const [isSignInPopupVisible, setIsSignInPopupVisible] = useState(false);
  const [realtimeVisitors, setRealtimeVisitors] = useState(1);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [hoveredSubmenu, setHoveredSubmenu] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

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

  const getLocation = () => {
    if (!currentLocation && !isLoadingLocation) {
      setIsLoadingLocation(true);
      setLocationError(null);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setLocationError(null);
            setIsLoadingLocation(false);
          },
          (error) => {
            setLocationError("Không thể lấy vị trí của bạn");
            setIsLoadingLocation(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          }
        );
      } else {
        setLocationError("Trình duyệt của bạn không hỗ trợ geolocation");
        setIsLoadingLocation(false);
      }
    }
  };

  const menuItems = [
    { key: "home", label: "Home", link: "/" },
    { key: "vehicles", label: "Vehicles", link: "/vehicles" },
    { key: "services", label: "Services", link: "/services" },
    { key: "finance", label: "Finance", link: "/finance" },
    { key: "warranty", label: "Warranty", link: "/warranty" },
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
      className={`border-0 bg-transparent menu-fade ${
        isMenuVisible ? "visible" : ""
      } ${mode === "vertical" ? "w-full" : ""}`}
      style={{ width: "570px" }}
      onMouseEnter={() => setIsMenuVisible(true)}
      onMouseLeave={() => setIsMenuVisible(false)}
    >
      {menuItems.map((item) =>
        item.children ? (
          <Menu.SubMenu
            key={item.key}
            title={item.label}
            onTitleMouseEnter={() => setHoveredSubmenu(item.key)}
            onTitleMouseLeave={() => setHoveredSubmenu(null)}
            className={`submenu-fade ${
              hoveredSubmenu === item.key ? "visible" : ""
            }`}
          >
            {item.children.map((child) => (
              <Menu.Item key={child.key} className="menu-item-fade">
                <Link to={child.link}>{child.label}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item key={item.key} className="menu-item-fade">
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        )
      )}
    </Menu>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-sm">
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
            <Popover
              content={
                <LocationContent
                  location={currentLocation}
                  error={locationError}
                  isLoading={isLoadingLocation}
                />
              }
              trigger="click"
              placement="bottomRight"
              onOpenChange={(visible) => {
                if (visible) getLocation();
              }}
            >
              <Button
                type="text"
                icon={<EnvironmentOutlined />}
                className="hidden md:flex items-center text-base"
              />
            </Popover>

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
                onClick={() => {
                  setIsMenuVisible(true);
                  setDrawerVisible(true);
                }}
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
