import axios from "axios";
import { ENV } from "../config/env.js";

export async function fetchAsteroids(startDate, endDate) {
  const response = await axios.get(
    "https://api.nasa.gov/neo/rest/v1/feed",
    {
      params: {
        start_date: startDate,
        end_date: endDate,
        api_key: ENV.NASA_API_KEY
      },
      timeout: 10000
    }
  );

  return response.data.near_earth_objects;
}
