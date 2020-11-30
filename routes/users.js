var express = require("express");
const User = require("../models/User");
const { verifyAccessToken } = require("../services/jwt");
var router = express.Router();

/* GET users listing. */
router.post("/getRooms", async (req, res, next) => {

  try {
    let user = await User.findById(req.body.userId).populate("rooms");
    res.json(user.rooms);
  }
  catch(err) {
    return next(err);
  }
});

router.get("/getUserDetails", async (req, res, next) => {
  try {
    resp = await verifyAccessToken(req.headers.authorization.split(" ")[1]);
    userDetail = await User.findById(resp._id);
    res.json(userDetail);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
