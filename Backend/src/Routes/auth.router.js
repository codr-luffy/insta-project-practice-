const express = require("express");
const authController = require("../controllers/auth.controller.js");
const authRouter = express.Router();
const userIdentify = require("../middleware/auth.middleware.js");

authRouter.post("/login", authController.LoginController);
authRouter.post("/register", authController.RegisterController);
authRouter.post("/getme", userIdentify, authController.getMeController);
module.exports = authRouter;
