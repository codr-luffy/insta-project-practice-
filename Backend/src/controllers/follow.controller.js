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
  });
  console.log("followRecord:", followRecord); // ✅ yeh add karo
  console.log(followerUser);
  res.status(201).json({
    message: `You are now following ${followeeUser}`,
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

module.exports = {
  followerController,
  UnfollowController,
};
