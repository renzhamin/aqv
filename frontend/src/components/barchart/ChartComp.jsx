import React, { useEffect, useState } from "react";
import GroupedBarChart from "./GroupedBarChart"; // Import the custom hook
import { useParams } from "react-router-dom";
import { get_city_info } from "@/fetch/rankings";
import Loading from "@/pages/loading/Loading";

function ChartComp() {
  const { cities } = useParams();
  const [updated, setUpdated] = useState(false);
  const [citys, setCities] = useState([]);

  const split = cities.split("-");
  let city1name = split[0];
  city1name = city1name[0].toUpperCase() + city1name.slice(1);

  let city2name = split[1];
  city2name = city2name[0].toUpperCase() + city2name.slice(1);

  useEffect(() => {
    const city1 = get_city_info(city1name);
    const city2 = get_city_info(city2name);

    Promise.all([city1, city2]).then((citylist) => {
      const data = [];
      const aqis = [];
      const pm25s = [];
      const pm10s = [];
      const o3s = [];

      citylist.forEach((city) => {
        aqis.push(city.data[0].aqi);
        pm25s.push(city.data[0].pm25);
        pm10s.push(city.data[0].pm10);
        o3s.push(city.data[0].o3);
      });

      data.push({
        name: "AQI",
        [citylist[0].city_name]: aqis[0],
        [citylist[1].city_name]: aqis[1],
      });
      data.push({
        name: "pm25",
        [citylist[0].city_name]: pm25s[0],
        [citylist[1].city_name]: pm25s[1],
      });

      data.push({
        name: "pm10",
        [citylist[0].city_name]: pm10s[0],
        [citylist[1].city_name]: pm10s[1],
      });

      data.push({
        name: "o3",
        [citylist[0].city_name]: o3s[0],
        [citylist[1].city_name]: o3s[1],
      });

      setCities(data);
      setUpdated(true);
    });
  }, []);

  return (
    <div class="flex justify-center items-center h-screen">
      {(updated &&
        GroupedBarChart(
          citys,
          "name",
          [city1name, city2name],
          "",
          "Value"
        )) || <Loading />}
    </div>
  );
}

export default ChartComp;
