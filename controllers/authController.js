const register = (req, res, next) => {
  res.send("Register User");
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
