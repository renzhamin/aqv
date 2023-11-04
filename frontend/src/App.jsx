import { Routes, Route, BrowserRouter, HashRouter } from "react-router-dom";

import HomePage from "./pages/homepage/HomePage";
import CityDescription from "./pages/cityDescription/CityDescription";

import { useEffect, useState } from "react";

import { createContext } from "react";
import { get_cities_by_aqi } from "./fetch/rankings";
import ChartComp from "./components/barchart/ChartComp";
import { ThemeProvider } from "./components/theme-provider";

export const AppContext = createContext();

function App() {
  const [worst, setWorst] = useState([]);
  const [best, setBest] = useState([]);
  useEffect(() => {
    get_cities_by_aqi(false).then((data) => {
      setWorst(data);
    });

    get_cities_by_aqi(true).then((data) => {
      setBest(data);
    });
  }, []);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppContext.Provider
          value={{
            worst,
            best,
          }}
        >
          <HashRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/comp/:cities" element={<ChartComp />} />
              <Route path="/city/:cityname" element={<CityDescription />} />
            </Routes>
          </HashRouter>
        </AppContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
