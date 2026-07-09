const {Router} = require("express");
const authController = require("../controllers/authController");

const authRouter = Router();

// login route
authRouter.post("/", authController.loginUser);

// logout route
authRouter.get("/", authController.logoutUser);

module.exports = { authRouter };
