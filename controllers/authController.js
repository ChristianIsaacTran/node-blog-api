const db = require("../models/dbQuery");
const {passport} = require("../authentication/passportConfig");

// logs the user in after authentication
const loginUser = passport.authenticate("local", {
  failureMessage: true
});

// logs the user out
const logoutUser = async (req, res) => {
  console.log(req.body);
  res.send("logout attempt");
};

module.exports = { loginUser, logoutUser };
