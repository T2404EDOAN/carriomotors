import React, { useState, useEffect, useRef } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Spin } from "antd";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Vehicles from "./pages/Vehicles";
import Services from "./pages/Services";
import FAQ from "./pages/FAQ";
import "./App.css";
import Ticker from "./components/Ticker";
import CompanyPage from "./components/AboutUs/Company";
import { fetchBannerData } from "./apiService";
import Careers from "./components/AboutUs/Careers";
import Location from "./components/AboutUs/Location";
import Finance from "./components/Finace/Finance_main";
import Admin from "./components/Admin";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setInitialLoadDone(true);
    }, 2000);
  }, []);

  if (!initialLoadDone) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 9999,
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return <AppLayout />;
}

function AppLayout() {
  const location = useLocation(); // Để xác định trang hiện tại
  const navigate = useNavigate();
  const [bannerImages, setBannerImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateTime, setDateTime] = useState(new Date());
  const [locationInfo, setLocationInfo] = useState({});
  const nodeRef = useRef(null); // Create a ref

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocationInfo({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      setLocationInfo({
        error: "Geolocation is not supported by this browser.",
      });
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const page =
        location.pathname === "/" ? "home" : location.pathname.slice(1);
      const data = await fetchBannerData(page); // Gọi hàm fetchBannerData từ apiService
      const bannerImages = data.map((item) => ({
        src: item.image_url,
        alt: item.title, // Sử dụng title cho alt text
        title: item.alt,
      }));
      setBannerImages(data);
      setIsLoading(false);
    };

    fetchData();
  }, [location]);

  const handleRouteChange = (path) => {
    setIsLoading(true);
    navigate(path);
  };

  // Kiểm tra nếu trang hiện tại là '/admin'
  const isAdminPage = location.pathname === "/admin";

  return (
    <div className="app-container">
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            zIndex: 9999,
          }}
        >
          <Spin size="large" />
        </div>
      )}
      
      {/* Chỉ hiển thị Header và Banner khi không phải trang admin */}
      {!isAdminPage && <Header onNavigate={handleRouteChange} />}
      {!isAdminPage && !isLoading && (
        <Banner images={bannerImages} autoSlide={location.pathname === "/"} />
      )}

      <main className="main-content">
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            classNames="fade"
            timeout={600}
            nodeRef={nodeRef}
          >
            <div ref={nodeRef}>
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/services" element={<Services />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about/company" element={<CompanyPage />} />
                <Route path="/about/careers" element={<Careers />} />
                <Route path="/about/location" element={<Location />} />
              </Routes>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </main>

      {/* Chỉ hiển thị Footer khi không phải trang admin */}
      {!isAdminPage && <Ticker dateTime={dateTime} locationInfo={locationInfo} />}
      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;
