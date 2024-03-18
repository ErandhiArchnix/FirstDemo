import express from "express";
import { signup, verifyUser, getToken, login, logout } from "../controllers/authController.js";
import { getUsers } from "../controllers/authController.js";
import { createUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/getall", getUsers);
router.post("/createUser", createUser);
router.post("/login", login);
router.get("/", verifyUser, getToken)
router.get("/logout", logout)
// router.get("/logout", logoutUser);
// router.post("/forgotPassword", forgotPassword);
// router.patch("/resetPassword/:resetToken", resetPassword);

export default router;