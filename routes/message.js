var express = require("express");
const Message = require("../models/Messages");
var router = express.Router();

/* GET users listing. */
router.post("/", function (req, res, next) {
  Message.find({
    $or: [{ sender: req.body.userId }, { reciever: req.body.userId }],
  })
    .populate("sender", "name")
    .populate("reciever", "name")
    .then((messages) => {
      console.log("messages", messages);
      res.json(messages);
    });
});

module.exports = router;
