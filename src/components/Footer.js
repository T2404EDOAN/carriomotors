import React from "react";
import "../assets/styles/Footer.css";
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import {
  FacebookFilled,PinterestFilled,TikTokFilled,TwitterSquareFilled,YoutubeFilled
} from "@ant-design/icons";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const Footer = () => {
  return (
    <footer className="footer-wrapper">
    <footer className="footer">
      {/* Đường ngang phân cách */}
      <hr className="footer-divider" />
      <div className="footer-content">
        <div className="footer-section">
          <h2 className="footer-logo">Models</h2>
          <ul>
            <li>Mecedes-Benz</li>
            <li>BMW</li>
            <li>Audi</li>
            <li>Porsche</li>
          </ul>
          <p className="newsletter-text">Subscribe to the newsletter</p>
        </div>

        <div className="footer-section">
          <h2 className="footer-logo">Finance sevices</h2>
          <ul>
            <li>Mercedes-Benz Finance Service</li>
            <li>BMW Finance Service</li>
            <li>Audi Finance Service</li>
            <li>Porsche Finance Service</li>
            <li>Carrio Insurance</li>
            <li>Installment Policy</li>
          </ul>
        </div>

        <div className="footer-section">
          <h2 className="footer-logo">Service Intentives & Warranty Manual</h2>
          <ul>
            <li>Mercedes-Benz Service Incentives</li>
            <li>BMW Service Incentives</li>
            <li>Audi Service Incentives</li>
            <li>Porsche Service Incentives</li>
            <li>Warranty Policies of manufacturers</li>
          </ul>
        </div>

        <div className="footer-section">
          <h2 className="footer-logo">Discover Carrio Motors</h2>
          <ul>
            <li>Our Values</li>
            <li>Our System</li>
            <li>Contact us</li>
          </ul>

          {/* Nút chia sẻ trang */}
          <div className="share-page">
            <button className="share-button">
              <span className="share-icon"><ShareIcon /></span> Share Page
            </button>
          </div>

          {/* Kết nối với các mạng xã hội */}
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
            backgroundColor: '#333',  // Màu nền của Select
            color: 'white',           // Màu văn bản bên trong Select
            '& .MuiSelect-select': {
              backgroundColor: '#333', // Màu nền của nội dung Select
              color: 'white',          // Màu văn bản của placeholder
            },
          
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',    // Màu viền khi hover
            },
          
            '& .MuiSelect-icon': {
              color: 'white',         
            },
          }}
        >
          {/* Các MenuItem khác có thể thêm vào đây */}
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
