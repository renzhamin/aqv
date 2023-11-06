import React, { useContext, useEffect, useState } from "react";
import styles from "./AirQuality.module.css";
import TopTen from "../topTen/TopTen";
import { AppContext } from "@/App";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AirQuality = () => {
  const navigate = useNavigate();
  const { worst, best } = useContext(AppContext);
  const [cityButtonNo, setCityButtonNo] = useState(1);
  const cityButtonToggle = (curCityButtonNo) => {
    setCityButtonNo(curCityButtonNo);
  }

  return (
    <div>
      <div className={[styles.airQuality, "elevated-2xl"].join(" ")}>
        <p className={[`${styles.tableTitle} mt-20`]}>Live most polluted major city ranking</p>
        <div className={styles.poluClnToggleButtonBox}>
          <Button 
            className={cityButtonNo == 1 ? "" : styles.cityButtonNotClicked}
            onClick={() => {cityButtonToggle(1)}}>
            Most Polluted Cities
          </Button>
          <Button 
            className={cityButtonNo == 2 ? "" : styles.cityButtonNotClicked}
            onClick={() => {cityButtonToggle(2)}}>
            Most Cleanest Cities
          </Button>
        </div>
        {cityButtonNo == 1 ?
          (
            <div className="mb-10">
              <p className={styles.tableTitle} id="worstCities">
                Top 10 polluted cities
              </p>
              <TopTen airQualityData={worst.slice(0, 10)} />
            </div>
            
          ):
          (
            <div className="mb-10">
              <p className={styles.tableTitle} id="bestCities">
                Top 10 cleanest cities
              </p>
              <TopTen airQualityData={best.slice(0, 10)} />
            </div>
          
          )
        }

        <Button 
          onClick={() => navigate(`/cities/all`)}
        >
          View All Cities
        </Button>
        {/* <p className={styles.tableTitle} id="worstCities">
          Top 10 polluted cities
        </p>
        <TopTen airQualityData={worst.slice(0, 10)} />

        <p className={[`${styles.tableTitle} mt-20`]} id="bestCities">
          Top 10 cleanest cities
        </p>
        <TopTen airQualityData={best.slice(0, 10)} /> */}
        
      </div>
    </div>
  );
};

export default AirQuality;
