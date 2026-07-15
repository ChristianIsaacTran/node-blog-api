const { Router } = require("express");
const authController = require("../controllers/authController");

const authRouter = Router();

// login route
authRouter.post("/", authController.loginUser);

// logout route
/*
    note: since JWT's are stored in localStorage, there is no need for server-side logout.
    req.logout() was used when I was using sessions, and passport would have to .logout() to manually 
    remove the session info from the active session in the database, but with jwt's, they're stored front-end side, so 
    all the backend is doing is creating and sending the token to the front-end. The logout functionality is controlled by the 
    front-end since front-end is the only part that has access to the localStorage.

    Essentially, it looks like this:
    1. (Back-end) user logs into app. Jwt token is created and sent to front-end for localStorage
    2. (Front-end) Front-end receives the token and stores in localStorage (localStorage is browser only as explained above)
    3. (Front-end) If user chooses to logout, front-end removes the jwt token from localStorage
    
*/
authRouter.get("/", authController.logoutUser);

// test route for jwt authorization. this route serves no purpose but to test the passport jwt strategy. The number userId parameter is purely for correct routing
authRouter.get("/:userId", authController.testJwtStrat);

module.exports = { authRouter };
