import express from "express";
import { getLocations, getUser, getLocation, updateLocation, createLocation, updateUser} from "../controllers/userController.js";

const router = express.Router();

router.get("/getAllLocations", getLocations);
router.get("/getUser/:user_id", getUser);
router.get("/getLocation/:location_id", getLocation);
router.put("/updateLocation/:location_id", updateLocation);
router.post("/createLocation", createLocation);
router.put("/updateUser/:user_id", updateUser);

export default router;