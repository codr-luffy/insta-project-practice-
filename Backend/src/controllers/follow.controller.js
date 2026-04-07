const followModel = require("../models/follows.model.js");
const userModel = require("../models/user.model.js");

async function followerController(req, res) {
  const followerUser = req.user.username;
  const followeeUser = req.params.username;
  if (followeeUser === followerUser) {
    return res.status(400).json({
      message: "you can't follow yourself",
    });
  }

  const IsfolloweeExist = await userModel.findOne({
    username: followeeUser,
  });
  if (!IsfolloweeExist) {
    return res.status(404).json({
      message: "user you are following is not exist",
    });
  }

  const IsAlreadyFollowing = await followModel.findOne({
    follower: followerUser,
    followee: followeeUser,
  });
  if (IsAlreadyFollowing) {
    return res.status(200).json({
      message: `you already following ${followeeUser}`,
      follow: IsAlreadyFollowing,
    });
  }

  const followRecord = await followModel.create({
    followee: followeeUser,
    follower: followerUser,
    status: "pending",
  });
  res.status(201).json({
    message: `following request sended to ${followeeUser} sucessfully`,
    follow: followRecord,
  });
}

async function UnfollowController(req, res) {
  const followerUser = req.user.username;
  const followeeUser = req.params.username;

  if (followeeUser === followerUser) {
    return res.status(400).json({
      message: "you can't Unfollow yourself",
    });
  }

  const IsAlreadyFollowing = await followModel.findOne({
    follower: followerUser,
    followee: followeeUser,
  });
  if (!IsAlreadyFollowing) {
    return res.status(200).json({
      message: `you already Unfollowing ${followeeUser}`,
    });
  }

  await followModel.findByIdAndDelete(IsAlreadyFollowing._id);
  res.status(200).json({
    message: `You have unfollow ${followeeUser}`,
  });
}

async function acceptFollowController(req, res) {
  const followerUser = req.user.username;
  const followeeUser = req.params.username;

  const follower = await userModel.findOne({
    username: followerUser,
  });
  if (!follower) {
    return res.status(404).json({
      message: "follower not exist",
    });
  }

  const followRecord = await followModel.findOne({
    follower: followerUser,
    followee: followeeUser,
    // status: "pending",
  });
  if (!followRecord) {
    return res.status(404).json({
      message: "No pending request found",
      followRecord,
    });
  }

  followRecord.status = "accepted";
  await followRecord.save();

  res.status(201).json({
    message: "Follow Accepted sucessfully",
    followRecord,
  });
}

async function rejectFollowController(req, res) {
  const followerUser = req.user.username;
  const followeeUser = req.params.username;

  const follower = await userModel.findOne({
    username: followerUser,
  });
  if (!follower) {
    return res.status(404).json({
      message: "follower not exist",
    });
  }

  const followRecord = await followModel.findOne({
    follower: followerUser,
    followee: followeeUser,
    status: "pending",
  });
  if (!followRecord) {
    return res.status(404).json({
      message: "No pending request found",
    });
  }

  followRecord.status = "rejected";
  await followRecord.save();

  res.status(201).json({
    message: "Follow rejected sucessfully",
    followRecord,
  });
}

module.exports = {
  followerController,
  UnfollowController,
  acceptFollowController,
  rejectFollowController,
};
