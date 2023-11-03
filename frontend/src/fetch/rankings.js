import axios from "axios";

export async function get_cities_by_aqi(get_cleanest = true) {
  let sort = "asc";
  if (!get_cleanest) sort = "desc";
  let data = await axios.get("/rankings?sort=" + sort);
  return data.data;
}
