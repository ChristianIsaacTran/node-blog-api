const db = require("../models/dbQuery");

// read all posts and sends back a json
const readAllPosts = async (req, res) => {
  res.json({
    testPost: "on readAllPosts",
  });
};

// reads a single post based on postId and sends back a json
const readPost = async (req, res) => {
  res.json({
    testPost: "on readPost",
  });
};

// creates a new post and inserts it into the database. Sends back a json to confirm
const createPost = async (req, res) => {
  res.json({
    testPost: "on createPost",
  });
};

// updates a new post based on postId and sends back json to confirm
const updatePost = async (req, res) => {
  res.json({
    testPost: "on updatePost",
  });
};

// delete a new post based on postId and sends back json to confirm
const deletePost = async (req, res) => {
  res.json({
    testPost: "on deletePost",
  });
};

module.exports = { readAllPosts, readPost, createPost, updatePost, deletePost };
