const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcryptjs");
const db  = require("../models/dbQuery");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.findUser(username);

      //   user exists check
      if (!user) {
        return done(null, false, {
          message: "User not found",
        });
      }

      const passComparedResult = await bcrypt.compare(password, user.password);

      //   password entered matches password from db check
      if (!passComparedResult) {
        return done(null, false, {
          message: "Password does not match",
        });
      }

      // user is authenticated. Send user through done()
      return done(null, user);

    } catch (error) {
    // done error case
      return done(error);
    }
  }),
);

module.exports = { passport };
