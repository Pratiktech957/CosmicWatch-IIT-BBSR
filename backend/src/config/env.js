import dotenv from "dotenv";

dotenv.config();

if (!process.env.NASA_API_KEY) {
  throw new Error("NASA_API_KEY is missing");
}

export const ENV = {
  PORT: process.env.PORT || 5000,
  NASA_API_KEY: process.env.NASA_API_KEY
};
