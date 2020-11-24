var express = require("express");
var router = express.Router();
var Room = require("../models/Room");

router.get("/", (req, res, next) => {
  Room.find({}).then((rooms) => {
    res.json(rooms);
  });
});

router.post("/", (req, res, next) => {
  Room.create(req.body).then((room) => res.json(room));
});

module.exports = router;
