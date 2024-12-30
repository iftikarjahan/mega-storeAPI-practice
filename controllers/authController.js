const User = require("../models/User");
const StatusCodes = require("http-status-codes");
const { attachJWTtoCookie,generateTokenPayload } = require("../utils/index");
const { UnauthenticatedError } = require("../errors");

const register = async (req, res, next) => {
  const isFirstDocument = (await User.estimatedDocumentCount()) == 0;
  const role = isFirstDocument ? "admin" : "user";
  const createdUser = await User.create({ ...req.body, role });
  const tokenPayload=generateTokenPayload(createdUser);
  // const tokenPayload = {
  //   // the data that needs to be circulated around
  //   name: createdUser.name,
  //   role: createdUser.role,
  //   id: createdUser._id,
  // };
  attachJWTtoCookie({ res, tokenPayload });
  res.status(StatusCodes.OK).json({ user: tokenPayload });
  // So, Finally, we can say that when the user registers, a token would be created and sent as a response
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new UnauthenticatedError(
      "Please Provide both the email and password fields"
    );
  }
  // If the user has provided the email and password, now check if the user exists in the db or not
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError(
      "User not found...please login with valid credentials"
    );
  }
  // If I get the user, then check if the password is correct or not
  const passwordIsCorrect = await user.comparePassword(password);
  if (!passwordIsCorrect) {
    throw new UnauthenticatedError("Please enter the correct password");
  }
  // if passoword is correct, set the token and send the response
  const tokenPayload=generateTokenPayload(user);
  // const tokenPayload = {
  //   // this is the data that would be circulated around the requests
  //   name: user.name,
  //   role: user.role,
  //   id: user._id,
  // };
  attachJWTtoCookie({ res, tokenPayload });
  res.status(StatusCodes.OK).json({ user: tokenPayload });
};
const logout = (req, res, next) => {
  // console.log(req.signedCookies); //you can access the cookie from any request in the same domain
  res.clearCookie("myToken", {
    httpOnly: true,
    expiresIn: 360000, //1hr
    signed: true,
  });
  res.status(StatusCodes.OK).json({msg:"User Logged Out"});
};

module.exports = {
  register,
  login,
  logout,
};
