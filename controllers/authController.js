const User = require("../models/User");
const StatusCodes = require("http-status-codes");
const {createJWT}=require("../utils/index");

const register = async (req, res, next) => {
  const isFirstDocument = (await User.estimatedDocumentCount()) == 0;
  const role = isFirstDocument ? "admin" : "user";
  const createdUser = await User.create({ ...req.body, role });
  const tokenPayload={
    // the data that needs to be circulated around
    name:createdUser.name,
    role:createdUser.role,
    id:createdUser._id
  }
  const token=createJWT({payload:tokenPayload});
  res.status(StatusCodes.OK).json({ user:tokenPayload,token });
  // So, Finally, we can say that when the user registers, a token would be created and sent as a response
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
