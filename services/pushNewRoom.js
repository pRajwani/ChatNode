const User = require('../models/User');

exports.pushNewRoom = (userId, roomId) => {
    User.findOne({_id:userId})
    .then((user)=>{
        user.rooms.push(roomId);
        user.save();
    })
}