import fs from "fs"
import iso3166 from "iso-3166-1"
import {
    cache_exp_city,
    cache_exp_country,
    cache_exp_ranking,
    redis,
} from "./cache.js"
import "dotenv/config"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const apiKey = process.env.API_KEY

const ext_api = "https://website-api.airvisual.com/v1/countries/rankings?"

const aqi_api =
    "https://api.weatherbit.io/v2.0/current/airquality?city={{city}}&key=" +
    apiKey

const gdp_api =
    "https://api.worldbank.org/v2/country/{{country}}/indicator/NY.GDP.MKTP.CD?date={{year}}&format=json"
const gdp_per_capita_api =
    "https://api.worldbank.org/v2/country/{{country}}/indicator/NY.GDP.PCAP.PP.CD?date={{year}}&format=json"
const gdp_growth_api =
    "https://api.worldbank.org/v2/country/{{country}}/indicator/NY.GDP.MKTP.KD.ZG?date={{year}}&format=json"
const population_api =
    "https://api.worldbank.org/v2/country/{{country}}/indicator/SP.POP.TOTL?date={{year}}&format=json"
const population_growth_api =
    "https://api.worldbank.org/v2/country/{{country}}/indicator/SP.POP.GROW?date={{year}}&format=json"

export async function get_city_info(cityname) {
    const city_info = await redis.get(cityname)
    if (city_info) return city_info

    const url = aqi_api.replace("{{city}}", cityname)

    let data = await fetch(url)
    data = await data.json()
    const res = {
        city_name: data.city_name,
        country_code: data.country_code,
        aqi: data.data[0].aqi,
        o3: data.data[0].o3,
        pm10: data.data[0].pm10,
        pm25: data.data[0].pm25,
    }

    await redis.set(cityname, res, { ex: cache_exp_city })

    return res
}

export async function get_country_info(country_code) {
    let countryInfo = await redis.get(country_code)
    if (countryInfo) return countryInfo

    const country = iso3166.whereAlpha2(country_code)
    const gdp = await fetchData(gdp_api, country_code)
    const gdpPerCapita = await fetchData(gdp_per_capita_api, country_code)
    const gdpGrowth = await fetchData(gdp_growth_api, country_code)
    const population = await fetchData(population_api, country_code)
    const populationGrowth = await fetchData(
        population_growth_api,
        country_code,
    )

    countryInfo = {
        countryName: country.country,
        gdp: getValue(gdp),
        gdpPerCapita: getValue(gdpPerCapita),
        gdpGrowth: getValue(gdpGrowth),
        population: getValue(population),
        populationGrowth: getValue(populationGrowth),
    }

    await redis.set(country_code, countryInfo, { ex: cache_exp_country })

    return countryInfo
}

async function fetchData(api, countryCode) {
    const currentYear = new Date().getFullYear() - 1
    const url = api
        .replace("{{country}}", countryCode)
        .replace("{{year}}", currentYear)
    const response = await fetch(url)
    const data = await response.json()
    return data[1][0].value
}

function getValue(data) {
    return data || 0
}

function get_lat_lng() {
    const s = fs.readFileSync(path.resolve(__dirname, "cord"), "utf-8")
    const city_cord = new Map()
    if (!s) return city_cord
    const lines = s.split("\n")
    lines.forEach((line) => {
        const elems = line.split(",")
        if (elems[0].length > 0 && elems.length === 4) {
            city_cord.set(elems[0], {
                lat: elems[2],
                lng: elems[3],
            })
        }
    })
    return city_cord
}

const city_cords = get_lat_lng()

export async function get_cities_by_aqi(get_cleanest = true) {
    let sortOrder = "asc"
    if (!get_cleanest) sortOrder = "desc"

    if (get_cleanest) {
        const most_cleanest_cities = await redis.get("most_cleanest_cities")
        if (most_cleanest_cities) return most_cleanest_cities
    } else {
        const most_polluted_cities = await redis.get("most_polluted_cities")
        if (most_polluted_cities) return most_polluted_cities
    }

    let data = await fetch(
        ext_api +
            new URLSearchParams({
                sortBy: "aqi",
                sortOrder,
                perPage: 100,
                page: 1,
            }),
    )
    data = await data.json()

    const res = []
    data.forEach((item) => {
        const cords = city_cords.get(item.city)

        res.push({
            city: item.city,
            state: item.state,
            country: item.country,
            aqi: item.aqi,
            rank: item.rank,
            flagURL: item.flagURL,
            lat: cords?.lat,
            lng: cords?.lng,
        })
    })

    data = await fetch(
        ext_api +
            new URLSearchParams({
                sortBy: "aqi",
                sortOrder,
                perPage: 100,
                page: 2,
            }),
    )
    data = await data.json()
    data.forEach((item) => {
        const cords = city_cords.get(item.city)

        res.push({
            city: item.city,
            state: item.state,
            country: item.country,
            aqi: item.aqi,
            rank: item.rank,
            flagURL: item.flagURL,
            lat: cords?.lat,
            lng: cords?.lng,
        })
    })

    await redis.set(
        get_cleanest ? "most_cleanest_cities" : "most_polluted_cities",
        res,
        { ex: cache_exp_ranking },
    )

    return res
}

export const get_country_code = (countryName) => {
    const countryInfo = iso3166.whereCountry(countryName)
    return countryInfo ? countryInfo.alpha2 : null
}
