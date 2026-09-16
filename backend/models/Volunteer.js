import mongoose from "mongoose";

const volunteerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    emergencyContact: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    latitude: {
      type: Number,
      default: null,
    },

    longitude: {
      type: Number,
      default: null,
    },

    isAvailable: {
      type: Boolean,
      default: false,
    },

    availability: {
      type: String,
      enum: ["Weekdays", "Weekends", "Anytime"],
      required: true,
    },

    hasVehicle: {
      type: String,
      enum: ["Yes", "No"],
      default: "Yes",
      required: true,
    },

    experience: {
      type: String,
      enum: ["Beginner", "Intermediate", "Expert"],
      default: "Beginner",
      required: true,
    },

    volunteerReason: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    totalRescues: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Volunteer", volunteerSchema);