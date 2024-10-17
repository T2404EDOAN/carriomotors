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
import ContactUsFull from "./components/AboutUs/Contactus";
import Warranty from "./components/Warranty";

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
  const location = useLocation();
  const navigate = useNavigate();
  const [bannerImages, setBannerImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateTime, setDateTime] = useState(new Date());
  const [locationInfo, setLocationInfo] = useState({});
  const nodeRef = useRef(null);

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

  // Cuộn về đầu trang mỗi khi thay đổi đường dẫn (URL)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]); // Mỗi khi URL thay đổi, useEffect này sẽ được kích hoạt

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const page =
        location.pathname === "/" ? "home" : location.pathname.slice(1);
      const data = await fetchBannerData(page);
      const bannerImages = data.map((item) => ({
        src: item.image_url,
        alt: item.title,
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

  const isHomePage = location.pathname === "/"; // Kiểm tra xem đây có phải là trang chủ không

  return (
    <div className="app-container" style={{ paddingTop: "70px" }}>
      {/* Hiển thị loading */}
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
      <Header onNavigate={handleRouteChange} />
      {/* Chỉ hiển thị Banner trên trang chủ */}
      {isHomePage && !isLoading && (
        <Banner images={bannerImages} autoSlide={isHomePage} />
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
                <Route path="/warranty" element={<Warranty />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about/company" element={<CompanyPage />} />
                <Route path="/about/careers" element={<Careers />} />
                <Route path="/about/location" element={<Location />} />
                <Route path="/about/contact" element={<ContactUsFull />} />
              </Routes>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </main>
      <Ticker dateTime={dateTime} locationInfo={locationInfo} />
      <Footer />
    </div>
  );
}
export default App;
