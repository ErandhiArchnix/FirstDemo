import express from "express";
import { signup01 } from "../controllers/authController.js";
import { getUsers } from "../controllers/authController.js";
import { createUser } from "../controllers/authController.js";

const router = express.Router();

router.put("/signup01/:user_id", signup01);
router.get("/getall", getUsers);
router.post("/createUser", createUser);
// router.post("/login", login);
// router.get("/logout", logoutUser);
// router.post("/forgotPassword", forgotPassword);
// router.patch("/resetPassword/:resetToken", resetPassword);

export default router;