import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import { User } from "lucide-react";
import "../assets/styles/CompactNavigation.css";

const CompactNavigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/models", label: "Vehicles" },
    { path: "/services", label: "Services" },
    { path: "/shopping", label: "Finance" },
    { path: "/about", label: "About us" },
  ];

  return (
    <nav className={`compact-nav ${isVisible ? "visible" : ""}`}>
      <div className="compact-nav-container">
        <Link to="/" className="compact-logo">
          <img src="/logo-small.png" alt="Logo" />
        </Link>
        <ul className="compact-menu">
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={location.pathname === item.path ? "active" : ""}
            >
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <div className="compact-nav-actions">
          <SearchOutlined className="compact-icon" />
          <User size={20} className="compact-icon" />
        </div>
      </div>
    </nav>
  );
};

export default CompactNavigation;
