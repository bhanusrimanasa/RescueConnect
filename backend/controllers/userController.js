import User from "../models/User.js";

export const getVolunteers = async (req, res) => {
  try {
    const volunteers = await User.find({
      role: "volunteer",
    }).select("_id name email");

    res.status(200).json(volunteers);
  } catch (error) {
    console.error("GET VOLUNTEERS ERROR:", error);

    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const { name, phone, address, profilePhoto } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name || user.name;
    user.phone = phone ?? user.phone;
    user.address = address ?? user.address;

    if (profilePhoto !== undefined) {
      user.profilePhoto = profilePhoto;
    }

    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      address: user.address,
      profilePhoto: user.profilePhoto,
    });

  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};