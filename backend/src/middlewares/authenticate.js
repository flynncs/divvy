const { verifyToken } = require("../services/authService");
const { findOrCreateUser } = require("../services/userService");
const { User } = require("../models");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("authHeader", authHeader);
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = req.headers.authorization.split(" ")[1];
  console.log("Token", token);

  if (!token) {
    console.log("No token found");
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    console.log("Trying to verify token");
    const decodedToken = await verifyToken(token);
    console.log("A Decoded Token", decodedToken);
    const user = await findOrCreateUser(decodedToken);
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authenticate;
