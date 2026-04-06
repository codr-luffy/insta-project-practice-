const jwt = require("jsonwebtoken");

async function userIdentify(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Token not Found",
    });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      message: "Unautharised activity",
    });
  }

  req.user = decoded;
  next();
}

module.exports = userIdentify;
