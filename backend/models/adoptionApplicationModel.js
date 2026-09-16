import mongoose from "mongoose";

const adoptionApplicationSchema = new mongoose.Schema(
  {
    animal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Adoption",
      required: true,
    },

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    occupation: {
      type: String,
      required: true,
    },

    familyMembers: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      default: "",
    },

    reason: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Volunteer Approved",
        "Volunteer Rejected",
        "Approved",
        "Rejected",
      ],
      default: "Pending",
    },

    volunteerReviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    volunteerReviewedAt: {
      type: Date,
      default: null,
    },

    adminReviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    adminReviewedAt: {
      type: Date,
      default: null,
    },

    rejectionReason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "AdoptionApplication",
  adoptionApplicationSchema
);