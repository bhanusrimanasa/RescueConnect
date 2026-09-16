import express from "express";

import {
  createSuccessStory,
  getPendingSuccessStories,
  approveSuccessStory,
  rejectSuccessStory,
  getApprovedSuccessStories,
  getSuccessStoryById,
} from "../controllers/successStoryController.js";

import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Volunteer submits a success story
router.post(
  "/",
  (req, res, next) => {
    console.log("1️ SUCCESS STORY ROUTE HIT");
    next();
  },
  protect,
  (req, res, next) => {
    console.log(" PROTECT PASSED");
    console.log("USER:", req.user);
    next();
  },
  authorize("volunteer"),
  upload.single("image"),
  createSuccessStory
);
// Admin gets pending stories
router.get(
  "/pending",
  protect,
  authorize("admin"),
  getPendingSuccessStories
);

// Admin approves story
router.put(
  "/:id/approve",
  protect,
  authorize("admin"),
  approveSuccessStory
);

// Admin rejects story
router.put(
  "/:id/reject",
  protect,
  authorize("admin"),
  rejectSuccessStory
);

// Anyone can view approved stories
router.get(
  "/",
  getApprovedSuccessStories
);
router.get(
  "/:id",
  getSuccessStoryById
);

export default router;