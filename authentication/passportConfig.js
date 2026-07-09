const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { db } = require("../models/dbQuery");

passport.use(new LocalStrategy(async (username, password, done) => {

    // find user in db, pass to done user or error

}));

module.exports = { passport };
