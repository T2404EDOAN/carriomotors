import React, { useEffect, useState } from "react";
import "../assets/styles/Trendvehicls.css";

const Trendvehicls = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("https://api.example.com/vehicles");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setVehicles(data);
        setError(false);
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
        setVehicles([]);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <p className="loading-message">Đang tải dữ liệu...</p>;
    }

    if (error || vehicles.length === 0) {
      return (
        <div
          className="error-message"
          style={{
            minHeight: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="chrome-dino-game"
            style={{
              width: "100%",
              height: "150px",
              position: "relative",
              overflow: "hidden",
              backgroundColor: "#f7f7f7",
              marginBottom: "20px",
            }}
          >
            <div
              className="dino"
              style={{
                width: "40px",
                height: "43px",
                backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAASxJREFUWEftmOERgjAMhT+uwBE6giO4AaygbqAb6AiO4AiO4Ahs0KYnXK+FtJScPfkphPa+vLwQiKE369C7HyMwdUKjg6ODqQRSz0cHR6AtAlsRWXnHT+2kqkf7rIj47i0iwZTU9K8iMvPyOpCq6mMfNs6DCLGGBJRdR6mvpKA93ImIPeuNnGQBbaB5e1xk54fALBuQRIY1jsS5vRQkBg4BqXErm6r6igUMBbnGbWwi8oiBvII0JHA6B6CqLkRkaZMTxICbf7PQHNwQ79J38JWH5gQexXHlTQlscToHcAkEYNxyO1AnqBR9B9YhIA+gBJS8kHJp1h1UVQ8i4lIjywrsAhgDaeuOXQFtAz2J9f/BpoEuH9SauxZoAqHqpQE2/cHSOlQryP0+OvgDEwh5KSt3dmEAAAAASUVORK5CYII=")`,
                backgroundSize: "40px 43px",
                position: "absolute",
                bottom: "0",
                left: "20px",
              }}
            ></div>
            <div
              className="cactus"
              style={{
                width: "17px",
                height: "35px",
                backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAjCAYAAABCDUasAAAAAXNSR0IArs4c6QAAAMlJREFUSEvtlesNwjAMhL+uwAiMACPACIzACIzACI1ucWRFaeMYwUU8f9Xk/PycuCU8bMnDPJiEJC1JNwOZJa0l3b3gjYIVclJS75BfUgIEWZDR4hpACKZC3EqaFAJoJR0kLYsz/jOFALaFsACBzL0hIZhISEi4qGDSJEHJdkpaEYpX7mPXeQLXTVmNXQj+mfHPP9cUCkGoWjqIR5OmESK0a2/C0rlKIDfwSAXZPOJxe7hOgw6VPiZA1BQz0hLI7Oar2A5Bj8R6DG89AQ9qmCWVnXQQAAAAAElFTkSuQmCC")`,
                backgroundSize: "17px 35px",
                position: "absolute",
                bottom: "0",
                right: "-20px",
                animation: "moveCactus 1.5s infinite linear",
              }}
            ></div>
          </div>
          <h2>Oops! Có vẻ như có lỗi xảy ra</h2>
          <p>
            {error
              ? "Không thể kết nối đến máy chủ."
              : "Không tìm thấy dữ liệu xe."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="reload-button"
            style={{ marginTop: "20px" }}
          >
            Thử lại
          </button>
        </div>
      );
    }

    return vehicles.map((vehicle) => (
      <div className="vehicle-card" key={vehicle.id}>
        <img
          src={vehicle.image || "https://via.placeholder.com/150"}
          alt={`${vehicle.model}`}
          className="vehicle-image"
        />
        <div className="vehicle-info">
          <h3>{`${vehicle.year} ${vehicle.model}`}</h3>
          <p>{`${vehicle.mileage} Miles - #${vehicle.id}`}</p>
          <p>{`Seller: ${vehicle.seller}`}</p>
          <div className="price-and-bid">
            <p className="vehicle-price">{`Price: $${vehicle.price}`}</p>
            <button className="bid-button">Place Bid</button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="trend-vehicles-container-tong">
      <div className="trend-vehicles-container">{renderContent()}</div>
    </div>
  );
};

export default Trendvehicls;
