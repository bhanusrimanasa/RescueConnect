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
  acceptReport,
  markRescued,updateProgress,
} from "../controllers/reportController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
const router=express.Router();
router.post("/", protect, createReport);

router.get("/", getAllReports);

router.get("/my", protect, getMyReports);

// Volunteer routes
router.get(
  "/assigned",
  protect,
  authorize("volunteer"),
  getAssignedReports
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

router.delete("/:id", protect, deleteReport);
export default router;
router.put(
  "/:id/progress",
  protect,
  authorize("volunteer"),
  updateProgress
);