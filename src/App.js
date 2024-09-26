import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Banner from "./components/Banner";
import CarCategory from "./components/CarCategory";
import Models from "./pages/Models";
import Services from "./pages/Services";
import Shopping from "./pages/Shopping";
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";
import "./App.css";
import Trendvehicls from "./components/Trendvehicls";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");

  useEffect(() => {
    if (location !== displayLocation) setTransitionStage("fadeOut");
  }, [location, displayLocation]);

  return (
    <div>
      <Header />
      <div
        className={`content ${transitionStage}`}
        onAnimationEnd={() => {
          if (transitionStage === "fadeOut") {
            setTransitionStage("fadeIn");
            setDisplayLocation(location);
          }
        }}
      >
        <Routes location={displayLocation}>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <main>
                  <CarCategory />
                  <Trendvehicls />
                </main>
              </>
            }
          />
          <Route path="/models" element={<Models />} />
          <Route path="/services" element={<Services />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
