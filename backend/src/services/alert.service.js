import { Alert } from "../models/Alert.js";
import { SearchHistory } from "../models/SearchHistory.js";

// Check if we need to alert users about this asteroid
export const createRiskAlerts = async (asteroid, riskAnalysis) => {
    try {
        // Only alert for HIGH or EXTREME risk
        if (riskAnalysis.riskLevel !== "HIGH" && riskAnalysis.riskLevel !== "EXTREME") {
            return;
        }

        // Find users who have searched/watched this asteroid
        // In a real app, we might have a specific "WatchList" model, but here "SearchHistory" acts as interest
        const interestedUsers = await SearchHistory.find({ asteroidId: asteroid._id }).distinct("userId");

        if (interestedUsers.length === 0) return;

        for (const userId of interestedUsers) {
            // Check if alert already exists for today to avoid spam
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const existingAlert = await Alert.findOne({
                userId,
                asteroidId: asteroid._id,
                createdAt: { $gte: today }
            });

            if (!existingAlert) {
                await Alert.create({
                    userId,
                    asteroidId: asteroid._id,
                    alertType: "RISK_INCREASE",
                    message: `Hypothetical Alert: Asteroid ${asteroid.name} has a ${riskAnalysis.riskLevel} risk level! Impact probability: ${(riskAnalysis.impactProbability * 100).toFixed(2)}%.`,
                    isRead: false
                });
                console.log(`Alert created for user ${userId} regarding asteroid ${asteroid.name}`);
            }
        }
    } catch (err) {
        console.error("Error creating alerts:", err.message);
    }
};
