// reads all users and sends the users in a json
const readAllUsers = async (req, res) => {
  res.json({
    testUser: "on readAllUsers",
  });
};

// reads a single user based on userId and sends back a json
const readUser = async (req, res) => {
  res.json({
    testUser: "on readUser",
  });
};

// creates a user and inserts it into the database. Sends back a json to confirm
const createUser = async (req, res) => {
  res.json({
    testUser: "on createUser",
  });
};

// updates user based on userId and sends back json to confirm
const updateUser = async (req, res) => {
  res.json({
    testUser: "on updateUser",
  });
};

// deletes the current signed in user. Sends back a json to confirm
const deleteUser = async (req, res) => {
  res.json({
    testUser: "on deleteUser",
  });
};

module.exports = { readAllUsers, readUser, createUser, updateUser, deleteUser };
