const express = require("express");
const cookieParser = require("cookie-parser");
const aurhRouter = require("./Routes/auth.router.js");
const postRouter = require("./Routes/post.router.js");
const followRouter = require("./Routes/follow.router.js");
const cors = require("cors");
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", aurhRouter);
app.use("/api/posts", postRouter);
app.use("/api/user", followRouter);
module.exports = app;
