import express from "express";
import {
  createAdoptionRequest,
  getPendingRequests,
  getVolunteerApprovedRequests,
  volunteerApprove,
  volunteerReject,
  approveRequest,
  rejectRequest,
} from "../controllers/adoptionRequestController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// User
router.post("/", protect, createAdoptionRequest);

// Volunteer
router.get(
  "/pending",
  protect,
  authorize("volunteer"),
  getPendingRequests
);

router.put(
  "/:id/volunteer-approve",
  protect,
  authorize("volunteer"),
  volunteerApprove
);
router.get(
  "/volunteer-approved",
  protect,
  authorize("admin"),
  getVolunteerApprovedRequests
);
router.put(
  "/:id/volunteer-reject",
  protect,
  authorize("volunteer"),
  volunteerReject
);

// Admin
router.put(
  "/:id/approve",
  protect,
  authorize("admin"),
  approveRequest
);

router.put(
  "/:id/reject",
  protect,
  authorize("admin"),
  rejectRequest
);

export default router;