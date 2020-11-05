const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var MessageSchema = new Schema({
    sender: {
        type: String,
    },
    message:{
        type:String
    }
});



module.exports = mongoose.model("Message", MessageSchema);