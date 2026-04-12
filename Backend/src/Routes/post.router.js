const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller.js");
const multer = require("multer");
const upload = multer({ Storage: multer.memoryStorage() });
const userIdentify = require("../middleware/auth.middleware.js");

postRouter.post(
  "/",
  upload.single("image"),
  userIdentify,
  postController.createPostController,
);

postRouter.get("/", userIdentify, postController.getPostController);
postRouter.get(
  "/details/:postId",
  userIdentify,
  postController.getPostDetailsController,
);

postRouter.post(
  "/like/:postId",
  userIdentify,
  postController.likePostController,
);

postRouter.post("/feed", userIdentify, postController.getFeedController);

module.exports = postRouter;
