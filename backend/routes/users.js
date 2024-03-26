import express from "express";
import { getLocations, getUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/getAllLocations", getLocations);
router.get("/getUser/:user_id", getUser);

export default router;