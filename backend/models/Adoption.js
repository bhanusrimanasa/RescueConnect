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

   images: [
      {
        type: String,
      },
    ],

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
    approvalStatus: {
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

    rescuedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
     default:null,
    },
    rescueReport: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "AnimalReport",
  default:null,
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Adoption", adoptionSchema);