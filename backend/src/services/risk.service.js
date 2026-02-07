import { RiskAnalysis } from "../models/RiskAnalysis.js";
import { Asteroid } from "../models/Asteroid.js";
import { createRiskAlerts } from "./alert.service.js";

// Mock function to simulate ML Model API call
const predictRiskFromML = async (asteroid) => {
    // In a real scenario, this would be an axios.post() to a Python/Flask ML service
    // For now, we simulate risk based on physical properties

    // Simple logic for demo:
    // Large diameter + high velocity + close distance = High Risk

    const diameter = (asteroid.physical.diameterKmMin + asteroid.physical.diameterKmMax) / 2;
    const velocity = asteroid.orbital.velocityKps;
    const distance = asteroid.orbital.distanceFromEarthKm;

    let riskLevel = "LOW";
    let score = 0;

    if (asteroid.hazard.isPotentiallyHazardous) {
        riskLevel = "MEDIUM";
        score += 50;
    }

    if (diameter > 1) score += 20; // > 1km is huge
    if (velocity > 25) score += 10; // Fast
    if (distance < 1000000) score += 30; // Close (10x lunar distance approx for demo scale)

    if (score > 80) riskLevel = "EXTREME";
    else if (score > 60) riskLevel = "HIGH";

    // Mock impact zones
    const zones = [];
    if (riskLevel === "HIGH" || riskLevel === "EXTREME") {
        zones.push({
            country: "Pacific Ocean",
            affectedRadiusKm: diameter * 100,
            severityIndex: 8
        });
    }

    return {
        riskLevel,
        impactProbability: score / 100, // Normalized
        energyMegatons: diameter * 1000, // Rough proxy
        impactZones: zones
    };
};

export const analyzeAsteroidRisk = async (asteroidId) => {
    try {
        const asteroid = await Asteroid.findById(asteroidId);
        if (!asteroid) throw new Error("Asteroid not found");

        const prediction = await predictRiskFromML(asteroid);

        const riskAnalysis = await RiskAnalysis.findOneAndUpdate(
            { asteroidId: asteroid._id },
            {
                riskLevel: prediction.riskLevel,
                impactProbability: prediction.impactProbability,
                energyMegatons: prediction.energyMegatons,
                impactZones: prediction.impactZones,
                calculatedAt: new Date()
            },
            { upsert: true, new: true }
        );

        // trigger alerts
        await createRiskAlerts(asteroid, riskAnalysis);

        return riskAnalysis;
    } catch (err) {
        console.error(`Error analyzing risk for asteroid ${asteroidId}:`, err.message);
        throw err;
    }
};
