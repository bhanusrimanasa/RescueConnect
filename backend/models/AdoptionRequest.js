import mongoose from "mongoose";

const adoptionRequestSchema = new mongoose.Schema(
  {
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    animalType: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    breed: {
      type: String,
      required: true,
    },

    age: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },

    size: {
      type: String,
      enum: ["Small", "Medium", "Large"],
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    animalDescription: {
      type: String,
      required: true,
    },

    rescueStory: {
      type: String,
      required: true,
    },

    adoptionReason: {
      type: String,
      default:"",
    },

    vaccinated: {
      type: Boolean,
      default: false,
    },

    sterilized: {
      type: Boolean,
      default: false,
    },

    specialNeeds: {
      type: Boolean,
      default: false,
    },

    images: [
      {
        type: String,
      },
    ],

    status: {
      type: String,
      enum: [
        "Pending",
        "Volunteer Approved",
        "Volunteer Rejected",
        "Admin Approved",
        "Admin Rejected",
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

    adoptionListing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Adoption",
      default: null,
    },
    rescueReport: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "AnimalReport",
  default: null,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "AdoptionRequest",
  adoptionRequestSchema
);