import express from "express";
import { getRegions, getLanguages, getSpecialties } from "../controllers/searchController.js";

const router = express.Router();

router.get("/getAllRegions", getRegions);
router.get("/getAllLanguages", getLanguages);
router.get("/getAllSpecialties", getSpecialties);
// router.get("/getUser/:user_id", getUser);
// router.get("/getLocation/:location_id", getLocation);
// router.put("/updateLocation/:location_id", updateLocation);
// router.post("/createLocation", createLocation);
// router.put("/updateUser/:user_id", updateUser);

export default router;