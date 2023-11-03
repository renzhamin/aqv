import { useState } from "react"
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";

import { Button } from "./components/ui/button"

import TopTen from "./pages/topTen/TopTen"
import MapsComponent from "./pages/maps/MapsComponent"
import AirQuality from "./pages/airQuality/AirQuality"
import Navigation from "./pages/navigation/Navigation"
import Footer from "./pages/footer/Footer"
import HomePage from "./pages/homepage/HomePage"
import CityDescription from "./pages/cityDescription/CityDescription";


function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            {/* <HomePage/> */}
            {/* <div>
                <Button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </Button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div> */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>} />
                    <Route path="/citydescription" element={<CityDescription/>} />
                </Routes>
            </BrowserRouter>

        </>
    )
}

export default App
