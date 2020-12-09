const user = require('../models/User');
const {CreateRoom} = require('./createRoom')

exports.findUserByUsername = (room) => {

    user.findOne({username:room.participants[0]})
    .then((user)=>{
        console.log(user);
        room.participants[0] = user._id;
        CreateRoom(room);
    })
}