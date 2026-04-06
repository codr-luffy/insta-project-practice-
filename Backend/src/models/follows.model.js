const mongoose = require("mongoose");

const followSchema = new mongoose.Schema(
  {
    folower: {
      type: String,
      ref: users,
      user: mongoose.schema.Type.ObjectId,
    },
    followee: {
      type: String,
      ref: users,
      user: mongoose.schema.Type.ObjectId,
    },
  },
  {
    timestamps: true,
  },
);

const followModel = mongoose.model("follow", followSchema);

module.exports = followModel;
