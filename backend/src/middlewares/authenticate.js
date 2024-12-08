const { verifyToken } = require("../services/authService");
const { findOrCreateUser } = require("../services/userService");
const { User } = require("../models");

const authenticate = async (req, res, next) => {
  console.log("Authenticating user...");

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = await verifyToken(token);
    const user = await findOrCreateUser(decodedToken);
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authenticate;
