import express from "express";
import { signup } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
// router.post("/login", login);
// router.get("/logout", logoutUser);
// router.post("/forgotPassword", forgotPassword);
// router.patch("/resetPassword/:resetToken", resetPassword);

export default router;