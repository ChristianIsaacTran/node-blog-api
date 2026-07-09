const {Router} = require("express");
const postController = require("../controllers/postController");

const postRouter = Router();

// READ routes
postRouter.get("/", postController.readAllPosts); //read ALL users
postRouter.get("/:postId", postController.readPost); //read specific user through user Id

// CREATE routes
postRouter.post("/", postController.createPost);

// UPDATE routes
postRouter.put("/:postId", postController.updatePost);

// DELETE routes
postRouter.delete("/:postId", postController.deletePost);

module.exports = {postRouter};