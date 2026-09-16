import express from "express";

import {
  createReport,
  getAllReports,
  getReportById,
  updateReport,
  deleteReport,
  getMyReports,
  assignVolunteer,
  getAssignedReports,
  getCompletedReports,
  acceptReport,
  markRescued,
  updateProgress,
  rejectReport,
} from "../controllers/reportController.js";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router=express.Router();
router.post(
  "/",
  protect,
  upload.array("images", 10),
  createReport
);

router.get("/", getAllReports);

router.get("/my", protect, getMyReports);

// Volunteer routes
router.get(
  "/assigned",
  protect,
  authorize("volunteer"),
  getAssignedReports
);
router.get(
  "/completed",
  protect,
  authorize("volunteer"),
  getCompletedReports
);

router.put(
  "/:id/accept",
  protect,
  authorize("volunteer"),
  acceptReport
);

router.put(
  "/:id/rescue",
  protect,
  authorize("volunteer"),
  markRescued
);

// Admin route
router.put(
  "/:id/assign",
  protect,
  authorize("admin"),
  assignVolunteer
);

router.get("/:id", getReportById);

router.put("/:id", protect, updateReport);
router.put(
   "/:id/reject",
  protect,
  authorize("volunteer"),
  rejectReport
);
router.delete("/:id", protect, deleteReport);
export default router;
router.put(
  "/:id/progress",
  protect,
  authorize("volunteer"),
  updateProgress
);