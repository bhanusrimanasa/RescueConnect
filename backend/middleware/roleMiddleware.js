export const authorize = (...roles) => {
  return (req, res, next) => {
    console.log("Logged in role:", req.user.role);
    console.log("Allowed roles:", roles);

    if (!req.user) {
      return res.status(401).json({
        message: "Please login first.",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "You are not authorized to perform this action.",
      });
    }

    next();
  };
};