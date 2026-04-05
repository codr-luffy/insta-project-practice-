const express = require("express");
const cookieParser = require("cookie-parser");
const aurhRouter = require("./Routes/auth.router.js");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", aurhRouter);

module.exports = app;
