import axios from "axios";

export async function get_cities_by_aqi(get_cleanest = true) {
  let sort = "asc";
  if (!get_cleanest) sort = "desc";
  let data = await axios.get("/rankings?sort=" + sort);
  return data.data;
}

export async function get_city_info(city) {
  let data = await axios.get("/city/" + city);
  return data.data;
}

export async function get_country_info(country_code) {
  let data = await axios.get("/country/" + country_code);
  return data.data;
}
