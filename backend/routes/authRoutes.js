import express from "express";

import {
  register,
  login,
  refresh,
  logout
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/refresh", refresh);

router.post("/logout", logout);

router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "User profile",
    user: req.user
  });
});

export default router;