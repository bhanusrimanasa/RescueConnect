import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { getVolunteers } from "../controllers/userController.js";

const router = express.Router();

router.get(
  "/volunteers",
  protect,
  authorize("admin"),
  getVolunteers
);

export default router;