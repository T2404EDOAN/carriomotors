const Ticker = ({ dateTime, locationInfo }) => {
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
        return `Lat: ${location.latitude.toFixed(2)}, Lon: ${location.longitude.toFixed(2)}`;
      }
      return "Fetching location...";
    };
  
    return (
      <div style={tickerStyle}>
        <div style={tickerContentStyle}>
          <span>
            {`Date: ${formatDate(dateTime)} | Time: ${formatTime(dateTime)} | Location: ${formatLocation(
              locationInfo
            )}`}
          </span>
        </div>
      </div>
    );
  };
  
  // CSS cho ticker
  const tickerStyle = {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "#333",
    color: "#fff",
    padding: "10px 0",
    textAlign: "center",
    zIndex: 9999,
    overflow: "hidden",
  };
  
  const tickerContentStyle = {
    display: "inline-block",
    whiteSpace: "nowrap",
    animation: "scroll-left 10s linear infinite",
  };
  
  // Định nghĩa keyframe cho hiệu ứng scroll
  const styleSheet = document.styleSheets[0];
  const keyframes = `
    @keyframes scroll-left {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
  `;
  
  styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  
  export default Ticker;
  