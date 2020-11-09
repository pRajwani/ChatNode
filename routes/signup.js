var express = require('express');
var router = express.Router();
var User = require('../models/User')
var passport=require('passport');
const { CreateUser } = require('../services/createUser');


router.post('/',(req,res,next)=>{
    CreateUser(req,res,next)
})

module.exports=router