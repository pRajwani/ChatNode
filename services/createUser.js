const passport = require('passport')
var User = require('../models/User')

exports.CreateUser = (req,res,next)=> {
    User.register(new User({username:req.body.username,name:req.body.name}),req.body.password)
    .then((user)=>{
        if(user)
            res.json({success:true,user:user})
    },(err)=>next(err))
    .catch((err)=>next(err))
}