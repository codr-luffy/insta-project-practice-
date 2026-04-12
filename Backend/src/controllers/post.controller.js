const postModel = require("../models/post.model.js");
const imageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const likeModel = require("../models/like.model.js");

const imagekit = new imageKit({
  privateKey: process.env.IMG_KEY,
});

async function createPostController(req, res) {
  console.log(req.body, req.file);

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "insta-clone",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imageUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post Creatted sucessfully",
    post,
  });
}

async function getPostController(req, res) {
  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "Post Fetch sucessfully",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  userId = req.user.id;
  postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "post not found",
    });
  }

  const isValidUser = post.user.toString() === userId;
  if (!isValidUser) {
    return res.status(403).json({
      message: "Forrbidion content",
    });
  }

  return res.status(200).json({
    message: "Post details Fetched sucessfully",
    post,
  });
}

async function likePostController(req, res) {
  const postId = req.params.postId;
  const username = req.user.username;

  const post = await postModel.findById(postId);
  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  res.status(201).json({
    message: "Post liked sucessfully",
    like,
  });
}

async function getFeedController(req, res) {
  const post = await postModel.find().populate(user);

  res.status(200).json({
    message: "Post Fetch sucessfully",
    post,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  getFeedController,
};
