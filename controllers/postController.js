const db = require("../models/dbQuery");
const { passport } = require("../authentication/passportConfig");

// read all posts and sends back a json
const readAllPosts = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const allPosts = await db.readAllPosts();

    res.json({
      ...allPosts,
    });
  },
];

// reads a single post based on postId and sends back a json
const readPost = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const postId = req.params.postId;

    const post = await db.readPost(postId);

    res.json({
      ...post,
    });
  },
];

// creates a new post and inserts it into the database. Sends back a json to confirm
const createPost = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const newPost = await db.createPost(req);

    res.json({
      ...newPost,
    });
  },
];

// updates a new post based on postId and sends back json to confirm
const updatePost = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.json({
      testPost: "on updatePost",
    });
  },
];

// delete a new post based on postId and sends back json to confirm
const deletePost = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.json({
      testPost: "on deletePost",
    });
  },
];

module.exports = { readAllPosts, readPost, createPost, updatePost, deletePost };
