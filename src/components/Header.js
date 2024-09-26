import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Search, User } from "lucide-react";
import "../assets/styles/Header.css";
import * as icons from "@ant-design/icons";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const Header = () => {
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);
  const { EnvironmentOutlined } = icons;
  const toggleAboutUs = () => {
    setIsAboutUsOpen(!isAboutUsOpen);
  };
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="header-logo" />
          </Link>
        </div>
        <div className="header-center">
          <nav className="ul">
            <ul className="header-nav">
              <li>
                <Link to="/models" className="other-link">
                  Models
                </Link>
              </li>
              <li>
                <Link to="/services" className="other-link">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/shopping" className="other-link">
                  Shopping
                </Link>
              </li>
              <li>
                <Link to="/faq" className="other-link">
                  FAQ
                </Link>
              </li>
              <li className="about-us-dropdown">
                <span onClick={toggleAboutUs} className="other-link">
                  About Us
                </span>
                {/* {isAboutUsOpen && (
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/about/company" className="other-link">
                        Our Company
                      </Link>
                    </li>
                    <li>
                      <Link to="/about/careers" className="other-link">
                        Careers
                      </Link>
                    </li>
                    <li>
                      <Link to="/about/contact" className="other-link">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                )} */}
              </li>
            </ul>
          </nav>
        </div>
        <div className="header-right">
          <span className="other-link">
            <EnvironmentOutlined />
            Store location
          </span>
          <div
            className={`search-container ${expanded ? "expanded" : ""}`}
            onClick={toggleExpand}
          >
            <Input
              placeholder="Seacr..."
              suffix={<SearchOutlined />}
              style={{
                width: expanded ? "300px" : "50px",
                transition: "width 0.3s ease",
              }} // Kích thước thay đổi
            />
          </div>
          <User size={20} className="other-icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;
