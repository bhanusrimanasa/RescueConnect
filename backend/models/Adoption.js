import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    animalType: {
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

    description: {
      type: String,
      required: true,
    },

    rescueStory: {
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

    temperament: [
      {
        type: String,
      },
    ],

    image: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Available",
        "Medical Care",
        "Adopted",
        "Foster Needed",
      ],
      default: "Available",
    },

    rescuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Adoption", adoptionSchema);