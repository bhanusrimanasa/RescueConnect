import express from "express";

import {
  createAdoption,
  getAllAdoptions,
  getAdoptionById,
  updateAdoption,
  deleteAdoption,
  getPendingAdoptions,
  updateApprovalStatus,
} from "../controllers/adoptionController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", getAllAdoptions);

router.get(
  "/pending",
  protect,
  authorize("admin"),
  getPendingAdoptions
);

router.put(
  "/:id/approval",
  protect,
  authorize("admin"),
  updateApprovalStatus
);
router.get("/:id", getAdoptionById);

router.post(
  "/",
  protect,
  authorize("volunteer"),
  createAdoption
);

router.put(
  "/:id",
  protect,
  authorize("volunteer"),
  updateAdoption
);

router.delete(
  "/:id",
  protect,
  authorize("volunteer"),
  deleteAdoption
);


export default router;