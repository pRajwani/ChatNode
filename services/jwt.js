var jwt = require("jsonwebtoken");

exports.createAccessToken = (user) => {
  return jwt.sign(user, "secret");
};

exports.createRefreshToken = (user) => {
  return jwt.sign({ user: user }, "RefreshSecret");
};

exports.verifyAccessToken = (token) => {
  return jwt.verify(token, "secret");
};

exports.verifyRefreshToken = (token) => {
  return jwt.verify(token, "RefreshSecret");
};
