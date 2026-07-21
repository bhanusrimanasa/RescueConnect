import mongoose from "mongoose";

const animalReportSchema = new mongoose.Schema(
  {
    animalType: {
      type: String,
      required: true,
    },

    problem: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    contactUser: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rescued"],
      default: "Pending",
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AnimalReport = mongoose.model("AnimalReport", animalReportSchema);

export default AnimalReport;