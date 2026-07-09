const {Router} = require("express");
const authController = require("../controllers/authController");

const authRouter = Router();

// login route
authRouter.post("/login", authController.loginUser);

// logout route
authRouter.get("/logout", authController.logoutUser);

module.exports = { authRouter };
