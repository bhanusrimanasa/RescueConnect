import Volunteer from "../models/Volunteer.js";
import User from "../models/User.js";
import AnimalReport from "../models/AnimalReport.js";

export const registerVolunteer = async (req, res) => {
  try {
    const {
      phone,
      emergencyContact,
      city,
      availability,
      hasVehicle,
      experience,
      volunteerReason,
    } = req.body;

    console.log("Logged in user ID:", req.user._id);
    console.log("Logged in email:", req.user.email);

    const existingVolunteer = await Volunteer.findOne({
      user: req.user._id,
    });

    if (existingVolunteer) {
      return res.status(400).json({
        message: "Already registered as volunteer",
      });
    }

    const volunteer = await Volunteer.create({
      user: req.user._id,
      phone,
      emergencyContact,
      city,
      availability,
      hasVehicle,
      experience,
      volunteerReason,
      status: "Pending", // Forces the application to wait for admin review
    });

    res.status(201).json({
      message: "Volunteer application submitted successfully, pending admin review.",
      volunteer,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateVolunteerLocation = async (req, res) => {
  try {
    const { latitude, longitude, isAvailable } = req.body;

    if (
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({
        message: "Latitude and longitude are required",
      });
    }

    const volunteer = await Volunteer.findOneAndUpdate(
      { user: req.user._id },
      {
        latitude: Number(latitude),
        longitude: Number(longitude),
        isAvailable: isAvailable ?? true,
      },
      { new: true }
    );

    if (!volunteer) {
      return res.status(404).json({
        message: "Volunteer profile not found",
      });
    }

    res.status(200).json({
      message: "Volunteer location updated",
      volunteer,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getNearbyVolunteers = async (req, res) => {
  try {
    const { reportId } = req.params;

    const report = await AnimalReport.findById(reportId);

    if (!report) {
      return res.status(404).json({
        message: "Report not found",
      });
    }

    if (
      report.latitude == null ||
      report.longitude == null
    ) {
      return res.status(400).json({
        message: "Report does not have GPS coordinates",
      });
    }

    const volunteers = await Volunteer.find({
      status: "Approved",
      isAvailable: true,
      latitude: { $ne: null },
      longitude: { $ne: null },
    }).populate("user", "name email");

    const calculateDistance = (
      lat1,
      lon1,
      lat2,
      lon2
    ) => {
      const R = 6371;

      const dLat =
        ((lat2 - lat1) * Math.PI) / 180;

      const dLon =
        ((lon2 - lon1) * Math.PI) / 180;

      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) ** 2;

      const c =
        2 * Math.atan2(
          Math.sqrt(a),
          Math.sqrt(1 - a)
        );

      return R * c;
    };

    const nearbyVolunteers = volunteers
      .map((volunteer) => {
        const distance = calculateDistance(
          report.latitude,
          report.longitude,
          volunteer.latitude,
          volunteer.longitude
        );

        return {
          volunteerId: volunteer._id,
          userId: volunteer.user._id,
          name: volunteer.user.name,
          email: volunteer.user.email,
          latitude: volunteer.latitude,
          longitude: volunteer.longitude,
          distance: Number(distance.toFixed(2)),
        };
      })
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json(nearbyVolunteers);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const updateVolunteerStatus = async (req, res) => {
  try {
    const { volunteerId } = req.params;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value. Must be 'Approved' or 'Rejected'." });
    }

    const volunteer = await Volunteer.findById(volunteerId).populate("user");

    if (!volunteer) {
      return res.status(404).json({ message: "Volunteer application not found." });
    }

    volunteer.status = status;
    await volunteer.save();

    if (status === "Approved") {
      await User.findByIdAndUpdate(volunteer.user._id, { role: "volunteer" });
    } else if (status === "Rejected") {
      await User.findByIdAndUpdate(volunteer.user._id, { role: "user" });
    }

    res.status(200).json({
      message: `Volunteer application has been ${status.toLowerCase()} successfully.`,
      volunteer,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().populate("user", "name email");
    res.status(200).json(volunteers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};