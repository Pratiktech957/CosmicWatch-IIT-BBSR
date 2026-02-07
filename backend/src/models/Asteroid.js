import mongoose from "mongoose";

/******************************************************************
 ASTEROID CORE MODEL
 - Cached NASA data
 - Read-heavy collection
 - Indexed by nasaId for O(1) fetch
******************************************************************/
const AsteroidSchema = new mongoose.Schema({
    nasaId: {
        type: String,
        unique: true,
        index: true
    },

    name: String,

    physical: {
        diameterKmMin: Number,
        diameterKmMax: Number,
        massKg: Number,
        density: Number
    },

    orbital: {
        velocityKps: Number,
        distanceFromEarthKm: Number,
        orbitClass: String,
        eccentricity: Number,
        inclination: Number
    },

    hazard: {
        isPotentiallyHazardous: Boolean,
        riskScore: Number
    },

    lastUpdated: Date
}, { timestamps: true });

AsteroidSchema.index({ "hazard.isPotentiallyHazardous": 1 });
AsteroidSchema.index({ "orbital.distanceFromEarthKm": 1 });

export const Asteroid = mongoose.model("Asteroid", AsteroidSchema);
