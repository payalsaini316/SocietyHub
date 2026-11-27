import express from "express";

import {
  createNotice,
  getNotices,
  deleteNotice
} from "../controllers/noticeController.js";

import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin creates notice
router.post(
  "/",
  protect,
  allowRoles("admin"),
  createNotice
);

// Residents and admin view notices
router.get(
  "/",
  protect,
  getNotices
);

// Admin deletes notice
router.delete(
  "/:id",
  protect,
  allowRoles("admin"),
  deleteNotice
);

export default router;