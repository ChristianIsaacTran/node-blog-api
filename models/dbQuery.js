const { prisma } = require("../prisma/prismaClient");
const bcrypt = require("bcryptjs");

// finds user based on username and returns user. Usernames will always be unique
const findUser = async (username) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    return user;
  } catch (error) {
    return console.log(error);
  }
};

// creates and adds a new user with username and hashed password to db. Returns a bool for create success or fail.
const createUser = async (username, password) => {
  try {
    const saltAmount = parseInt(process.env.PASS_SALT);

    const hashedPassword = await bcrypt.hash(password, saltAmount); //hash the password with salt amount from .env

    const foundUser = await findUser(username);

    if (foundUser) {
      console.log("Username/user already exists");

      return false;
    } else {
      await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      return true;
    }
  } catch (error) {
    return console.log(error);
  }
};

// returns all users found in the database
const findAllUsers = async () => {
  try {
    const allUsers = await prisma.user.findMany({});

    return allUsers;
  } catch (error) {
    return console.log(error);
  }
};

// finds and returns a user based on userId, or sends back an error message
const findUserThroughId = async (userId) => {
  try {
    // req.params.userId is a string, so convert to integer for prisma where filter
    const userIdInt = parseInt(userId);

    const user = await prisma.user.findFirst({
      where: {
        id: userIdInt,
      },
    });

    if (user) {
      return user;
    } else {
      return {
        error: "User not found.",
      };
    }
  } catch (error) {
    return console.log(error);
  }
};

module.exports = { createUser, findUser, findAllUsers, findUserThroughId };
