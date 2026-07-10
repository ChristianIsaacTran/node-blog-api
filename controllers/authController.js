const db = require("../models/dbQuery");
const { passport } = require("../authentication/passportConfig");
const jwt = require("jsonwebtoken");

// logs the user in after authentication
const loginUser = [
  passport.authenticate("local", {
    session: false, //since I am using JWT, sessions are not needed
  }),
  async (req, res) => {
    // if passport.authenticate succesfully signs in user, req.user should be populated. Make a json web token (JWT) and send token to the user
    const jwtSecretKey = process.env.JWT_SK;

    jwt.sign(
      {
        userId: req.user.id,
        username: req.user.username,
      },
      jwtSecretKey,
      (error, token) => {
        if (error) {
          console.log("JWT .sign() failed.");

          return res.status(401).json({
            error: "unauthorized",
          });
        }

        console.log(
          "Successful JWT token created. Sending token to client in JSON...",
        );

        // within the callback itself, return the token in JSON
        return res.json({ jwtToken: token });
      },
    );
  },
];

// logs the user out
const logoutUser = async (req, res) => {
  console.log(req.body);
  res.send("logout attempt");
};

// tests jwt strategy by using passport.authenticate("jwt", {sessions: false}). Sends a "success!" json if authorization went through
// MAKE SURE TO SEND GENERATED TOKEN IN REQUEST HEADER UNDER AUTHORIZATION WHEN TESTING
const testJwtStrat = [
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      authorizationStatus: "success!",
    });
  },
];

module.exports = { loginUser, logoutUser, testJwtStrat};
