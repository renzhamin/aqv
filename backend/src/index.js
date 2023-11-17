import express from "express"
import cors from "cors"
import router from "./routes/index.js"
import "dotenv/config"
import path from "path"
import { fileURLToPath } from "url"
import { Ratelimit } from "@upstash/ratelimit"
import { redis } from "./data/cache.js"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

if (process.env.NODE_ENV === "development")
    app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "build")))

let req_per_day = Number(process.env.REQ_PER_DAY)

if (isNaN(req_per_day) || req_per_day > 500) req_per_day = 150

export const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(req_per_day, "1 d"),
    analytics: true,
    ephemeralCache: new Map(),
})

app.use(async (req, res, next) => {
    try {
        const limiter_id = req.ip
        const { success, limit, reset, remaining } =
            await ratelimit.limit(limiter_id)
        res.set({
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
        })

        if (limit <= 0) {
            return res.status(503).json({
                message: "Redis cache quota exceeded. Contact Admin",
            })
        }

        const time_to_reset = Math.max(30, ~~((reset - Date.now()) / 1000))
        if (!success) {
            res.set(
                "cache-control",
                `private, max-age=${time_to_reset.toString()}, immutable`,
            )
            return res.status(429).json({ reset })
        }

        return next()
    } catch (err) {
        return res.status(503).json({
            message: "Redis cache quota exceeded (maybe). Contact Admin",
        })
    }
})

app.use(router)

const port = process.env.PORT || 5000

app.listen(port, () => console.log("Server running at port", port))
