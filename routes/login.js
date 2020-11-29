var express = require("express");
var router = express.Router();
var passport = require("passport");
var { checkLogin } = require("../services/checkAuth");
const { checkCode } = require("../services/checkCode");
const {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} = require("../services/jwt");
var code = "";
var user;
router.get(
  "/fbcallback",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res, next) => {
    user = {
      _id: req.user._id,
    };
    aToken = createAccessToken(user);
    rToken = createRefreshToken(user);
    res.cookie("rTok", rToken);
    res.redirect(`http://localhost:4200/login?atok=${aToken}`);
  }
);

router.post("/checkCode", (req, res, next) => {
  rToken = req.cookies["rTok"];
  resp = verifyRefreshToken(rToken);
  // if(resp!=null)
  //   aTok=createAccessToken
  res.json(resp);
});

router.post("/localLogin", passport.authenticate("local"), (req, res, next) => {
  user = {
    _id: req.user._id,
  };
  aToken = createAccessToken(user);
  rToken = createRefreshToken(user);
  res.cookie("rTok", rToken);
  res.json(aToken);
});

module.exports = router;
