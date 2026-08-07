import AdoptionApplication from "../models/adoptionApplicationModel.js";
import Adoption from "../models/Adoption.js";
export const createApplication = async (req, res) => {
  try {
    const application = await AdoptionApplication.create({
      ...req.body,
      fullName: req.user.name,
      applicant: req.user._id,
      animal: req.params.animalId,
    });

    res.status(201).json({
      message: "Application submitted successfully.",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await AdoptionApplication.find()
      .populate("animal", "name breed image")
      .populate("applicant", "name email");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const volunteerApprove = async (req, res) => {
  try {
    const application = await AdoptionApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    application.status = "Volunteer Approved";

    await application.save();

    res.status(200).json({
      message: "Volunteer recommendation recorded",
      application,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const volunteerReject = async (req, res) => {
  try {
    const application = await AdoptionApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    application.status = "Volunteer Rejected";

    await application.save();

    res.status(200).json({
      message: "Volunteer recommendation recorded",
      application,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const approveApplication = async (req, res) => {
  try {
    const application = await AdoptionApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    application.status = "Approved";
    await application.save();

    // Mark the animal as adopted
    await Adoption.findByIdAndUpdate(
      application.animal,
      {
        status: "Adopted",
      }
    );
    await AdoptionApplication.updateMany(
      {
        animal: application.animal,
        _id: { $ne: application._id },
        status: {
          $in: ["Pending", "Volunteer Approved"],
        },
      },
      {
        status: "Rejected",
      }
    );
    res.status(200).json({
      message: "Application approved successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const rejectApplication = async (req, res) => {
  try {
    const application = await AdoptionApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    application.status = "Rejected";

    await application.save();

    res.status(200).json({
      message: "Application rejected.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getMyApplications = async (req, res) => {
  try {
    const applications = await AdoptionApplication.find({
      applicant: req.user._id,
    })
      .populate("animal", "name image status");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getVolunteerApprovedApplications = async (req, res) => {
  try {
    const applications = await AdoptionApplication.find({
      status: "Volunteer Approved",
    })
      .populate("animal", "name animalType")
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};