const express = require("express");
const { passport } = require("./authentication/passportConfig");
const { commentRouter } = require("./routes/commentRouter");
const { postRouter } = require("./routes/postRouter");
const { userRouter } = require("./routes/userRouter");
const { authRouter } = require("./routes/authRouter");

const app = express();

// express app config
app.use(express.json()); //parses incoming json files and adds them to req.body

// REST api routes
app.use("/comment", commentRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

const port = process.env.PORT;

app.listen(port, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log("Server is now running.");
});
