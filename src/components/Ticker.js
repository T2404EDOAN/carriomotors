import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalendarAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Ticker = ({ dateTime, locationInfo }) => {
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

    // Chèn keyframes vào thẻ <style>
    style.appendChild(document.createTextNode(keyframes));

    // Thêm thẻ <style> vào <head> của trang
    document.head.appendChild(style);

    // Cleanup khi component bị unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []); // Chạy effect một lần khi component được mount

  const formatTime = (date) => {
    return date.toLocaleTimeString();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  const formatLocation = (location) => {
    if (location.error) {
      return location.error;
    }
    if (location.latitude && location.longitude) {
      return `Vĩ độ: ${location.latitude.toFixed(2)}, Kinh độ: ${location.longitude.toFixed(2)}`;
    }
    return "Đang lấy vị trí...";
  };

  return (
    <div style={tickerStyle}>
      <div style={tickerContentStyle}>
        <span style={iconTextStyle}>
          <FontAwesomeIcon icon={faCalendarAlt} style={iconStyle} />
          {`Ngày: ${formatDate(dateTime)}`}
        </span>
        <span style={iconTextStyle}>
          <FontAwesomeIcon icon={faClock} style={iconStyle} />
          {`Giờ: ${formatTime(dateTime)}`}
        </span>
        <span style={iconTextStyle}>
          <FontAwesomeIcon icon={faMapMarkerAlt} style={iconStyle} />
          {`Vị trí: ${formatLocation(locationInfo)}`}
        </span>
      </div>
    </div>
  );
};

// CSS cho ticker với nền đen và chữ trắng
const tickerStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.85)", // Nền đen với độ mờ nhẹ
  color: "#fff", // Chữ trắng
  padding: "10px 0",
  textAlign: "center",
  zIndex: 9999,
  fontSize: "18px",
  fontWeight: "bold",
  fontFamily: "'Arial', sans-serif",
};

const tickerContentStyle = {
  display: "flex", // Sử dụng flexbox để căn chỉnh các biểu tượng và văn bản
  justifyContent: "center",
  alignItems: "center",
  whiteSpace: "nowrap",
  animation: "scroll-left 15s linear infinite", // Cuộn ticker với tốc độ vừa phải
  gap: "30px", // Khoảng cách giữa các phần tử
};

const iconTextStyle = {
  display: "flex",
  alignItems: "center",
};

const iconStyle = {
  marginRight: "8px", // Khoảng cách giữa biểu tượng và văn bản
  fontSize: "20px", // Kích thước biểu tượng
  color: "#fff", // Màu biểu tượng trắng
};

export default Ticker;
