import React, { useState, useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
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
import CompactNavigation from "./components/CompactNavigation";

// API function to fetch banner data based on the page
const fetchBannerData = async (page) => {
  try {
    // Use the page name to fetch banners specific to that page
    const response = await fetch(
      `https://carriomotors.online/api/get_banner.php?page=${page}`
    );
    const data = await response.json();

    // Map the banner data to a format expected by the Banner component
    return data.map((banner) => ({
      src: banner.image_url, // Using image_url from API
      alt: banner.title, // Using title as alt text
    }));
  } catch (error) {
    console.error("Error fetching banner data:", error);
    return []; // Return empty array on error
  }
};

function App() {
  return <AppLayout />;
}

function AppLayout() {
  const location = useLocation(); // To track current route
  const [bannerImages, setBannerImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const nodeRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Get the page name based on the current path
      const page =
        location.pathname === "/" ? "home" : location.pathname.slice(1);

      const data = await fetchBannerData(page); // Fetch banner data for the page
      setBannerImages(data); // Set banner images
      setIsLoading(false);
    };

    fetchData();
  }, [location]);

  return (
    <div className="app-container">
      <Header />
      <CompactNavigation />
      {!isLoading && (
        // Display Banner with the images fetched for the current page
        <Banner images={bannerImages} autoSlide={location.pathname === "/"} />
      )}
      <main className="main-content">
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            classNames="fade"
            timeout={300}
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
              </Routes>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </main>
      <Footer />
    </div>
  );
}

export default App;
