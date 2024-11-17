// src/routes/userRoutes.ts
import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const limits = rateLimit({
  windowMs: 120 * 60 * 1000,
  max: 100,
  message: "Too many request! please try again after sometime :(",
});

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getUserProfile);

export default router;
