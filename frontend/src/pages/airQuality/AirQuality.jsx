import React, { useEffect, useState } from "react";
import styles from "./AirQuality.module.css";
import TopTen from "../topTen/TopTen";
import { get_cities_by_aqi } from "@/fetch/rankings";

const AirQuality = () => {
  const [worst, setWorst] = useState([]);
  const [best, setBest] = useState([]);
  useEffect(() => {
    get_cities_by_aqi(false).then((data) => {
      setWorst(data.slice(0, 10));
    });
    get_cities_by_aqi(true).then((data) => {
      setBest(data.slice(0, 10));
    });
  }, []);

  return (
    <div>
      <div className={[styles.airQuality, "elevated-2xl"].join(" ")}>
        <p className={styles.title}>2022 AQI COUNTRY RANKING</p>

        <p className={styles.tableTitle}>Top 10 polluted cities</p>
        <TopTen airQualityData={worst} />

        <p className={[`${styles.tableTitle} mt-20`]}>Top 10 cleanest cities</p>
        <TopTen airQualityData={best} />
      </div>
    </div>
  );
};

export default AirQuality;
