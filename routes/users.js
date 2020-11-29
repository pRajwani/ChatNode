var express = require("express");
const User = require("../models/User");
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

module.exports = router;
