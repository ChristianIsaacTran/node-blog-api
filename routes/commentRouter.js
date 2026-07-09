const { Router } = require("express");
const commentController = require("../controllers/commentController");

const commentRouter = Router();

// READ routes
commentRouter.get("/", commentController.readAllComments); //read ALL users
commentRouter.get("/:commentId", commentController.readComment); //read specific user through user Id

// CREATE routes
commentRouter.post("/", commentController.createComment);

// UPDATE routes
commentRouter.put("/:commentId", commentController.updateComment);

// DELETE routes
commentRouter.delete("/:commentId", commentController.deleteComment);

module.exports = {commentRouter};
