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

    // Chèn keyframes vào thẻ <style>
    style.appendChild(document.createTextNode(keyframes));

    // Thêm thẻ <style> vào <head> của trang
    document.head.appendChild(style);

    // Cleanup khi component bị unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []); // Chạy effect một lần khi component được mount

  useEffect(() => {
    if (locationInfo.latitude && locationInfo.longitude) {
      // Gọi API Nominatim để lấy tên vị trí chi tiết
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${locationInfo.latitude}&lon=${locationInfo.longitude}&zoom=18&addressdetails=1`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.address) {
            const { road, suburb, city, state, country } = data.address;
            // Ghép các phần của địa chỉ thành chuỗi
            const fullAddress = [
              road, // Đường
              suburb, // Phường hoặc quận
              city, // Thành phố
              state, // Bang hoặc tỉnh
              country, // Quốc gia
            ]
              .filter(Boolean) // Loại bỏ các phần null hoặc undefined
              .join(", "); // Ghép lại bằng dấu phẩy

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

// CSS cho ticker với nền đen và chữ trắng
const tickerStyle = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  backgroundColor: "#191f22", // Nền đen với độ mờ nhẹ
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
