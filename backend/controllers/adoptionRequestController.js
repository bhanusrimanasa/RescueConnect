import AdoptionRequest from "../models/AdoptionRequest.js";
import Adoption from "../models/Adoption.js";

export const createAdoptionRequest = async (req, res) => {
  try {
    const request = await AdoptionRequest.create({
      ...req.body,
      submittedBy: req.user._id,
    });
      console.log(req.body.image);
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

export const getAllRequests = async (req, res) => {
  try {
    const requests = await AdoptionRequest.find({status: "Pending",})
      .populate("submittedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (err) {
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

      rescuedBy: req.user._id,
    });

    request.status = "Approved";

    await request.save();

    res.status(200).json({
      message: "Request approved successfully.",
    });
  } catch (err) {
     console.error("APPROVE ERROR:", err);
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

    request.status = "Rejected";

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