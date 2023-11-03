import React, { useContext, useEffect, useState } from "react";
import styles from "./AirQuality.module.css";
import TopTen from "../topTen/TopTen";
import { AppContext } from "@/App";

const AirQuality = () => {
  const { worst, best } = useContext(AppContext);

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
