import React, { useEffect, useState } from "react";
import styles from "./CityDescription.module.css";
import NavigationSub from "../navigation/NavigationSub";
import { get_city_info, get_country_info } from "@/fetch/rankings";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "react-router-dom";
import { colorIndex } from "@/helpers/colorIndex";
import GroupedBarChart from "@/components/barchart/GroupedBarChart";

import SearchBar from '../search/search'
import Loading from "../loading/Loading";
import Footer from "../footer/Footer";

const CityDescription = () => {
  const [loading, setLoading] = React.useState(true);
  const [city, setCity] = React.useState(null);
  const [chartdata_aq, setAQ] = useState([]);
  const [chartdata_sc, setSC] = useState([]);
  const { cityname } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls the page to the top on route change
    get_city_info(cityname).then((data) => {
      setCity(data);
      let tmp = [
        {
          cat: "",
          aqi: data.data[0].aqi,
          pm25: data.data[0].pm25,
          pm10: data.data[0].pm10,
          o3: data.data[0].o3,
        },
      ];
      setAQ(tmp);

      tmp = [
        {
          cat: "Socio Economic Status",
          population: data.population,
          gdp: data.gdp,
          gdpPerCapita: data.gdpPerCapita,
        },
      ];

      setSC(tmp);
      setLoading(false);
    });
  }, []);

  // console.log(city);

  if (loading) {
    return(
      <Loading />
    );
  }

  return (
    <div className={styles.cityDescription}>
      <NavigationSub/>
      <h2 className={styles.topSpace}></h2>
      <div className={styles.topBox}>
        <div className={styles.titleBox}>
          <h2>Air quality in {city?.city_name}</h2>
          <p>
            Air quality index (AQI) and PM2.5 air pollution in {city?.city_name}
          </p>
        </div>
        <div className={styles.aqiColorBox}>
          <div className={colorIndex(city?.data[0].aqi) + " p-4 rounded"}>
            <p> US AQI</p>
            <h2>{city?.data[0].aqi}</h2>
          </div>
          <div className={styles.aqiTextBox}>
            <p>Live AQI INDEX</p>
            {/* <h2>Hazardous</h2> */}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-16">
        {chartdata_aq &&
          GroupedBarChart(
            chartdata_aq,
            "cat",
            ["aqi", "pm25", "pm10", "o3"],
            "",
            ""
          )}
      </div>

      <p id="compare">Compare With</p>
      <SearchBar city1={city}/>

      <div className={styles.tableBox}>
        <p>OVERVIEW</p>
        <h2>What is the current air quality in {city?.city_name}?</h2>

        <Table className={styles.table1} id="aqi">
          <TableHeader>
            <TableRow className={styles.tableHeader}>
              <TableHead>Air pollution level</TableHead>
              <TableHead>Air quality index</TableHead>
              <TableHead>Main pollutant</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>Hazardous</TableCell>
              <TableCell>{city?.data[0].aqi} US AQI</TableCell>
              <TableCell>PM2.5</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table className={styles.table2} >
          <TableHeader>
            <TableRow className={styles.tableHeader}>
              <TableHead>Polutant</TableHead>
              <TableHead></TableHead>
              <TableHead>concentration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>PM2.5</TableCell>
              <TableCell></TableCell>
              <TableCell>{city?.data[0].pm25} µg/m³</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>PM10</TableCell>
              <TableCell></TableCell>
              <TableCell>{city?.data[0].pm10} µg/m³</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ozone (O3) </TableCell>
              <TableCell></TableCell>
              <TableCell>{city?.data[0].o3} µg/m³</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <br />
        <h2>What is the socio economic factor in {city?.countryName}?</h2>
        <Table className={styles.table3} id="score">
          <TableHeader>
            <TableRow className={styles.tableHeader}>
              <TableHead>Indicator</TableHead>
              <TableHead></TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Total GDP</TableCell>
              <TableCell></TableCell>
              <TableCell>{city?.gdp}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>GDP per capita</TableCell>
              <TableCell></TableCell>
              <TableCell>{city?.gdpPerCapita}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>GDP growth</TableCell>
              <TableCell></TableCell>
              <TableCell>{city?.gdpGrowth}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Total Population</TableCell>
              <TableCell></TableCell>
              <TableCell>{city?.population}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Population Growth</TableCell>
              <TableCell></TableCell>
              <TableCell>{city?.populationGrowth}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <Footer/>
    </div>
  );
};

export default CityDescription;
