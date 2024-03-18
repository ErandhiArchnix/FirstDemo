import express from "express";
import { signup } from "../controllers/authController.js";
import { getUsers } from "../controllers/authController.js";
import { createUser } from "../controllers/authController.js";
import { login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/getall", getUsers);
router.post("/createUser", createUser);
router.post("/login", login);
// router.get("/logout", logoutUser);
// router.post("/forgotPassword", forgotPassword);
// router.patch("/resetPassword/:resetToken", resetPassword);

export default router;