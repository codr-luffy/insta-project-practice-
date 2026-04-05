const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function RegisterController(req, res) {
  const { username, email, password, bio, profilepic } = req.body;
  const isUserAlreadyExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message:
        "User Already Exist's" +
        (isUserAlreadyExist.email === email
          ? "Email Already Exist"
          : "Username Already Exist"),
    });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    bio,
    profilepic,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "register Sucessfully",
    user: {
      username: user.username,
      email: user.email,
      profilepic: user.profilepic,
      bio: user.bio,
    },
  });
}

async function LoginController(req, res) {
  const { username, email, password, bio, profilepic } = req.body;

  const user = await userModel.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (!user) {
    return res.status(404).json({
      message: "User  not found",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({
      message: "password invalid",
    });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(200).json({
    message: "User LoggedIn Successfully.",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

module.exports = {
  LoginController,
  RegisterController,
};
