import express from "express";
import { 
  registerVolunteer, 
  updateVolunteerLocation, 
  getNearbyVolunteers, 
  getAllVolunteers, 
  updateVolunteerStatus 
} from "../controllers/volunteerController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, registerVolunteer);
router.put("/location", protect, updateVolunteerLocation);
router.get("/nearby/:reportId", protect, getNearbyVolunteers);

// Admin routes
router.get("/admin/all", protect, admin, getAllVolunteers);
router.put("/admin/status/:volunteerId", protect, admin, updateVolunteerStatus);

export default router;