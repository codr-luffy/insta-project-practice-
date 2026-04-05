const express = require("express");
const authController = require("../controllers/auth.controller.js");
const authRouter = express.Router();

authRouter.post("/login", authController.LoginController);
authRouter.post("/register", authController.RegisterController);
module.exports = authRouter;
