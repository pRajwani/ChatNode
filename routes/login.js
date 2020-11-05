var express = require('express');
var passport = require("passport");
const { response } = require('../app');
var router = express.Router();
var checkAuthService = require('../services/checkAuth');
const { checkCode } = require('../services/checkCode');
var code=''

/* GET home page. */
router.get('/fblogin', passport.authenticate('facebook'), function(req, res, next) {
  console.log(req.user, req.isAuthenticated())
  res.json(user)
});


router.get('/fbcallback', passport.authenticate('facebook', {failureRedirect:"/"}), (req, res, next) => {
  code=req.query.code
  console.log(req.user)
  res.redirect(`http://localhost:4200/login?code=${req.query.code}&name=${req.user.name}`)
})

router.post('/checkCode', (req,res,next)=> {
  console.log(code,req.body.code)
  resp=checkCode(req.body.code,code);
  console.log(resp)
  res.json({resp:resp})
});

router.get("/secret", isLoggedIn, (req,res,next) => {
  console.log(req.user, req.isAuthenticated())

  res.send("secret")
})

function isLoggedIn(req, res, next) {
  if(checkAuthService.checkLogin(req,res,next)==true) {
    return next();
  }
  return res.json({status:"failure"})
}


module.exports = router;
