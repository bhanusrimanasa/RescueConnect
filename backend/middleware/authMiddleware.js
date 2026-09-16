import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    console.log("🔐 PROTECT MIDDLEWARE HIT");

    let token = req.cookies?.token;

    // If cookie is not available, check Authorization header
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("🔑 Token exists:", !!token);

    if (!token) {
      return res.status(401).json({
        message: "Not authorized. Please login.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("🔑 Decoded:", decoded);

    const user = await User.findById(decoded.id).select("-password");

    console.log("👤 DB User:", user);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    console.log("✅ AUTH USER:", req.user);
    console.log("✅ USER ROLE:", req.user.role);

    next();

  } catch (err) {
    console.error("❌ AUTH ERROR:", err);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Access denied. Admin privileges required.",
    });
  }
};