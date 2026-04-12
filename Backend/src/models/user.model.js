const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "username Already exist"],
    require: [true, "username is required"],
  },
  email: {
    type: String,
    unique: [true, "email Already in use"],
    required: [true, "email is required"],
  },
  password: {
    type: String,
    select: false,
    required: [true, "passwordis required"],
  },
  bio: String,

  profilePic: {
    type: String,
    default: "https://ik.imagekit.io/luffycodr/w-8.png",
  },
});

const userModel = mongoose.model("users", UserSchema);

module.exports = userModel;
