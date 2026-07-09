const readAllPosts = async (req, res) => {
  res.json({
    testPost: "on readAllPosts",
  });
};

const readPost = async (req, res) => {
  res.json({
    testPost: "on readPost",
  });
};

const createPost = async (req, res) => {
  res.json({
    testPost: "on createPost",
  });
};

const updatePost = async (req, res) => {
  res.json({
    testPost: "on updatePost",
  });
};

const deletePost = async (req, res) => {
  res.json({
    testPost: "on deletePost",
  });
};

module.exports = { readAllPosts, readPost, createPost, updatePost, deletePost };
