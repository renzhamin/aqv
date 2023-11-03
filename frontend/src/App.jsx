import {Routes, Route, BrowserRouter} from "react-router-dom";

import HomePage from "./pages/homepage/HomePage"
import CityDescription from "./pages/cityDescription/CityDescription";

import { useEffect, useState } from "react";

import { createContext } from "react";
import { get_cities_by_aqi } from "./fetch/rankings";

export const AppContext = createContext();

function App() {
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
    <>
      <AppContext.Provider
        value={{
          worst,
          best,
        }}
      >
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<HomePage/>} />
                  <Route path="/citydescription" element={<CityDescription/>} />
              </Routes>
          </BrowserRouter>

      </AppContext.Provider>
    </>
  );
}

export default App;
