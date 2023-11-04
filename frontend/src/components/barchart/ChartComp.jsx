import React from "react";
import GroupedBarChart from "./GroupedBarChart"; // Import the custom hook
import { useParams } from "react-router-dom";

const cities = [
  { city_name: "Dhaka", data: { aqi: 100, pm25: 20, pm10: 30, o3: 50 } },
  { city_name: "Barishal", data: { aqi: 80, pm25: 10, pm10: 20, o3: 30 } },
];

function ChartComp() {
  const {cities} = useParams();
  console.log(cities);


  const data = [];
  const aqis = [];
  const pm25s = [];
  const pm10s = [];
  const o3s = [];
  cities.forEach((city) => {
    aqis.push(city.data.aqi);
    pm25s.push(city.data.pm25);
    pm10s.push(city.data.pm10);
    o3s.push(city.data.o3);
  });

  data.push({
    name: "AQI",
    [cities[0].city_name]: aqis[0],
    [cities[1].city_name]: aqis[1],
  });
  data.push({
    name: "pm25",
    [cities[0].city_name]: pm25s[0],
    [cities[1].city_name]: pm25s[1],
  });

  data.push({
    name: "pm10",
    [cities[0].city_name]: pm10s[0],
    [cities[1].city_name]: pm10s[1],
  });

  data.push({
    name: "o3",
    [cities[0].city_name]: o3s[0],
    [cities[1].city_name]: o3s[1],
  });

  return (
    <div>
      {GroupedBarChart(
        data,
        "name",
        [cities[0].city_name, cities[1].city_name],
        "Month",
        "Value"
      )}
    </div>
  );
}

export default ChartComp;
