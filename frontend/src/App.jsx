import { useEffect, useState } from "react";
import HomePage from "./pages/homepage/HomePage";

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
        <HomePage />
        {/* <div>
                <Button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </Button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div> */}
      </AppContext.Provider>
    </>
  );
}

export default App;
