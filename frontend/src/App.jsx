import { useState } from "react"
import { Button } from "./components/ui/button"

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div>
                <Button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </Button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
        </>
    )
}

export default App
