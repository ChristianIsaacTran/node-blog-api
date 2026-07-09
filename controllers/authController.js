const db = require("../models/dbQuery");

// logs the user in after authentication
const loginUser = async (req, res) => {
  console.log(req.body);
  res.send("login attempt");
};

// logs the user out
const logoutUser = async (req, res) => {
  console.log(req.body);
  res.send("logout attempt");
};

module.exports = { loginUser, logoutUser };
