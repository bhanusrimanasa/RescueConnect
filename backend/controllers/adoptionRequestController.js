import AdoptionRequest from "../models/AdoptionRequest.js";
import Adoption from "../models/Adoption.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
export const createAdoptionRequest = async (req, res) => {
  try {
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      imageUrls = await Promise.all(
        req.files.map((file) =>
          uploadToCloudinary(file.buffer)
        )
      );
    }

    if (imageUrls.length === 0) {
      return res.status(400).json({
        message: "At least one animal image is required.",
      });
    }

    const request = await AdoptionRequest.create({
      ...req.body,

      submittedBy: req.user._id,

      vaccinated: req.body.vaccinated === "true",
      sterilized: req.body.sterilized === "true",
      specialNeeds: req.body.specialNeeds === "true",

      images: imageUrls,

      status: "Pending",
    });

    res.status(201).json({
      message: "Adoption request submitted successfully.",
      request,
    });
  } catch (err) {
    console.error("CREATE ADOPTION REQUEST ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

export const getPendingRequests = async (req, res) => {
  try {
    const requests = await AdoptionRequest.find({
      status: "Pending",
    })
      .populate("submittedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getVolunteerApprovedRequests = async (req, res) => {
  try {
    const requests = await AdoptionRequest.find({
      status: "Volunteer Approved",
    })
      .populate("submittedBy", "name email")
      .populate("volunteerReviewedBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const volunteerApprove = async (req, res) => {
  try {
    const request = await AdoptionRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({
        message: "Only pending requests can be reviewed.",
      });
    }

    request.status = "Volunteer Approved";
    request.volunteerReviewedBy = req.user._id;
    request.volunteerReviewedAt = new Date();
    request.rejectionReason = "";

    await request.save();

    res.status(200).json({
      message: "Recommendation sent to admin.",
      request,
    });
  } catch (err) {
    console.error("VOLUNTEER APPROVE REQUEST ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

export const volunteerReject = async (req, res) => {
  try {
    const request = await AdoptionRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.status !== "Pending") {
      return res.status(400).json({
        message: "Only pending requests can be reviewed.",
      });
    }

    const { rejectionReason } = req.body;

    if (!rejectionReason?.trim()) {
      return res.status(400).json({
        message: "Rejection reason is required.",
      });
    }

    request.status = "Volunteer Rejected";
    request.volunteerReviewedBy = req.user._id;
    request.volunteerReviewedAt = new Date();
    request.rejectionReason = rejectionReason.trim();

    await request.save();

    res.status(200).json({
      message: "Request rejected by volunteer.",
      request,
    });
  } catch (err) {
    console.error("VOLUNTEER REJECT REQUEST ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

export const approveRequest = async (req, res) => {
  try {
    const request = await AdoptionRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.status !== "Volunteer Approved") {
      return res.status(400).json({
        message:
          "Request must be approved by a volunteer first.",
      });
    }

    // Prevent duplicate adoption listings
    if (request.adoptionListing) {
      return res.status(400).json({
        message: "An adoption listing already exists for this request.",
      });
    }

    const adoption = await Adoption.create({
      name: request.name,
      animalType: request.animalType,
      breed: request.breed,
      age: request.age,
      gender: request.gender,
      size: request.size,
      location: request.location,
      description: request.animalDescription,
      rescueStory: request.rescueStory,
      vaccinated: request.vaccinated,
      sterilized: request.sterilized,
      specialNeeds: request.specialNeeds,
      temperament: [],
      images: request.images || [],

      status: "Available",
      approvalStatus: "Admin Approved",

      rescuedBy: request.submittedBy,
    });

    request.status = "Admin Approved";
    request.adminReviewedBy = req.user._id;
    request.adminReviewedAt = new Date();
    request.adoptionListing = adoption._id;
    request.rejectionReason = "";

    await request.save();

    res.status(200).json({
      message: "Request approved and listing published.",
      adoption,
    });
  } catch (err) {
    console.error("ADMIN APPROVE REQUEST ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const request = await AdoptionRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    if (request.status !== "Volunteer Approved") {
      return res.status(400).json({
        message:
          "Only volunteer-approved requests can be rejected by admin.",
      });
    }

    const { rejectionReason } = req.body;

    if (!rejectionReason?.trim()) {
      return res.status(400).json({
        message: "Rejection reason is required.",
      });
    }

    request.status = "Admin Rejected";
    request.adminReviewedBy = req.user._id;
    request.adminReviewedAt = new Date();
    request.rejectionReason = rejectionReason.trim();

    await request.save();

    res.status(200).json({
      message: "Request rejected by admin.",
      request,
    });
  } catch (err) {
    console.error("ADMIN REJECT REQUEST ERROR:", err);

    res.status(500).json({
      message: err.message,
    });
  }
};