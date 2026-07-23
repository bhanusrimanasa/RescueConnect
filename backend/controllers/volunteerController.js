import Volunteer from "../models/Volunteer.js";
import User from "../models/User.js";

export const registerVolunteer = async (req, res) => {
  try {
    const {
      phone,
      city,
      availability,
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
      city,
      availability,
      volunteerReason,
    });

    await User.findByIdAndUpdate(req.user._id, {
      role: "volunteer",
    });
    const updatedUser = await User.findById(req.user._id);
console.log("Updated role:", updatedUser.role);
    res.status(201).json({
      message: "Volunteer registration successful",
      volunteer,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};