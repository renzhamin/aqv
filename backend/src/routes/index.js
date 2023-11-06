import express from "express"
import { get_cities_by_aqi, get_country_code } from "../data/helpers.js"
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
        let data = await get_city_info(cityname)
        console.log(data.country_code)
        const country_code = data.country_code
        let country_data = await get_country_info(country_code)
        data = {
            ...data,
            ...country_data,
        }
        console.log(data)
        
        return res.status(200).json(data)
        
    } catch {
        return res.status(500)
    }
})
router.use("/country/:countryname", async (req, res) => {
    const { countryname } = req.params
    const country_code = get_country_code(countryname)
    try {
        const data = await get_country_info(country_code)
        return res.status(200).json(data)
    } catch {
        return res.status(500)
    }
})

router.use("/api", router)

export default router
