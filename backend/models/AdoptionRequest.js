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
      required: true,
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

    image: {
      type: String,
       default: "/images/rescuedog.jpg",
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AdoptionRequest", adoptionRequestSchema);