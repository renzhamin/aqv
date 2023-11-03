import React from "react";
import Navigation from "../navigation/Navigation";
import MapsComponent from "../maps/MapsComponent";
import AirQuality from "../airQuality/AirQuality";
import Footer from "../footer/Footer";
import { SearchBar } from "@/components/search";

const HomePage = () => {
  return (
    <div>
      <Navigation />
      <MapsComponent />
      <SearchBar />
      <AirQuality />
      <Footer />
    </div>
  );
};

export default HomePage;
