const { login } = require("./authController");

const getAllUsers = (req, res, next) => {
  //only allowed by the admin
  res.send("Get All Users");
};

const getSingleUser = (req, res, next) => {    
  res.send("Get Single User");
};

const getCurrentUser = (req, res, next) => {
  res.send("Get Current User");
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
