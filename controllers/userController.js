const db = require("../models/dbQuery");
const { passport } = require("../authentication/passportConfig");

// reads all users and sends the users in a json
const readAllUsers = async (req, res) => {
  const allUsers = await db.findAllUsers();

  res.json({
    ...allUsers,
  });
};

// reads a single user based on userId and sends back a json
const readUser = async (req, res) => {
  const userId = req.params.userId;

  const foundUser = await db.findUserThroughId(userId);

  res.json({
    ...foundUser,
  });
};

// creates a user and inserts it into the database. Sends back a json to confirm
const createUser = async (req, res) => {
  const username = req.body.username;

  const password = req.body.password;

  const createBool = await db.createUser(username, password);

  if (createBool) {
    res.json({
      testUser: "on createUser",
      createdUser: "true",
    });
  } else {
    res.json({
      testUser: "on createUser",
      createdUser: "false",
    });
  }
};

// (JWT) updates user based on userId and sends back json to confirm
const updateUser = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const updatedUserName = req.body.username;

    const searchUserId = req.params.userId;

    const updateResult = await db.updateUserThroughId(
      updatedUserName,
      searchUserId,
    );

    res.json({
      ...updateResult,
    });
  },
];

// deletes the current signed in user. Sends back a json to confirm
const deleteUser = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {

    const currentUserId = req.user.id;

    const deletedUser = await db.deleteUserThroughId();

    res.json({
      testUser: "on deleteUser",
    });
  },
];

module.exports = { readAllUsers, readUser, createUser, updateUser, deleteUser };
