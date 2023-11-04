import express from "express"
import cors from "cors"
import router from "./routes/index.js"
import "dotenv/config"
import path from "path"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

import { rateLimit } from "express-rate-limit"
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 5 minutes
    max: 1000000, // Limit each IP to 100 requests per `window` (here, per 5 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const app = express()

app.use(limiter)

app.use(
    cors({
        origin: true,
        credentials: true,
    })
)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, "build")))

app.use(router)

const port = process.env.PORT || 5000

app.listen(port, () => console.log("Server running at port", port))
