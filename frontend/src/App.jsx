import { HashRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { createContext, Suspense } from "react"; // Import Suspense
import { ThemeProvider } from "./components/theme-provider";
import { get_cities_by_aqi } from "./fetch/rankings";
import React from "react";
import Loading from "./pages/loading/Loading";
import AllCities from "./pages/allCities/AllCities";

const HomePage = React.lazy(() => import("./pages/homepage/HomePage"));
const ChartComp = React.lazy(() => import("./pages/compare/Compare"));
const CityDescription = React.lazy(() =>
  import("./pages/cityDescription/CityDescription")
);

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
              <Route
                path="/"
                element={
                  <Suspense fallback={<Loading />}>
                    <HomePage />
                  </Suspense>
                }
              />
              <Route
                path="/compare/:cities"
                element={
                  <Suspense fallback={<Loading />}>
                    <ChartComp />
                  </Suspense>
                }
              />
              <Route
                path="/city/:cityname"
                element={
                  <Suspense fallback={<Loading />}>
                    <CityDescription />
                  </Suspense>
                }
              />
              <Route
                path="/cities/all"
                element={
                  <Suspense fallback={<Loading />}>
                    <AllCities />
                  </Suspense>
                }
              />
            </Routes>
          </HashRouter>
        </AppContext.Provider>
      </ThemeProvider>
    </>
  );
}

export default App;
