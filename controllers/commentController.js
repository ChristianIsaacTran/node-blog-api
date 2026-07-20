const db = require("../models/dbQuery");
const { passport } = require("../authentication/passportConfig");

// reads all comments in database and sends back a json
const readAllComments = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {

    const allComments = await db.readAllComments();

    res.json({
        ...allComments
    });
  },
];

// reads a single comment based on commentId and sends back a json
const readComment = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.json({
      testComment: "on readComment",
    });
  },
];

// creates a comment to input into database
const createComment = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {

    const newComment = await db.createComment(req);

    res.json({
      ...newComment
    });
  },
];

// updates a comment based on commentId and sends back a json to confirm changes
const updateComment = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.json({
      testComment: "on updateComment",
    });
  },
];

// delete a comment based on commentId and sends back a json to confirm changes
const deleteComment = [
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.json({
      testComment: "on deleteComment",
    });
  },
];

module.exports = {
  readAllComments,
  readComment,
  createComment,
  updateComment,
  deleteComment,
};
