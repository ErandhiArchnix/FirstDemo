import express from "express";
import { signup, verifyUser, getToken, login, logout, verifyEmail, verifybyOTP } from "../controllers/authController.js";
import { getUsers } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/getall", getUsers);
router.post("/login", login);
router.get("/", verifyUser, getToken)
router.get("/logout", logout)
router.put("/confirmation/:token", verifyEmail);
router.put("/confirmation/otp/:token", verifybyOTP);
// router.get("/logout", logoutUser);
// router.post("/forgotPassword", forgotPassword);
// router.patch("/resetPassword/:resetToken", resetPassword);

export default router;