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
import Shopping from "./pages/Shopping";
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";
import "./App.css";
import Ticker from "./components/Ticker";
import CompanyPage from "./components/AboutUs/Company";
import Contactus from "./components/AboutUs/Contactus";

const fetchBannerData = async (page) => {
  try {
    const response = await fetch(
      `https://carriomotors.online/api/get_banner.php?page=${page}`
    );
    const data = await response.json();
    return data.map((banner) => ({
      src: banner.image_url,
      alt: banner.title,
    }));
  } catch (error) {
    console.error("Error fetching banner data:", error);
    return [];
  }
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  useEffect(() => {
    // Simulate initial app loading
    setTimeout(() => {
      setIsLoading(false);
      setInitialLoadDone(true);
    }, 2000); // Adjust this time as needed
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
  const nodeRef = useRef(null);

  const [dateTime, setDateTime] = useState(new Date());
  const [locationInfo, setLocationInfo] = useState({});

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
      const data = await fetchBannerData(page);
      setBannerImages(data);
      setIsLoading(false);
    };

    fetchData();
  }, [location]);

  const handleRouteChange = (path) => {
    setIsLoading(true);
    navigate(path);
  };

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
      <Header onNavigate={handleRouteChange} />
      {!isLoading && (
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
                <Route path="/services" element={<Services />} />
                <Route path="/shopping" element={<Shopping />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/about/company" element={<CompanyPage />} />
                <Route path="/about/contact" element={<Contactus />} />
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
