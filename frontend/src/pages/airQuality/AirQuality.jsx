import React, { useContext, useEffect, useState } from "react";
import styles from "./AirQuality.module.css";
import TopTen from "../topTen/TopTen";
import { AppContext } from "@/App";

const AirQuality = () => {
  const { worst, best } = useContext(AppContext);

  return (
    <div>
      <div className={[styles.airQuality, "elevated-2xl"].join(" ")}>
        <p className={styles.tableTitle} id="worstCities">
          Top 10 polluted cities
        </p>
        <TopTen airQualityData={worst.slice(0, 10)} />

        <p className={[`${styles.tableTitle} mt-20`]} id="bestCities">
          Top 10 cleanest cities
        </p>
        <TopTen airQualityData={best.slice(0, 10)} />
      </div>
    </div>
  );
};

export default AirQuality;
