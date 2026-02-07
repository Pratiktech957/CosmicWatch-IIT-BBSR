import express from "express";
import { getAsteroids } from "../controllers/asteroid.controller.js";

const router = express.Router();

router.get("/asteroids", getAsteroids);

export default router;
