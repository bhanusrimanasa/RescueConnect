import mongoose from "mongoose";

const successStorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    story: {
      type: String,
      required: true,
      trim: true,
    },

    animalType: {
      type: String,
      required: true,
    },

    // Rescue report from which this success story came
    report: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AnimalReport",
      required: true,
    },

    // Volunteer who submitted the story
    volunteer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Rescued animal photo
    image: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    approvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const SuccessStory = mongoose.model(
  "SuccessStory",
  successStorySchema
);

export default SuccessStory;