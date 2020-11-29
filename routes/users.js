var express = require("express");
const User = require("../models/User");
const { verifyAccessToken } = require("../services/jwt");
var router = express.Router();

/* GET users listing. */
router.post("/getRooms", (req, res, next) => {
  console.log(req.body);
  User.findById(req.body.userId)
    .populate("rooms")
    .then((users) => {
      console.log(users);
      res.json(users.rooms);
    });
});

router.post("/getUserDetails", async (req, res, next) => {
  try {
    resp = await verifyAccessToken(req.headers.authorization.split(" ")[1]);
    userDetail = await User.findById(resp._id);
    res.json(userDetail);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
