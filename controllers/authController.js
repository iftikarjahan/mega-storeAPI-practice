const User = require("../models/User");
const StatusCodes = require("http-status-codes");
const { use } = require("../routes/authRoutes");

const register = async (req, res, next) => {
  const isFirstDocument = (await User.estimatedDocumentCount()) == 0;
  const role = isFirstDocument ? "admin" : "user";
  const createdUser = await User.create({ ...req.body, role });
  res.status(StatusCodes.OK).json({ user: createdUser });
};
const login = (req, res, next) => {
  res.send("Login User");
};
const logout = (req, res, next) => {
  res.send("Logout User");
};

module.exports = {
  register,
  login,
  logout,
};
