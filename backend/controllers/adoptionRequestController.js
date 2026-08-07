import AdoptionRequest from "../models/AdoptionRequest.js";
import Adoption from "../models/Adoption.js";

export const createAdoptionRequest = async (req, res) => {
  try {
    const request = await AdoptionRequest.create({
      ...req.body,
      submittedBy: req.user._id,
    });

    res.status(201).json({
      message: "Adoption request submitted successfully.",
      request,
    });
  } catch (err) {
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
// Admin sees only volunteer-approved requests
export const getVolunteerApprovedRequests = async (req, res) => {
  try {
    const requests = await AdoptionRequest.find({
      status: "Volunteer Approved",
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

// Volunteer Recommendation
export const volunteerApprove = async (req, res) => {
  try {
    const request = await AdoptionRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.status = "Volunteer Approved";

    await request.save();

    res.status(200).json({
      message: "Recommendation sent to admin",
      request,
    });
  } catch (err) {
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

    request.status = "Volunteer Rejected";

    await request.save();

    res.status(200).json({
      message: "Request rejected by volunteer",
      request,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Admin Final Approval
export const approveRequest = async (req, res) => {
  try {
    const request = await AdoptionRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    await Adoption.create({
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
      image:
        request.image ||
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800",
      status: "Available",
      approvalStatus:"Approved",
      
      rescuedBy: request.submittedBy,
    });

    request.status = "Admin Approved";

    await request.save();

    res.status(200).json({
      message: "Request approved successfully.",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

// Admin Reject
export const rejectRequest = async (req, res) => {
  try {
    const request = await AdoptionRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found",
      });
    }

    request.status = "Admin Rejected";

    await request.save();

    res.status(200).json({
      message: "Request rejected successfully.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};