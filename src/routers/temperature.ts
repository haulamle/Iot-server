import { Router } from "express";
import { AddTemperature, getTemperature } from "../controllers/temperature";

const router = Router();
router.post("/add-new", AddTemperature);
router.get("/get-temperature", getTemperature);

export default router;
