import express from "express";
import { registerVolunteer } from "../controllers/volunteerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, registerVolunteer);

export default router;