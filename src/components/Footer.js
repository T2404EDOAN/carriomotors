import React from "react";
import "../assets/styles/Footer.css";
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import {
  FacebookFilled, PinterestFilled, TikTokFilled, TwitterSquareFilled, YoutubeFilled
} from "@ant-design/icons";
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Footer = () => {
  const navigate = useNavigate();

  const handleBrandClick = (brandId) => {
    navigate(`/vehicles`, { state: { brandId } });
  };
  const handleFinanceClick = (brandKey) => {
    navigate(`/finance`, { state: { activeKey: brandKey } });
  };
  const handleServiceIncentivesClick = (brandKey) => {
    navigate(`/services`, { state: { activeKey: brandKey } });
  };
  const handleWarrantyClick = () => {
    navigate(`/warranty`); 
  };
  const handleNavigationClick = (path) => {
    navigate(path); // Generic navigation handler
  };
  return (
    <footer className="footer-wrapper">
      <footer className="footer">
        <hr className="footer-divider" />
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section">
            <h2 className="footer-logo">Brand</h2>
            <ul>
              <li onClick={() => handleBrandClick(1)}>Mercedes-Benz</li> {/* Assume 1 is Mercedes' brandId */}
              <li onClick={() => handleBrandClick(2)}>BMW</li> {/* Assume 2 is BMW's brandId */}
              <li onClick={() => handleBrandClick(3)}>Audi</li> {/* Assume 3 is Audi's brandId */}
              <li onClick={() => handleBrandClick(4)}>Porsche</li> {/* Assume 4 is Porsche's brandId */}
            </ul>
          </div>

          {/* Finance Services Section */}
          <div className="footer-section">
            <h2 className="footer-logo">Finance Services</h2>
            <ul>
              <li onClick={() => handleFinanceClick("1")}>Mercedes-Benz Finance Service</li>
              <li onClick={() => handleFinanceClick("2")}>BMW Finance Service</li>
              <li onClick={() => handleFinanceClick("3")}>Audi Finance Service</li>
              <li onClick={() => handleFinanceClick("4")}>Porsche Finance Service</li>
            </ul>
          </div>

          {/* Service Incentives Section */}
          <div className="footer-section">
            <h2 className="footer-logo">Service Incentives & Warranty Manual</h2>
            <ul>
          <li onClick={() => handleServiceIncentivesClick("1")}>Mercedes-Benz Service Incentives</li>
          <li onClick={() => handleServiceIncentivesClick("2")}>BMW Service Incentives</li>
          <li onClick={() => handleServiceIncentivesClick("3")}>Audi Service Incentives</li>
          <li onClick={() => handleServiceIncentivesClick("4")}>Porsche Service Incentives</li>
          <li onClick={handleWarrantyClick}>Warranty Policies of manufacturers</li> {/* Navigate to warranty */}        </ul>
          </div>

          {/* Discover Carrio Motors Section */}
          <div className="footer-section">
            <h2 className="footer-logo">Discover Carrio Motors</h2>
            <ul>
            <li onClick={() => handleNavigationClick("/about/company")}>Our Values</li> {/* Navigate to Our Values */}
          <li onClick={() => handleNavigationClick("/about/location")}>Our System</li> {/* Navigate to Our System */}
          <li onClick={() => handleNavigationClick("/about/contact")}>Contact us</li> {/* Navigate to Contact Us */}
            </ul>

            {/* Share Page Button */}
            <div className="share-page">
              <button className="share-button">
                <span className="share-icon"><ShareIcon /></span> Share Page
              </button>
            </div>

            {/* Social Media Icons */}
            <div className="connect-section">
              <p>Connect with Porsche</p>
              <div className="social-icons">
                <a href="#" aria-label="Facebook"><FacebookIcon /></a>
                <a href="#" aria-label="YouTube"><YoutubeFilled /></a>
                <a href="#" aria-label="X"><TwitterSquareFilled /></a>
                <a href="#" aria-label="Pinterest"><TikTokFilled /></a>
                <a href="#" aria-label="Instagram"><PinterestFilled /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottomm">
            <div className="footer-region">
              <label className="Change-country">Change country/region:</label>

              <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                <Select
                  multiple
                  displayEmpty
                  input={<OutlinedInput />}
                  renderValue={() => (
                    <span style={{ color: 'white', fontStyle: 'normal' }}>Select a region</span>
                  )}
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    backgroundColor: '#333',
                    color: 'white',
                    '& .MuiSelect-select': {
                      backgroundColor: '#333',
                      color: 'white',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'white',
                    },
                    '& .MuiSelect-icon': {
                      color: 'white',
                    },
                  }}
                >
                  {/* MenuItems can be added here */}
                </Select>
              </FormControl>

              <hr className="footer-divider1" />
            </div>

            <div className="footer-legal">
              <p>&copy; 2024 Carrio Motors</p>
              <div className="footer-links">
                <a href="#">Legal Notice</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Cookie Policy</a>
                <a href="#">Open Source Software Notice</a>
                <a href="#">Whistleblower System</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </footer>
  );
};

export default Footer;
