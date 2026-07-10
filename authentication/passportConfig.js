const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
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

//options for extracting jwt token from requests and/or options for verification

/*
    - jwtFromRequest: is a required option that should be set to one of the 
    "token extractors" from ExtractJwt. I set it to extract the jwt from the 
    authorization header with the scheme "bearer" and then the token

    - secretOrKey: is the required option that uses the secret key to verify the token
*/
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SK,
};

// jwt token verification strategy
passport.use(
  new JwtStrategy(options, async (payload, done) => {
    try {
      const searchUserName = payload.username; //extracted from jwtFromRequest option. In this case, from the authorization header next to "bearer" scheme

      const user = await db.findUser(searchUserName);

      // If user is not found, send done(null, false)
      if (!user) {
        console.log("User not found. Not authorized");

        return done(null, false);
      }

      console.log("Successful User found on restricted route. User logged in and authorized.");

      // successful user find
      return done(null, user);
    } catch (error) {
      // done error case
      return done(error);
    }
  }),
);

module.exports = { passport };
