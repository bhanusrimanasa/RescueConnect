import express from "express";

import {
  createAdoptionRequest,
  getAllRequests,
  approveRequest,
  rejectRequest,
} from "../controllers/adoptionRequestController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();
router.post("/", protect, createAdoptionRequest);

router.get(
  "/",
  protect,
  authorize("volunteer", "admin"),
  getAllRequests
);

router.put(
  "/:id/approve",
  protect,
  authorize("volunteer", "admin"),
  approveRequest
);

router.put(
  "/:id/reject",
  protect,
  authorize("volunteer", "admin"),
  rejectRequest
);

export default router;