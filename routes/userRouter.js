const { Router } = require("express");
const userController = require("../controllers/userController");

const userRouter = Router();

// READ routes
userRouter.get("/", userController.readAllUsers); //read ALL users
userRouter.get("/:userId", userController.readUser); //read specific user through user Id

// CREATE routes
userRouter.post("/", userController.createUser);

// UPDATE routes
userRouter.put("/:userId", userController.updateUser);

// DELETE routes
userRouter.delete("/", userController.deleteUser);

module.exports = { userRouter };
