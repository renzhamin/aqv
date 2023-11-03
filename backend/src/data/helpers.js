import { cached_data } from "./cache.js";
import "dotenv/config";

const apiKey = process.env.API_KEY;

const ext_api = "https://website-api.airvisual.com/v1/countries/rankings?";

const aqi_api =
  "https://api.weatherbit.io/v2.0/current/airquality?city={{city}}&key=" +
  apiKey;

const gdp_api = "https://api.worldbank.org/v2/country/{{country}}/indicator/NY.GDP.MKTP.CD?date=2022&format=json";
const gdp_per_capita_api =
  "https://api.worldbank.org/v2/country/{{country}}/indicator/NY.GDP.PCAP.PP.CD?date=2022&format=json";
const gdp_growth_api = "https://api.worldbank.org/v2/country/{{country}}/indicator/NY.GDP.MKTP.KD.ZG?date=2022&format=json";
const population_api = "https://api.worldbank.org/v2/country/{{country}}/indicator/SP.POP.TOTL?date=2022&format=json";
const population_growth_api = "https://api.worldbank.org/v2/country/{{country}}/indicator/SP.POP.GROW?date=2022&format=json";


export async function get_city_info(cityname) {
  const city_info = cached_data.get(cityname);
  if (city_info) return city_info;

  const url = aqi_api.replace("{{city}}", cityname);

  let data = await fetch(url);

  data = await data.json();

  console.log(data.data);

  cached_data.set(cityname, data);

  return data;
}

export async function get_country_info(country_code) {
    const gdp = await fetchData(gdp_api, country_code);
    const gdpPerCapita = await fetchData(gdp_per_capita_api, country_code);
    const gdpGrowth = await fetchData(gdp_growth_api, country_code);
    const population = await fetchData(population_api, country_code);
    const populationGrowth = await fetchData(population_growth_api, country_code);

    const countryInfo = {
        gdp: getValue(gdp),
        gdpPerCapita: getValue(gdpPerCapita),
        gdpGrowth: getValue(gdpGrowth),
        population: getValue(population),
        populationGrowth: getValue(populationGrowth)
    };

    console.log(countryInfo);
    return [countryInfo];
}

async function fetchData(api, countryCode) {
    const url = api.replace("{{country}}", countryCode);
    const response = await fetch(url);
    const data = await response.json();
    return data[1][0].value;
}

function getValue(data) {
    return data || 0;
}



export async function get_cities_by_aqi(get_cleanest = true) {
  let sortOrder = "asc";
  if (!get_cleanest) sortOrder = "desc";

  if (get_cleanest) {
    const most_cleanest_cities = cached_data.get("most_cleanest_cities");
    if (most_cleanest_cities) return most_cleanest_cities;
  } else {
    const most_polluted_cities = cached_data.get("most_polluted_cities");
    if (most_polluted_cities) return most_polluted_cities;
  }

  let data = await fetch(
    ext_api +
      new URLSearchParams({
        sortBy: "aqi",
        sortOrder,
        perPage: 100,
        page: 1,
      })
  );
  data = await data.json();

  const res = [];
  data.forEach((item) => {
    res.push({
      city: item.city,
      state: item.state,
      country: item.country,
      aqi: item.aqi,
      rank: item.rank,
      flagURL: item.flagURL,
    });
  });

  data = await fetch(
    ext_api +
      new URLSearchParams({
        sortBy: "aqi",
        sortOrder,
        perPage: 100,
        page: 2,
      })
  );
  data = await data.json();
  data.forEach((item) => {
    res.push({
      city: item.city,
      state: item.state,
      country: item.country,
      aqi: item.aqi,
      rank: item.rank,
      flagURL: item.flagURL,
    });
  });

  cached_data.set(
    get_cleanest ? "most_cleanest_cities" : "most_polluted_cities",
    res
  );

  return res;
}
