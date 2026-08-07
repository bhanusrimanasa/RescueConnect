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
    enum: [
      "Pending",
      "Assigned",
      "In Progress",
      "Rescued",
      "Closed",
    ],
    default: "Pending",
  },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      },
      assignedVolunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

      assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },

  assignedAt: {
    type: Date,
  },

  priority: {
    type: String,
    enum: ["Critical", "High", "Moderate", "Low"],
    default: "Moderate",
  },
  statusHistory: [
  {
    status: {
      type: String,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
],

  },
  {
    timestamps: true,
  }
  
);

const AnimalReport = mongoose.model("AnimalReport", animalReportSchema);

export default AnimalReport;