import React from "react";
import CarCategory from "../components/CarCategory";
import Trendvehicls from "../components/Trendvehicls";
import TeslaBanner from "../components/TeslaBanner";

const Home = () => {
  return (
    <div className="home-page">
      <CarCategory />
      <Trendvehicls />
      <TeslaBanner />
    </div>
  );
};

export default Home;
