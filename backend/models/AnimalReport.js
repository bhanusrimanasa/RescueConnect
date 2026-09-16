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

   
    location: {
      type: String,
      required: true,
    },
    latitude: {
       type: Number,
        default:null,
      },

      longitude: {
        type: Number,
        default:null,
      },
    description: {
      type: String,
      required: true,
    },

    images: [
        {
          type: String,
        },
      ],
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
  rescuedAt: {
  type: Date,
  default: null,
},

rescuedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null,
},

  priority: {
    type: String,
    enum: ["Critical", "High", "Medium", "Low"],
    default: "Medium",
  },
 statusHistory: [
  {
    status: {
      type: String,
    },

    note: {
      type: String,
      default: "",
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