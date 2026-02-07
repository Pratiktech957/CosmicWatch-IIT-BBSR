import { fetchAsteroids } from "../services/nasa.service.js";
import { calculateRisk } from "../utils/riskCalculator.js";

export async function getAsteroids(req, res) {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const startDate = req.query.start_date || today;
    const endDate = req.query.end_date || startDate;

    const neoData = await fetchAsteroids(startDate, endDate);
    const result = [];

    for (const date in neoData) {
      for (const asteroid of neoData[date]) {
        if (!asteroid.close_approach_data.length) continue;

        const approach = asteroid.close_approach_data.reduce(
          (min, curr) =>
            Number(curr.miss_distance.kilometers) <
            Number(min.miss_distance.kilometers)
              ? curr
              : min
        );

        const diameter =
          asteroid.estimated_diameter.kilometers
            .estimated_diameter_max;

        const speed = Number(
          approach.relative_velocity.kilometers_per_hour
        );

        const distance = Number(
          approach.miss_distance.kilometers
        );

        const risk = calculateRisk(diameter, speed, distance);

        result.push({
          id: asteroid.id,
          name: asteroid.name,
          date: approach.close_approach_date,
          diameter_km: Number(diameter.toFixed(3)),
          speed_kmph: Math.round(speed),
          miss_distance_km: Math.round(distance),
          hazardous: asteroid.is_potentially_hazardous_asteroid,
          risk_score: risk.score,
          risk_level: risk.level
        });
      }
    }

    result.sort((a, b) => b.risk_score - a.risk_score);

    res.json({
      count: result.length,
      start_date: startDate,
      end_date: endDate,
      asteroids: result
    });

  } catch (error) {
    if (error.response) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }

    res.status(500).json({ error: "Failed to fetch asteroid data" });
  }
}
