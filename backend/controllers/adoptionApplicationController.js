import AdoptionApplication from "../models/adoptionApplicationModel.js";
import Adoption from "../models/Adoption.js";

export const createApplication = async (req, res) => {
  try {
    const animal = await Adoption.findById(req.params.animalId);

    if (!animal) {
      return res.status(404).json({
        message: "Animal not found",
      });
    }

    if (animal.status !== "Available") {
      return res.status(400).json({
        message: "This animal is not currently available for adoption",
      });
    }

    // Prevent duplicate active applications
    const existingApplication = await AdoptionApplication.findOne({
      animal: req.params.animalId,
      applicant: req.user._id,
      status: {
        $in: ["Pending", "Volunteer Approved"],
      },
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You already have an active application for this animal",
      });
    }

    const application = await AdoptionApplication.create({
      ...req.body,
      fullName: req.user.name,
      applicant: req.user._id,
      animal: req.params.animalId,
      status: "Pending",
    });

    res.status(201).json({
      message: "Application submitted successfully.",
      application,
    });
  } catch (error) {
    console.error("CREATE APPLICATION ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await AdoptionApplication.find()
      .populate("animal", "name animalType breed images status")
      .populate("applicant", "name email")
      .populate("volunteerReviewedBy", "name")
      .populate("adminReviewedBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const volunteerApprove = async (req, res) => {
  try {
    const application = await AdoptionApplication.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    if (application.status !== "Pending") {
      return res.status(400).json({
        message: "Only pending applications can be reviewed",
      });
    }

    application.status = "Volunteer Approved";
    application.volunteerReviewedBy = req.user._id;
    application.volunteerReviewedAt = new Date();
    application.rejectionReason = "";

    await application.save();

    res.status(200).json({
      message: "Application approved and sent to admin.",
      application,
    });
  } catch (error) {
    console.error("VOLUNTEER APPROVE APPLICATION ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const volunteerReject = async (req, res) => {
  try {
    const application = await AdoptionApplication.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    if (application.status !== "Pending") {
      return res.status(400).json({
        message: "Only pending applications can be reviewed",
      });
    }

    const { rejectionReason } = req.body;

    application.status = "Volunteer Rejected";
    application.volunteerReviewedBy = req.user._id;
    application.volunteerReviewedAt = new Date();
    application.rejectionReason =
      rejectionReason || "Application rejected by volunteer";

    await application.save();

    res.status(200).json({
      message: "Application rejected by volunteer.",
      application,
    });
  } catch (error) {
    console.error("VOLUNTEER REJECT APPLICATION ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const approveApplication = async (req, res) => {
  try {
    const application = await AdoptionApplication.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    // Admin can approve only after volunteer approval
    if (application.status !== "Volunteer Approved") {
      return res.status(400).json({
        message:
          "Application must be approved by a volunteer first",
      });
    }

    const animal = await Adoption.findById(application.animal);

    if (!animal) {
      return res.status(404).json({
        message: "Animal not found",
      });
    }

    // Prevent adopting an already adopted animal
    if (animal.status !== "Available") {
      return res.status(400).json({
        message: "This animal is no longer available for adoption",
      });
    }

    application.status = "Approved";
    application.adminReviewedBy = req.user._id;
    application.adminReviewedAt = new Date();
    application.rejectionReason = "";

    await application.save();

    // Mark animal as adopted
    animal.status = "Adopted";
    await animal.save();

    // Reject other active applications
    await AdoptionApplication.updateMany(
      {
        animal: application.animal,
        _id: { $ne: application._id },
        status: {
          $in: ["Pending", "Volunteer Approved"],
        },
      },
      {
        $set: {
          status: "Rejected",
          rejectionReason:
            "Another applicant was selected for this animal.",
          adminReviewedBy: req.user._id,
          adminReviewedAt: new Date(),
        },
      }
    );

    res.status(200).json({
      message: "Application approved successfully.",
      application,
    });
  } catch (error) {
    console.error("ADMIN APPROVE APPLICATION ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const rejectApplication = async (req, res) => {
  try {
    const application = await AdoptionApplication.findById(
      req.params.id
    );

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    if (application.status !== "Volunteer Approved") {
      return res.status(400).json({
        message:
          "Only volunteer-approved applications can be rejected by admin",
      });
    }

    const { rejectionReason } = req.body;

    application.status = "Rejected";
    application.adminReviewedBy = req.user._id;
    application.adminReviewedAt = new Date();
    application.rejectionReason =
      rejectionReason || "Application rejected by admin";

    await application.save();

    res.status(200).json({
      message: "Application rejected.",
      application,
    });
  } catch (error) {
    console.error("ADMIN REJECT APPLICATION ERROR:", error);

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
      .populate("animal", "name animalType images status")
      .populate("volunteerReviewedBy", "name")
      .populate("adminReviewedBy", "name")
      .sort({ createdAt: -1 });

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
      .populate(
        "animal",
        "name animalType breed images status"
      )
      .populate("applicant", "name email")
      .populate("volunteerReviewedBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};