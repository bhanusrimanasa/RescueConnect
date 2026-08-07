import express from "express";

import {
  createApplication,
  getApplications,
  approveApplication,getVolunteerApprovedApplications,
  rejectApplication,getMyApplications,volunteerApprove,volunteerReject,
} from "../controllers/adoptionApplicationController.js";

import {protect} from "../middleware/authMiddleware.js";
import {authorize} from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/:animalId",
  protect,
  authorize("user"),
  createApplication
);
router.get(
  "/my",
  protect,
  authorize("user"),
  getMyApplications
);
router.get(
  "/",
  protect,
  authorize("volunteer", "admin"),
  getApplications
);
router.put(
  "/:id/volunteer-approve",
  protect,
  authorize("volunteer"),
  volunteerApprove
);

router.put(
  "/:id/volunteer-reject",
  protect,
  authorize("volunteer"),
  volunteerReject
);
router.put(
  "/:id/approve",
  protect,
  authorize("admin"),
  approveApplication
);

router.put(
  "/:id/reject",
  protect,
  authorize("admin"),
  rejectApplication
);
router.get(
  "/volunteer-approved",
  protect,
  authorize("admin"),
  getVolunteerApprovedApplications
);

export default router;