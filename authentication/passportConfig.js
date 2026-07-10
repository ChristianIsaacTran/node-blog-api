const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcryptjs");
const db = require("../models/dbQuery");
const jwt = require("jsonwebtoken");

// login local strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.findUser(username);

      //   user exists check
      if (!user) {
        return done(null, false);
      }

      const passComparedResult = await bcrypt.compare(password, user.password);

      //   password entered matches password from db check
      if (!passComparedResult) {
        return done(null, false);
      }

      // user is authenticated. Send user through done()
      return done(null, user);
    } catch (error) {
      // done error case
      return done(error);
    }
  }),
);

// jwt token verification strategy

module.exports = { passport };
