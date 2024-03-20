import express from "express";
import { getLocations } from "../controllers/userController.js";

const router = express.Router();

router.get("/getAllLocations", getLocations);

export default router;