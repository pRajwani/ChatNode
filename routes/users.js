var express = require('express');
const User = require('../models/User');
var router = express.Router();

/* GET users listing. */
router.get('/getUsers', function(req, res, next) {
  User.find({})
  .then((users)=>{
    res.json(users)
  })
});

module.exports = router;
