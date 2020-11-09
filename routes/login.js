var express = require('express');
var router = express.Router();
var passport = require("passport");
var {checkLogin} = require('../services/checkAuth');
const { checkCode } = require('../services/checkCode');
var code=''

router.get('/fbcallback', passport.authenticate('facebook', {failureRedirect:"/"}), (req, res, next) => {
  code=req.query.code
  res.redirect(`http://localhost:4200/login?code=${req.query.code}&name=${req.user.name}`)
})

router.post('/checkCode', (req,res,next)=> {
  resp=checkCode(req.body.code,code);
  res.json({resp:resp})
});

router.post('/localLogin',passport.authenticate('local'), (req,res,next) => {
  res.json({success:true})
})

function isLoggedIn(req, res, next) {
  if(checkLogin(req,res,next)==true) {
    return next();
  }
  return res.json({status:"failure"})
}


module.exports = router;
