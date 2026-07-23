import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { name, email, password } = req.body;

    console.log("PASSWORD:", password);

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
     user:{
      id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
     },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
   const {email,password}=req.body;
   const user=await User.findOne({email});
   if(!user){
    return res.status(401).json({
      message:"Invalid user or password"});
   }
   const isMatch=await bcrypt.compare(password,user.password);
   if(!isMatch){
    return res.status(401).json({
      message:"Invalid user or password"
    });
   }
   const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.cookie("token", token, {
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

res.status(200).json({
  message: "Login successful",
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  },
});
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const getMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "lax",
  });

  res.status(200).json({
    message: "Logged out successfully",
  });
};
export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = name || user.name;

    const updatedUser = await user.save();

    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
export const becomeVolunteer = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role === "volunteer") {
      return res.status(400).json({
        message: "You are already a volunteer",
      });
    }

    user.role = "volunteer";

    await user.save();

    res.status(200).json({
      message: "Congratulations! You are now a volunteer.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};