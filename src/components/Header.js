import React, { useState } from "react";
import { ChevronDown, Search, User } from "lucide-react";
import "../assets/styles/Header.css";

const Header = () => {
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);

  const toggleAboutUs = () => {
    setIsAboutUsOpen(!isAboutUsOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <span>
            <img src="/Logo_remote.png" alt="Logo" className="header-logo" />
          </span>
          <nav className="ul">
            <ul className="header-nav">
              <li>
                <span className="other-link">Models</span>
              </li>
              <li>
                <span className="other-link">Services</span>
              </li>
              <li>
                <span className="other-link">Shopping</span>
              </li>
              <li>
                <span className="other-link">FAQ</span>
              </li>
              <li className="about-us-dropdown">
                <span onClick={toggleAboutUs} className="other-link">
                  About Us
                </span>
                {isAboutUsOpen && (
                  <ul className="dropdown-menu">
                    <li>
                      <span className="other-link">Our Company</span>
                    </li>
                    <li>
                      <span className="other-link">Careers</span>
                    </li>
                    <li>
                      <span className="other-link">Contact Us</span>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>
        <div className="header-right">
          <span className="other-link">Choose your local BMW Center</span>
          <ChevronDown size={20} className="other-icon" />
          <Search size={20} className="other-icon" />
          <User size={20} className="other-icon" />
        </div>
      </div>
      <div className="header-divider"></div>
    </header>
  );
};

export default Header;
