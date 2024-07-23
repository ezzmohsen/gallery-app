const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/jwt");

const generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};

const refreshToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, secretKey, { expiresIn: "6h" });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};

module.exports = { generateToken, refreshToken, verifyToken };
