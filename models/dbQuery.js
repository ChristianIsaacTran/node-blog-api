const { prisma } = require("../prisma/prismaClient");
const bcrypt = require("bcryptjs");

const findUser = async () => {};

// creates and adds a new user with username and hashed password to db
const createUser = async (username, password) => {

  const saltAmount = parseInt(process.env.PASS_SALT);

  const hashedPassword = await bcrypt.hash(password, saltAmount); //hash the password with salt amount from .env

  await prisma.user.create({
    data: {
        username,
        password: hashedPassword
    },
  });
};

module.exports = { createUser, findUser };
