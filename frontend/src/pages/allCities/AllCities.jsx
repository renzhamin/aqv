import { AppContext } from "@/App";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import Navigation from "../navigation/NavigationHomeOnly";
import TopTen from "../topTen/TopTen";
import styles from "./AllCities.module.css";

const AirQuality = () => {
  const navigate = useNavigate();
  const { worst, best } = useContext(AppContext);
  const [cityButtonNo, setCityButtonNo] = useState(1);
  const cityButtonToggle = (curCityButtonNo) => {
    setCityButtonNo(curCityButtonNo);
  };

  useState(() => {
    setTimeout(() => window.scrollTo(0, 0), 0);
  }, []);

  return (
    <>
      <Navigation />
      <div>
        <div className={[styles.airQuality, "elevated-2xl"].join(" ")}>
          <p className={[`${styles.tableTitle} mt-20`]}>
            Live ranking of cities based on air quality index
          </p>
          <div className={styles.poluClnToggleButtonBox + " gap-4"}>
            <Button
              className={
                cityButtonNo === 1
                  ? "bg-foreground"
                  : "bg-accent text-foreground hover:text-accent"
              }
              onClick={() => {
                cityButtonToggle(1);
              }}
            >
              Most Polluted Cities
            </Button>
            <Button
              className={
                cityButtonNo === 2
                  ? "bg-foreground"
                  : "bg-accent text-foreground hover:text-accent"
              }
              onClick={() => {
                cityButtonToggle(2);
              }}
            >
              Most Clean Cities
            </Button>
          </div>

          {cityButtonNo == 1 ? (
            <div className="mb-10">
              {/* <p className={styles.tableTitle} id="worstCities">
                        Top 10 polluted cities
                    </p> */}
              <TopTen airQualityData={worst} />
            </div>
          ) : (
            <div className="mb-10">
              {/* <p className={styles.tableTitle} id="bestCities">
                        Top 10 cleanest cities
                    </p> */}
              <TopTen airQualityData={best} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AirQuality;
