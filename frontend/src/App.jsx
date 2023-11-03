import { useState } from "react"
import { Button } from "./components/ui/button"
import TopTen from "./pages/topTen/TopTen"
import MapsComponent from "./pages/maps/MapsComponent"
import AirQuality from "./pages/airQuality/AirQuality"

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <MapsComponent/>
            <div>
                <Button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </Button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
                
                <AirQuality/>
            </div>
        </>
    )
}

export default App
