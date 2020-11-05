const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var passportlocalmongoose = require("passport-local-mongoose");

var MessageSchema = new Schema({
    sender: {
        type: String,
    },
    message:{
        type:String
    },
    username:{
        type:Date
    }
});
var MessagesSchema = new Schema(
    [MessageSchema]
)


MessageSchema.plugin(passportlocalmongoose);
MessagesSchema.plugin(passportlocalmongoose);

module.exports = mongoose.model("Message", MessagesSchema);