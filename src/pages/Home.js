import React, { useState, useEffect, Suspense } from "react";
import { Skeleton } from "antd";
const LazyCarCategory = React.lazy(() => import("../components/CarCategory"));
const LazyTrendvehicls = React.lazy(() => import("../components/Trendvehicls"));
const LazyTeslaBanner = React.lazy(() => import("../components/TeslaBanner"));

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi API
        const [carCategory, trendVehicles, teslaBanner] = await Promise.all([
          fetch("API_URL_FOR_CAR_CATEGORY"),
          fetch("API_URL_FOR_TREND_VEHICLES"),
          fetch("API_URL_FOR_TESLA_BANNER"),
        ]);

        // Xử lý nếu cần
        // const dataCarCategory = await carCategory.json();
        // const dataTrendVehicles = await trendVehicles.json();
        // const dataTeslaBanner = await teslaBanner.json();

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
