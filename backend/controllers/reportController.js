import AnimalReport from "../models/AnimalReport.js";
import User from "../models/User.js";
export const createReport=async(req,res)=>{
    try{
        const report = await AnimalReport.create({
        ...req.body,
        reportedBy: req.user._id,
          statusHistory: [
    {
      status: "Pending",
      note: "Report submitted",
      updatedBy: req.user._id,
    },
  ],
        });
        res.status(200).json({
            message:"Report created successfully",
            report
        });
    }
    catch(err){
        res.status(400).json({
            message:err.message
        });
    }
};
export const getAllReports=async(req,res)=>{
    try{
        const reports=await AnimalReport.find();
        res.status(200).json(reports);
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
export const getReportById=async(req,res)=>{
    try{
       const report = await AnimalReport.findById(req.params.id)
  .populate("reportedBy", "name")
  .populate("assignedVolunteer", "_id name role")
  .populate("statusHistory.updatedBy", "name");
        if(!report){
            return res.status(404).json({
                message:"Report not found"
            });
        }
        res.json(report);
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
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
export const getMyReports = async (req, res) => {
  try {
    const reports = await AnimalReport.find({
      reportedBy: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({
      message: err.message,
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

    const volunteer = await User.findById(volunteerId);

    if (!volunteer || volunteer.role !== "volunteer") {
      return res.status(400).json({
        message: "Invalid volunteer",
      });
    }

    report.assignedVolunteer = volunteerId;
    report.assignedBy = req.user._id;
    report.assignedAt = new Date();
    report.status = "Assigned";
    report.statusHistory.push({
  status: "Assigned",
  note: "Volunteer assigned",
  updatedBy: req.user._id,
});
    await report.save();

    res.status(200).json({
      message: "Volunteer assigned successfully",
      report,
    });

  } catch (error) {
  console.error(error);

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