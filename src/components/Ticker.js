import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCalendarAlt,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

const Ticker = ({ dateTime, locationInfo }) => {
  const [locationName, setLocationName] = React.useState("Đang lấy vị trí...");

  useEffect(() => {
    // Tạo thẻ <style> mới và thêm vào <head>
    const style = document.createElement("style");
    style.type = "text/css";

    // Định nghĩa keyframes
    const keyframes = `
      @keyframes scroll-left {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
    `;

    style.appendChild(document.createTextNode(keyframes));

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (locationInfo.latitude && locationInfo.longitude) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${locationInfo.latitude}&lon=${locationInfo.longitude}&zoom=18&addressdetails=1`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.address) {
            const { road, suburb, city, state, country } = data.address;
            // Ghép các phần của địa chỉ thành chuỗi
            const fullAddress = [
              road, 
              suburb, 
              city, 
              state, 
              country, 
            ]
              .filter(Boolean) 
              .join(", "); 

            setLocationName(fullAddress || "Không xác định");
          } else {
            setLocationName("Không xác định");
          }
        })
        .catch((error) => {
          setLocationName("Lỗi khi lấy vị trí");
        });
    }
  }, [locationInfo]);

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  return (
    <div style={tickerStyle}>
      <div style={tickerContentStyle}>
        <span style={iconTextStyle}>
          <FontAwesomeIcon icon={faCalendarAlt} style={iconStyle} />
          {`Date: ${formatDate(dateTime)}`}
        </span>
        <span style={iconTextStyle}>
          <FontAwesomeIcon icon={faClock} style={iconStyle} />
          {`Time: ${formatTime(dateTime)}`}
        </span>
        <span style={iconTextStyle}>
          <FontAwesomeIcon icon={faMapMarkerAlt} style={iconStyle} />
          {`Location: ${locationName}`}
        </span>
      </div>
    </div>
  );
};


const tickerStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  backgroundColor: "#191f22",
  color: "#fff", 
  padding: "10px 0",
  textAlign: "center",
  zIndex: 9999,
  fontSize: "18px",
  fontWeight: "bold",
};

const tickerContentStyle = {
  display: "flex", 
  justifyContent: "center",
  alignItems: "center",
  whiteSpace: "nowrap",
  animation: "scroll-left 15s linear infinite", 
  gap: "30px", 
};

const iconTextStyle = {
  display: "flex",
  alignItems: "center",
};

const iconStyle = {
  marginRight: "8px", 
  fontSize: "20px", 
  color: "#fff", 
};

export default Ticker;
