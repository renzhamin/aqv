import React, { lazy, Suspense } from "react";
const Navigation = lazy(() => import("../navigation/Navigation"));
const MapsComponent = lazy(() => import("../maps/MapsComponent"));
const AirQuality = lazy(() => import("../airQuality/AirQuality"));
const Footer = lazy(() => import("../footer/Footer"));
const SearchBar = lazy(() => import("@/components/search"));

const HomePage = () => {
  return (
    <div>
      <Suspense>
        <Navigation />
      </Suspense>
      <Suspense>
        <MapsComponent />
      </Suspense>
      <Suspense>
        <SearchBar />
      </Suspense>
      <Suspense>
        <AirQuality />
      </Suspense>
      <Suspense>
        <Footer />
      </Suspense>
    </div>
  );
};

export default HomePage;
