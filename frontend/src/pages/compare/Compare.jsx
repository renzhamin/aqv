import GroupedBarChart from "@/components/barchart/GroupedBarChart";
import { get_city_info } from "@/fetch/rankings";
import Loading from "@/pages/loading/Loading";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../search/searchbar";
import { AppContext } from "@/App";

function get_data(citylist, type, data) {
  const res = {
    name: type,
  };
  for (let i = 0; i < citylist.length; i++) {
    res[citylist[i].city_name] = data[i];
  }
  return res;
}

function capitalize(str) {
  let ret = str[0].toUpperCase();

  for (let i = 1; i < str.length; i++) {
    if (str[i - 1] === " ") ret += str[i].toUpperCase();
    else ret += str[i];
  }

  return ret;
}

function ChartComp() {
  const { cities } = useParams();
  const [updated, setUpdated] = useState(false);
  const [citys, setCities] = useState([]);
  const { worst } = useContext(AppContext);
  const [selected, setSelected] = useState("");
  const navigate = useNavigate();
  const citynames = cities.split("-").map((cityname) => capitalize(cityname));

  useEffect(() => {
    if (selected) {
      setUpdated(false);
      navigate("/compare/" + cities + "-" + selected);
      setSelected("");
    }
  }, [selected]);

  useEffect(() => {
    const citydata = [];
    citynames.forEach((cityname) => citydata.push(get_city_info(cityname)));

    Promise.all(citydata).then((citylist) => {
      const data = [];
      const aqis = [];
      const pm25s = [];
      const pm10s = [];
      const o3s = [];

      citylist.forEach((city) => {
        aqis.push(city.aqi);
        pm25s.push(city.pm25);
        pm10s.push(city.pm10);
        o3s.push(city.o3);
      });

      data.push(get_data(citylist, "AQI", aqis));
      data.push(get_data(citylist, "pm2.5", pm25s));
      data.push(get_data(citylist, "pm10", pm10s));
      data.push(get_data(citylist, "o3", o3s));

      setCities(data);
      setUpdated(true);
    });
  }, [cities]);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="w-full flex justify-center">
        {updated && (
          <SearchBar
            selected={selected}
            setSelected={setSelected}
            promptString={"Add City"}
            data={worst}
          />
        )}
      </div>
      <div className={!updated ? "h-full" : ""}>
        {(updated &&
          GroupedBarChart(citys, "name", citynames, "", "Value")) || (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default ChartComp;
