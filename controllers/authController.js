const User = require("../models/User");
const StatusCodes = require("http-status-codes");
const { createJWT } = require("../utils/index");

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
  const token = createJWT({ payload: tokenPayload });
  /*
  ->now set the token in http cookie
  ->This is because, we generally should not send the token in the response as they could be accessed by attackers
  ->Instead of sending the jwt token inside the response.json(), we send it as a cookie(in the res.cookie()
  ->Now If I send a request from the client, I will get the token inside of the cookie and not in the response
  ->With every subsequent requests, you will get the cookie and hence would be able to access the token
  */ 
  res.cookie("myToken", token, {
    httpOnly: true,
    maxAge: 360000, //1hr
  });
  res.status(StatusCodes.OK).json({ user: tokenPayload});
  // So, Finally, we can say that when the user registers, a token would be created and sent as a response
};

const login = (req, res, next) => {
  res.send("Login User");
};
const logout = (req, res, next) => {
  // console.log(req.cookies);    you can access the cookie from any request in the same domain
  res.send("Logout User");
};


module.exports = {
  register,
  login,
  logout,
};
