const express = require("express");
const { commentRouter } = require("./routes/commentRouter");
const { postRouter } = require("./routes/postRouter");
const { userRouter } = require("./routes/userRouter");

const app = express();

app.use("/comment", commentRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

const port = process.env.PORT;

app.listen(port, (error) => {
  if (error) {
    return console.log(error);
  }

  console.log("Server is now running.");
});
