var express = require("express");
const { populate } = require("../models/User");
const User = require("../models/User");
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

module.exports = router;
