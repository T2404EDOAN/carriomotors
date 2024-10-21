import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import axios from 'axios';

import {
  Menu,
  Input,
  Button,
  Drawer,
  Modal,
  Popover,
  Spin,
  Typography,
  AutoComplete,
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
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false); 
  const [realtimeVisitors, setRealtimeVisitors] = useState(1);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [hoveredSubmenu, setHoveredSubmenu] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [searchOptions, setSearchOptions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Sử dụng useLocation để lấy đường dẫn hiện tại
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeUsers, setActiveUsers] = useState(0);
 
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchRealtimeVisitors = async () => {
    try {
      const response = await axios.post(
        "https://analyticsdata.googleapis.com/v1beta/properties/462685637:runRealtimeReport", 
        {
          metrics: [{ name: "activeUsers" }]
        },
        {
          headers: {
            Authorization: `Bearer ya29.a0AcM612xJdv7ZGgStEHKg1NtO6B0hwSvNf5F14iPntXvbfxiHMUQT_8WBOzlmZ4sPyQgp4bh2EJ6oPa24RiV0ud2jaoxBA-_tMDGi39bC-ZTJsvQ5cxiKELKsYXczMKF33UVG21v-aLgoGPpqWoQpx9ialn-WkDSFgHgUSikWaCgYKAaYSARASFQHGX2MiCZpVzrCkAgfaCabVq19dpA0175`, // Access Token từ OAuth
          },
        }
      );
      console.log(response.data); // Xem phản hồi API trong console
      const activeUsers = response.data.rows[0].metricValues[0].value; 
      setRealtimeVisitors(activeUsers);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu người dùng thời gian thực", error);
    }
  };
  

  
  useEffect(() => {
    fetchRealtimeVisitors();

    const intervalId = setInterval(fetchRealtimeVisitors, 60000);
    return () => clearInterval(intervalId); 
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

  const handleLocationClick = () => {
    getLocation();
    setIsLocationModalVisible(true); 
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
        { key: "careers", label: "Contact Dealer", link: "/about/careers" },
        { key: "contact", label: "Contact Us", link: "/about/contact" },
        { key: "location", label: "Location", link: "/about/location" },
      ],
    },
  ];

  const flattenMenuItems = (items) => {
    return items.reduce((acc, item) => {
      if (item.children) {
        return [...acc, ...flattenMenuItems(item.children)];
      }
      return [...acc, item];
    }, []);
  };

  const allMenuItems = flattenMenuItems(menuItems);

  const handleSearch = (value) => {
    const filteredOptions = allMenuItems
      .filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      )
      .map((item) => ({
        value: item.link,
        label: item.label,
      }));
    setSearchOptions(filteredOptions);
  };

  const onSelect = (value, option) => {
    navigate(value);
    setSearchValue(option.label);  
  };

  const handleSearchChange = (value) => {
    setSearchValue(value);
    if (value.trim() !== '') {
      handleSearch(value);
      setShowSuggestions(true);
    } else {
      setSearchOptions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const selectedOption = searchOptions.find(option => option.label.toLowerCase() === searchValue.toLowerCase());
    if (selectedOption) {
      navigate(selectedOption.value);
    }
  };

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
              <Menu.Item
                key={child.key}
                className={`menu-item-fade ${
                  location.pathname.includes(child.link) ? "active" : ""
                }`}
                style={{
                  color: location.pathname.includes(child.link)
                    ? "blue"
                    : "black",
                  fontWeight: location.pathname.includes(child.link)
                    ? "bold"
                    : "normal",
                }}
              >
                <Link to={child.link}>{child.label}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item
            key={item.key}
            className={`menu-item-fade ${
              location.pathname === item.link ? "active" : ""
            }`}
            style={{
              color: location.pathname === item.link ? "blue" : "black",
              fontWeight: location.pathname === item.link ? "bold" : "normal",
            }}
          >
            <Link to={item.link}>{item.label}</Link>
          </Menu.Item>
        )
      )}
  
      {!isLargeScreen && (
        <>
          <Menu.Item key="location" className="menu-item-fade">
            <Button
              type="text"
              icon={<EnvironmentOutlined />}
              onClick={handleLocationClick}
            >
              Location
            </Button>
          </Menu.Item>
          <Menu.Item key="search" className="menu-item-fade">
            <AutoComplete
              value={searchValue}
              options={showSuggestions ? searchOptions : []}
              onSelect={onSelect}
              onSearch={handleSearch}
              onChange={handleSearchChange}
              onFocus={() => setSearchExpanded(true)}
              onBlur={() => {
                setSearchExpanded(false);
                setShowSuggestions(false);
              }}
              style={{ width: "100%" }}
            >
              <Input
                placeholder="Search..."
                prefix={<SearchOutlined />}
                className="rounded-full text-base"
                onPressEnter={handleSearchSubmit}
              />
            </AutoComplete>
          </Menu.Item>
          <Menu.Item key="login" className="menu-item-fade">
            <Button
              type="text"
              icon={<UserOutlined />}
              onClick={() => setIsSignInPopupVisible(true)}
            >
              Login
            </Button>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
  

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-sm">
      <div className="w-full px-4">
        <div className="flex items-center h-16 px-8">
          <div className="flex-none mr-8 flex items-center">
            <Link to="/">
              <img src="" alt="Logo" className="h-13 md:h-14" />
            </Link>
            <div className="flex items-center ml-4">
              {/* <PersonIcon style={{ fontSize: "15px", marginRight: "5px" }} /> */}
        
              <span>{realtimeVisitors}</span>
            </div>
          </div>

          <div className="flex-grow flex justify-center">
            {isLargeScreen && renderMenu()}
          </div>

          <div className="flex-none flex items-center space-x-4">
            {isLargeScreen && (
              <>
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
                    className="flex items-center text-base"
                  />
                </Popover>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    searchExpanded ? "w-64" : "w-10"
                  } block sm:block`}
                >
                  <AutoComplete
  value={searchValue}
  options={showSuggestions ? searchOptions : []}
  onSelect={onSelect}
  onSearch={handleSearch}
  onChange={handleSearchChange}
  onFocus={() => setSearchExpanded(true)}
  onBlur={() => {
    setSearchExpanded(false);
    setShowSuggestions(false);
  }}
  style={{ width: '100%' }}
>
  <Input
    placeholder="Search..."
    prefix={<SearchOutlined />}
    className="rounded-full text-base"
    onPressEnter={handleSearchSubmit}
  />
</AutoComplete>
                </div>

                <Button
                  type="text"
                  icon={<UserOutlined />}
                  className="text-base flex"
                  onClick={() => setIsSignInPopupVisible(true)}
                />
              </>
            )}

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

      {/* Location Modal */}
      <Modal
        visible={isLocationModalVisible}
        onCancel={() => setIsLocationModalVisible(false)}
        footer={null}
        title="Your Location"
      >
        <LocationContent
          location={currentLocation}
          error={locationError}
          isLoading={isLoadingLocation}
        />
      </Modal>

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
