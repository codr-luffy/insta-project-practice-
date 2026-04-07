const express = require("express");
const followRouter = express.Router();
const userIdentify = require("../middleware/auth.middleware.js");
const followController = require("../controllers/follow.controller.js");

followRouter.post(
  "/follow/:username",
  userIdentify,
  followController.followerController,
);
followRouter.post(
  "/Unfollow/:username",
  userIdentify,
  followController.UnfollowController,
);
followRouter.post(
  "/accept/:username",
  userIdentify,
  followController.acceptFollowController,
);
followRouter.post(
  "/reject/:username",
  userIdentify,
  followController.rejectFollowController,
);

module.exports = followRouter;
