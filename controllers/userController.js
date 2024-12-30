const { login } = require("./authController");
const User = require("../models/User");
const StatusCodes = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");

const getAllUsers = async (req, res, next) => {
  //console.log(req.user);  //you can access the user once you have done the authentication

  //only allowed by the admin
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new NotFoundError(`User Not Found wwith the id: ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const getCurrentUser = (req, res, next) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = (req, res, next) => {
  res.send("Update User");
};

const updateUserPassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please provide both the old and new password");
  }
  /*
->I dont need to check if the user exist in the db or not because the user is already authenticated
*/
  const user = await User.findOne({ _id: req.user.id });
  /*
->I just need to check if the old password is correct or not
*/
  const passwordIsCorrect = await user.comparePassword(oldPassword);
  if (!passwordIsCorrect) {
    throw new UnauthenticatedError(
      "Invalid Passowrd....Please provide the correct password"
    );
  }
  user.password = newPassword;
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Password Updated Successfully!" });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updateUser,
  updateUserPassword,
};
