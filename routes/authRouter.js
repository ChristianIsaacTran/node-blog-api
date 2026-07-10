const {Router} = require("express");
const authController = require("../controllers/authController");

const authRouter = Router();

// login route
authRouter.post("/", authController.loginUser);

// logout route
authRouter.get("/", authController.logoutUser);

// test route for jwt authorization. this route serves no purpose but to test the passport jwt strategy. The number userId parameter is purely for correct routing
authRouter.get("/:userId", authController.testJwtStrat);

module.exports = { authRouter };
