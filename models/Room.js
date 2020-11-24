const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var roomSchema = new Schema({
  roomName: String,
  privateChat: Boolean,
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("rooms", roomSchema);
