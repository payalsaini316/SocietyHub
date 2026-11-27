import express from "express";

import {
  createDue,
  getDues,
  updateDueStatus
} from "../controllers/dueController.js";

import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Admin: Create Maintenance Due
router.post(
  "/",
  protect,
  allowRoles("admin"),
  createDue
);

// Resident and Admin: View Dues
router.get(
  "/",
  protect,
  allowRoles("resident", "admin"),
  getDues
);

// Admin: Update Due Status
router.patch(
  "/:id/status",
  protect,
  allowRoles("admin"),
  updateDueStatus
);

export default router;