const db = require("../models/dbQuery");

// reads all comments in database and sends back a json
const readAllComments = async (req, res) => {
    res.json({
        testComment: "on readAllComments"
    });
};

// reads a single comment based on commentId and sends back a json
const readComment = async (req, res) => {
    res.json({
        testComment: "on readComment"
    });
};

// creates a comment to input into database
const createComment = async (req, res) => {
    res.json({
        testComment: "on createComment"
    });
};

// updates a comment based on commentId and sends back a json to confirm changes
const updateComment = async (req, res) => {
    res.json({
        testComment: "on updateComment"
    });
};


// delete a comment based on commentId and sends back a json to confirm changes
const deleteComment = async (req, res) => {
    res.json({
        testComment: "on deleteComment"
    });
};

module.exports = {
  readAllComments,
  readComment,
  createComment,
  updateComment,
  deleteComment,
};
