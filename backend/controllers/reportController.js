import AnimalReport from "../models/AnimalReport.js";
import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import Volunteer from "../models/Volunteer.js";
import streamifier from "streamifier";
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "rescueconnect/reports",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};
export const createReport = async (req, res) => {
  try {
    let imageUrls = [];

    if (req.files && req.files.length > 0) {
      imageUrls = await Promise.all(
        req.files.map((file) =>
          uploadToCloudinary(file.buffer)
        )
      );
    }

    const report = await AnimalReport.create({
      ...req.body,

      reportedBy: req.user._id,

      images: imageUrls,

      status: "Pending",

      statusHistory: [
        {
          status: "Pending",
          note: "Report submitted",
          updatedBy: req.user._id,
        },
      ],
    });

    res.status(201).json({
      message: "Report created successfully",
      report,
    });
  } catch (error) {
    console.error("CREATE REPORT ERROR:", error);

    res.status(400).json({
      message: error.message,
    });
  }
};
export const assignVolunteer = async (req, res) => {
  try {
    const { volunteerId } = req.body;

    const report = await AnimalReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    const volunteer = await Volunteer.findById(volunteerId);

    if (!volunteer) {
      return res.status(400).json({
        message: "Invalid volunteer",
      });
    }

    if (volunteer.status !== "Approved") {
      return res.status(400).json({
        message: "Volunteer is not approved",
      });
    }

    if (!volunteer.isAvailable) {
      return res.status(400).json({
        message: "Volunteer is not available",
      });
    }

    // Store the actual User ID in AnimalReport
    report.assignedVolunteer = volunteer.user;
    report.assignedBy = req.user._id;
    report.assignedAt = new Date();
    report.status = "Assigned";

    report.statusHistory.push({
      status: "Assigned",
      note: "Volunteer assigned",
      updatedBy: req.user._id,
    });

    // Volunteer is now busy
    volunteer.isAvailable = false;

    await report.save();
    await volunteer.save();

    res.status(200).json({
      message: "Volunteer assigned successfully",
      report,
    });

  } catch (error) {
    console.error("ASSIGN VOLUNTEER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
export const getAssignedReports = async (req, res) => {
  try {
    const reports = await AnimalReport.find({
      assignedVolunteer: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getCompletedReports = async (req, res) => {
  try {
    const reports = await AnimalReport.find({
      rescuedBy: req.user._id,
      rescuedAt: { $ne: null },
    }).sort({ rescuedAt: -1 });

    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const acceptReport = async (req, res) => {
  try {
    const report = await AnimalReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    if (
      report.assignedVolunteer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You are not assigned to this report",
      });
    }

    report.status = "In Progress";
    report.statusHistory.push({
  status: "In Progress",
  note: "Volunteer accepted the mission",
  updatedBy: req.user._id,
});
    await report.save();

    res.status(200).json({
      message: "Mission accepted successfully.",
      report,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const markRescued = async (req, res) => {
  try {
    const report = await AnimalReport.findById(req.params.id)
  .populate("reportedBy", "name")
  .populate("assignedVolunteer", "name")
  .populate("statusHistory.updatedBy", "name");

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    if (
      report.assignedVolunteer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You are not assigned to this report",
      });
    }

    report.status = "Rescued";
       report.rescuedAt = new Date();
    report.rescuedBy = req.user._id;

    report.statusHistory.push({
  status: "Rescued",
  note: "Animal rescued",
  updatedBy: req.user._id,
});

    await report.save();

    res.status(200).json({
      message: "Animal marked as rescued.",
      report,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const updateProgress = async (req, res) => {
  try {
    const { progress, note } = req.body;

    const report = await AnimalReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    // Only the assigned volunteer can update progress
    if (
      report.assignedVolunteer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    report.statusHistory.push({
      status: progress,
      note,
      updatedBy: req.user._id,
    });

    // Update main status only for major milestones
    if (progress === "Rescued") {
      report.status = "Rescued";
        report.rescuedAt = new Date();
        report.rescuedBy = req.user._id;
    }

    if (progress === "Case Closed") {
      report.status = "Closed";
    }

    await report.save();

    res.status(200).json({
      message: "Progress updated successfully",
      report,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const rejectReport = async (req, res) => {
  try {
    const report = await AnimalReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    // Only the assigned volunteer can reject the mission
    if (
      !report.assignedVolunteer ||
      report.assignedVolunteer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You are not assigned to this report",
      });
    }

    // Add rejection to timeline
    report.statusHistory.push({
      status: "Volunteer Rejected",
      note: "Volunteer rejected the rescue mission",
      updatedBy: req.user._id,
    });

    // Make the report available for reassignment
    report.assignedVolunteer = null;
    report.assignedBy = null;
    report.assignedAt = null;
    report.status = "Pending";

    // Add a new Pending event
    report.statusHistory.push({
      status: "Pending",
      note: "Waiting for another volunteer to be assigned",
      updatedBy: req.user._id,
    });

    await report.save();

    res.status(200).json({
      message: "Mission rejected. Report returned to pending.",
      report,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteReport = async (req, res) => {
  try {
    const report = await AnimalReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    if (report.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this report",
      });
    }

    await AnimalReport.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Report deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const getAllReports = async (req, res) => {
  try {
    const reports = await AnimalReport.find()
      .populate("reportedBy", "name")
      .populate("assignedVolunteer", "name")
      .sort({ createdAt: -1 });

    const priorityOrder = {
      Critical: 1,
      High: 2,
      Medium: 3,
      Low: 4,
    };

    reports.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );

    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const getReportById = async (req, res) => {
  try {
    const report = await AnimalReport.findById(req.params.id)
      .populate("reportedBy", "name")
      .populate("assignedVolunteer", "_id name role")
      .populate("statusHistory.updatedBy", "name");

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const updateReport = async (req, res) => {
  try {
    const report = await AnimalReport.findById(req.params.id);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    if (report.reportedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to edit this report",
      });
    }

    const updatedReport = await AnimalReport.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedReport);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const getMyReports = async (req, res) => {
  try {
    const reports = await AnimalReport.find({
      reportedBy: req.user._id,
    })
      .populate("assignedVolunteer", "name")
      .populate("statusHistory.updatedBy", "name")
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};