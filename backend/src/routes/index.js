import express from "express"
import { get_cities_by_aqi } from "../data/helpers.js"
import { get_city_info } from "../data/helpers.js"
import { get_country_info } from "../data/helpers.js"

const router = express.Router()

router.use("/health", async (req, res) => {
    return res.sendStatus(200)
})

router.use("/rankings", async (req, res) => {
    const { sort } = req.query
    let get_cleanest = true
    if (sort === "desc") get_cleanest = false

    try {
        const data = await get_cities_by_aqi(get_cleanest)
        return res.status(200).json(data)
    } catch {
        return res.status(500)
    }
})

router.use("/city/:cityname", async (req, res) => {
    const { cityname } = req.params
    try {
        const data = await get_city_info(cityname)
        return res.status(200).json(data)
        //return res.status(200).json({ msg: cityname })
    } catch {
        return res.status(500)
    }
})

router.use("/country/:country_code", async (req, res) => {
    const { country_code } = req.params
    try {
        const data = await get_country_info(country_code)
        return res.status(200).json(data)
        // return res.sendStatus(200)
    } catch {
        return res.status(500)
    }
})

router.use("/api", router)

export default router
