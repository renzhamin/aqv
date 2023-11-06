import { get_city_info } from "@/fetch/rankings";
import React, { useEffect, useState } from "react";
import NavigationSub from "../navigation/NavigationSub";
import styles from "./CityDescription.module.css";

import GroupedBarChart from "@/components/barchart/GroupedBarChart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { colorIndex, colorIndex2 } from "@/helpers/colorIndex";
import { useParams } from "react-router-dom";

import Footer from "../footer/Footer";
import Loading from "../loading/Loading";
import SearchBar from "../search/search";
import { aqiuslegend } from "@/helpers/aqiuslegend";

const CityDescription = () => {
  const [loading, setLoading] = React.useState(true);
  const [city, setCity] = React.useState(null);
  const [chartdata_aq, setAQ] = useState([]);
  const { cityname } = useParams();

  useEffect(() => {
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
      setLoading(false);
    });

    setTimeout(() => window.scrollTo(0, 0), 0);
  }, []);

  return (
    <div className={styles.cityDescription}>
      <NavigationSub />
      <h2 className={styles.topSpace}></h2>
      <div className={styles.topBox}>
        <div className={styles.titleBox}>
          <h2>Air quality in {city?.city_name}</h2>
          <p>
            Air quality index (AQI) and PM2.5 air pollution in {city?.city_name}
          </p>
        </div>
        <div
          className={`${colorIndex2(
            city?.data[0].aqi
          )} rounded-lg flex justify-between py-3 px-8 text-white w-1/2`}
        >
          <div
            className={
              colorIndex(city?.data[0].aqi) +
              " p-4 rounded w-1/4 flex flex-col items-center justify-center"
            }
          >
            <p> US AQI</p>
            <h2>{city?.data[0].aqi}</h2>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p>Live AQI INDEX</p>
            <h2 className="my-auto text-4xl">
              {aqiuslegend(city?.data[0].aqi)}
            </h2>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-16">
        {(loading && <Loading />) ||
          (chartdata_aq &&
            GroupedBarChart(
              chartdata_aq,
              "cat",
              ["aqi", "pm25", "pm10", "o3"],
              "",
              ""
            ))}
      </div>

      <p className="mx-auto text-center mt-6" id="compare">
        Compare With
      </p>
      <SearchBar city1={city} />

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

        <Table className={styles.table2}>
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
              <TableCell>
                {city?.gdp && parseFloat(city.gdp).toFixed(2)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>GDP per capita</TableCell>
              <TableCell></TableCell>
              <TableCell>
                {city?.gdpPerCapita && parseFloat(city.gdpPerCapita).toFixed(2)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>GDP growth</TableCell>
              <TableCell></TableCell>
              <TableCell>
                {city?.gdpGrowth && parseFloat(city.gdpGrowth).toFixed(2)}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Total Population</TableCell>
              <TableCell></TableCell>
              <TableCell>{city?.population}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Population Growth</TableCell>
              <TableCell></TableCell>
              <TableCell>
                {city?.populationGrowth &&
                  parseFloat(city.populationGrowth).toFixed(2)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <Footer />
    </div>
  );
};

export default CityDescription;
