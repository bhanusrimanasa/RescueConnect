import User from "../models/User.js";

export const getVolunteers = async (req, res) => {
  try {
    const volunteers = await User.find({
      role: "volunteer",
    }).select("_id name email");

    res.status(200).json(volunteers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};