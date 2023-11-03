import express from "express"
import "dotenv/config"

const router = express.Router()

const ext_api = "http://api.airvisual.com/v2"
const api_key = process.env.API_KEY

console.log(api_key)

async function get_countries() {
    let data = await fetch(ext_api + "/countries?key=" + api_key)
    data = await data.json()
    const countries = []
    data.data.forEach((item) => countries.push(item.country))
    return countries
}

async function get_states(country) {
    let data = await fetch(
        ext_api +
            "/states?" +
            new URLSearchParams({
                country,
                key: api_key,
            })
    )
    data = await data.json()
    const states = []
    data.data.forEach((item) => states.push(item.state))
    return states
}

router.use("/health", async (req, res) => {
    const states_bd = await get_states("Bangladesh")
    console.log(states_bd)
    /* return res.status(200).json({ countries }) */
    return res.sendStatus(200)
})

router.use("/api", router)

export default router
