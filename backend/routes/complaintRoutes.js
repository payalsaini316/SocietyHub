import express from "express";

import {
  createComplaint,
  getComplaints,
  updateComplaintStatus
} from "../controllers/complaintController.js";

import { protect } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Resident: Create Complaint
router.post(
  "/",
  protect,
  allowRoles("resident"),
  createComplaint
);

// Resident and Admin: View Complaints
router.get(
  "/",
  protect,
  allowRoles("resident", "admin"),
  getComplaints
);

// Admin: Update Complaint Status
router.patch(
  "/:id/status",
  protect,
  allowRoles("admin"),
  updateComplaintStatus
);

export default router;