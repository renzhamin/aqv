import { cached_data } from "./cache.js"

const ext_api = "https://website-api.airvisual.com/v1/countries/rankings?"

export async function get_cities_by_aqi(get_cleanest = true) {
    let sortOrder = "asc"
    if (!get_cleanest) sortOrder = "desc"

    if (get_cleanest) {
        const most_cleanest_cities = cached_data.get("most_cleanest_cities")
        if (most_cleanest_cities) return most_cleanest_cities
    } else {
        const most_polluted_cities = cached_data.get("most_polluted_cities")
        if (most_polluted_cities) return most_polluted_cities
    }

    let data = await fetch(
        ext_api +
            new URLSearchParams({
                sortBy: "aqi",
                sortOrder,
                perPage: 100,
                page: 1,
            })
    )
    data = await data.json()

    const res = []
    data.forEach((item) => {
        res.push({
            city: item.city,
            state: item.state,
            country: item.country,
            aqi: item.aqi,
            rank: item.rank,
            flagURL: item.flagURL,
        })
    })

    data = await fetch(
        ext_api +
            new URLSearchParams({
                sortBy: "aqi",
                sortOrder,
                perPage: 100,
                page: 2,
            })
    )
    data = await data.json()
    data.forEach((item) => {
        res.push({
            city: item.city,
            state: item.state,
            country: item.country,
            aqi: item.aqi,
            rank: item.rank,
            flagURL: item.flagURL,
        })
    })

    cached_data.set(
        get_cleanest ? "most_cleanest_cities" : "most_polluted_cities",
        res
    )

    return res
}
