import mongoose from "mongoose";

const animalReportSchema = new mongoose.Schema(
  {
    animalType: {
      type: String,
      required: true,
      enum: ["Dog", "Cat", "Cow", "Bird", "Other"],
    },
    problem: {
      type: String,
      required: true,
    },
    condition: {
      type: String,
      required: true,
      enum: ["Mild", "Moderate", "Critical"],
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const AnimalReport = mongoose.model("AnimalReport", animalReportSchema);

export default AnimalReport;