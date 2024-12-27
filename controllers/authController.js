const User = require("../models/User");
const StatusCodes = require("http-status-codes");
const { createJWT,attachJWTtoCookie } = require("../utils/index");

const register = async (req, res, next) => {
  const isFirstDocument = (await User.estimatedDocumentCount()) == 0;
  const role = isFirstDocument ? "admin" : "user";
  const createdUser = await User.create({ ...req.body, role });
  const tokenPayload = {
    // the data that needs to be circulated around
    name: createdUser.name,
    role: createdUser.role,
    id: createdUser._id,
  };
  attachJWTtoCookie({res,tokenPayload});
  res.status(StatusCodes.OK).json({ user: tokenPayload});
  // So, Finally, we can say that when the user registers, a token would be created and sent as a response
};

const login = (req, res, next) => {
  res.send("Login User");
};
const logout = (req, res, next) => {
  console.log(req.cookies);    //you can access the cookie from any request in the same domain
  res.send("Logout User");
};


module.exports = {
  register,
  login,
  logout,
};
