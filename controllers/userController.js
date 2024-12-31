const { login } = require("./authController");
const User = require("../models/User");
const StatusCodes = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require("../errors");
const {
  generateTokenPayload,
  attachJWTtoCookie,
  checkPermission,
} = require("../utils");

const getAllUsers = async (req, res, next) => {
  //console.log(req.user);  //you can access the user once you have done the authentication

  //only allowed by the admin
  const users = await User.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res, next) => {
  /*
    ->This is only a feature that should only be accessed by special users. For that you 
    need to add a checking function
    */

  const user = await User.findOne({ _id: req.params.id }).select("-password");
  if (!user) {
    throw new NotFoundError(`User Not Found wwith the id: ${req.params.id}`);
  }
  /*
->If I get the user, I need to check if I am really allowed to access the user data or not
->You can only access the data as an admin 
->Or you can only get the data of yourself
*/
  checkPermission(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
};

const getCurrentUser = (req, res, next) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new BadRequestError("Please provide both the name and email fields");
  }
  //   console.log(req.user.id);
  /*
        ->Its not only enough to update the database. You would also need to update the cookie 
    */
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user.id },
    { name, email },
    { new: true, runValidators: true }
  );
  const tokenPayload = generateTokenPayload(updatedUser);
  console.log(updatedUser);
  console.log(tokenPayload);

  attachJWTtoCookie({ res, tokenPayload }); //this would update the jwt token also

  res.status(StatusCodes.OK).json({ user: tokenPayload });
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
