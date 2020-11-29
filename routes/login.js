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
<<<<<<< HEAD
  resp = checkCode(req.body.code, code);
  console.log(req.body.code, code);
  res.json({ resp: resp, user: user }); 
});

router.post("/localLogin", passport.authenticate("local"), (req, res, next) => {
  code = 1;
  user = req.user;
  res.json({ success: true, code: 1 });
=======
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
>>>>>>> 17ba19b8980a6fa375c5605bf63218d3e998fc81
});

module.exports = router;
