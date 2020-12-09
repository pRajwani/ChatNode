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
    res.cookie("rTok", rToken, {httpOnly:true});
    res.redirect(`http://localhost:4200/chat?atok=${aToken}`);
  }
);

router.get("/checkCode", (req, res, next) => {
  rToken = req.cookies["rTok"];
  console.log("checkCode rT:", rToken);
  resp = verifyRefreshToken(rToken);
  console.log("verify Rt resp", resp)
  if(resp.verify==true) {
   aTok=createAccessToken(resp.result);
   rTok=createRefreshToken(resp.result);
   res.cookie('rTok', rTok, {httpOnly:true});
   res.json({result: aTok});
  }
  else{
  res.cookie("rTok","");
  res.json({result: "Refresh Token Malformed", status:false});
  }
}); 

router.post("/localLogin", passport.authenticate("local"), (req, res, next) => {
  user = {
    _id: req.user._id,
  };
  console.log(user)
  aToken = createAccessToken(user);
  rToken = createRefreshToken(user);
  res.cookie("rTok", rToken, {httpOnly: true});
  res.json(aToken);
});

module.exports = router;
