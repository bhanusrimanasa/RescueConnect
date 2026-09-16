import Adoption from "../models/Adoption.js";
import AnimalReport from "../models/AnimalReport.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import AdoptionRequest from "../models/AdoptionRequest.js";
export const createAdoption = async (req, res) => {
  try {
    const adoption = await Adoption.create({
      ...req.body,

      rescuedBy: req.body.rescuedBy || null,
       approvalStatus: "Pending",
    });

    res.status(201).json(adoption);

  } catch (err) {
    console.error("CREATE ADOPTION ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

export const getAllAdoptions = async (req, res) => {
  try {
    const { search, location, status, animalType } = req.query;

    const filter = { approvalStatus: "Admin Approved",};
    filter.status="Available";
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (location) {
      filter.location = location;
    }

    if (status) {
      filter.status = status;
    }

    if (animalType) {
      filter.animalType = animalType;
    }
    
    const adoptions = await Adoption.find(filter).sort({
      createdAt: -1,
    });

    res.status(200).json(adoptions);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateAdoption = async (req, res) => {
  try {
    const adoption = await Adoption.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!adoption) {
      return res.status(404).json({
        message: "Adoption not found",
      });
    }

    res.status(200).json(adoption);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteAdoption = async (req, res) => {
  try {
    const adoption = await Adoption.findByIdAndDelete(req.params.id);

    if (!adoption) {
      return res.status(404).json({
        message: "Adoption not found",
      });
    }

    res.status(200).json({
      message: "Adoption deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const getAdoptionById = async (req, res) => {
  try {
    const animal = await Adoption.findById(req.params.id)
      .populate("rescuedBy", "name email role");

    if (!animal) {
      return res.status(404).json({
        message: "Animal not found",
      });
    }

    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getPendingAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find({
  approvalStatus: "Volunteer Approved",
})
  .populate("rescuedBy", "name email")
  .sort({ createdAt: -1 });

    res.status(200).json(adoptions);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const updateApprovalStatus = async (req, res) => {
  try {
    const { approvalStatus } = req.body;

    const adoption = await Adoption.findById(req.params.id);

    if (!adoption) {
      return res.status(404).json({
        message: "Animal not found",
      });
    }

    if (
      approvalStatus !== "Admin Approved" &&
      approvalStatus !== "Admin Rejected"
    ) {
      return res.status(400).json({
        message: "Invalid admin approval status",
      });
    }

    if (adoption.approvalStatus !== "Volunteer Approved") {
      return res.status(400).json({
        message: "Listing has not passed volunteer approval",
      });
    }

    adoption.approvalStatus = approvalStatus;

    await adoption.save();

    res.status(200).json({
      message: `Listing ${approvalStatus} successfully`,
      adoption,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
    });
  }
};
export const createAdoptionFromRescue = async (req, res) => {
  try {
    const report = await AnimalReport.findById(req.params.reportId);

    if (!report) {
      return res.status(404).json({
        message: "Rescue report not found",
      });
    }

    // Only the volunteer who rescued the animal can
    // submit the adoption listing request.
    if (
      report.rescuedBy?.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message:
          "Only the rescuing volunteer can create this listing request",
      });
    }

    if (report.status !== "Rescued") {
      return res.status(400).json({
        message:
          "Animal must be rescued before creating an adoption listing",
      });
    }

    // Prevent duplicate adoption requests for the same rescue
    const existingRequest = await AdoptionRequest.findOne({
      rescueReport: report._id,
    });

    if (existingRequest) {
      return res.status(400).json({
        message:
          "An adoption listing request already exists for this rescue",
      });
    }

    // Upload images
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      imageUrls = await Promise.all(
        req.files.map((file) =>
          uploadToCloudinary(file.buffer)
        )
      );
    }

    // Create AdoptionRequest
    const request = await AdoptionRequest.create({
      submittedBy: req.user._id,

      // Connect this request to the rescue
      rescueReport: report._id,

      animalType: report.animalType,
      name: req.body.name,
      breed: req.body.breed,
      age: req.body.age,
      gender: req.body.gender,
      size: req.body.size,

      location: report.location,

      phone: req.body.phone || report.contactUser,

      animalDescription:
        req.body.description || report.description,

      rescueStory: req.body.rescueStory,

      // Not needed for rescued-animal listing
      adoptionReason: "",

      vaccinated: req.body.vaccinated === "true",
      sterilized: req.body.sterilized === "true",
      specialNeeds: req.body.specialNeeds === "true",

      images: imageUrls,

      // IMPORTANT:
      // It must go through volunteer review first.
      status: "Pending",
    });

    res.status(201).json({
      message:
        "Adoption listing request submitted for volunteer review.",
      request,
    });
  } catch (error) {
    console.error(
      "CREATE ADOPTION REQUEST FROM RESCUE ERROR:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
};