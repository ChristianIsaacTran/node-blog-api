const readAllUsers = async (req, res) => {
  res.json({
    testUser: "on readAllUsers",
  });
};

const readUser = async (req, res) => {
  res.json({
    testUser: "on readUser",
  });
};

const createUser = async (req, res) => {
  res.json({
    testUser: "on createUser",
  });
};

const updateUser = async (req, res) => {
  res.json({
    testUser: "on updateUser",
  });
};

const deleteUser = async (req, res) => {
  res.json({
    testUser: "on deleteUser",
  });
};

module.exports = { readAllUsers, readUser, createUser, updateUser, deleteUser };
