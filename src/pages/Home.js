import React, { useState, useEffect, Suspense } from "react";
import { Skeleton } from "antd";
import CarCategory from "../components/CarCategory";
import Trendvehicls from "../components/Trendvehicls";
import TeslaBanner from "../components/TeslaBanner";

const LazyCarCategory = React.lazy(() => import("../components/CarCategory"));
const LazyTrendvehicls = React.lazy(() => import("../components/Trendvehicls"));
const LazyTeslaBanner = React.lazy(() => import("../components/TeslaBanner"));

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      try {
        // Replace this with your actual API calls
        await Promise.all([
          fetch("API_URL_FOR_CAR_CATEGORY"),
          fetch("API_URL_FOR_TREND_VEHICLES"),
          fetch("API_URL_FOR_TESLA_BANNER"),
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const SkeletonLoader = () => (
    <>
      <Skeleton active paragraph={{ rows: 4 }} />
      <Skeleton active paragraph={{ rows: 4 }} />
      <Skeleton active paragraph={{ rows: 2 }} />
    </>
  );

  return (
    <div className="home-page">
      <Suspense fallback={<SkeletonLoader />}>
        {loading ? (
          <SkeletonLoader />
        ) : (
          <>
            <LazyCarCategory />
            <LazyTrendvehicls />
            <LazyTeslaBanner />
          </>
        )}
      </Suspense>
    </div>
  );
};

export default Home;
