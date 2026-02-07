import express from "express";
import cors from "cors";
import asteroidRoutes from "./routes/asteroid.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Cosmic Watch Backend Running");
});

app.use("/api", asteroidRoutes);

export default app;
