import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { getVolunteers } from "../controllers/userController.js";
import { getSuccessStoryById } from "../controllers/successStoryController.js";
import { updateProfile } from "../controllers/userController.js";
const router = express.Router();
router.get(
  "/volunteers",
  protect,
  authorize("admin"),
  getVolunteers
);
router.get(
  "/:id",
  getSuccessStoryById
);
router.put("/profile", protect, updateProfile);
export default router;