var express = require('express');
const Message = require('../models/Messages');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  Message.find({})
  .then((messages)=>{
    res.json(messages)
  })
});

module.exports = router;
