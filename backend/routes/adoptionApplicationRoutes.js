import express from "express";

import {
  createApplication,
  getApplications,
  approveApplication,
  rejectApplication,getMyApplications
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
  "/:id/approve",
  protect,
  authorize("volunteer", "admin"),
  approveApplication
);

router.put(
  "/:id/reject",
  protect,
  authorize("volunteer", "admin"),
  rejectApplication
);

export default router;