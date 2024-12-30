const { login } = require("./authController");
const User = require("../models/User");
const StatusCodes = require("http-status-codes");
const {NotFoundError}=require("../errors");

const getAllUsers = async (req, res, next) => {
    //console.log(req.user);  //you can access the user once you have done the authentication
    
  //only allowed by the admin
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if(!user){
    throw new NotFoundError(`User Not Found wwith the id: ${req.params.id}`);
  }
  res.status(StatusCodes.OK).json({ user });
};

const getCurrentUser = (req, res, next) => {
  res.status(StatusCodes.OK).json({user:req.user});
};


const updateUser = (req, res, next) => {
  res.send("Update User");
};

const updateUserPassword = (req, res, next) => {
  res.send("Update User Password");
};

module.exports = {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updateUser,
  updateUserPassword,
};
