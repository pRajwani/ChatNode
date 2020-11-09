const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passportlocalmongoose = require("passport-local-mongoose");

var UserSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    phone:{
        type:Number,
    },
    email:{
        type:String
    }
});

UserSchema.plugin(passportlocalmongoose);

module.exports = mongoose.model("User", UserSchema);