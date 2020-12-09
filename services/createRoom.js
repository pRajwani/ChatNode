const Room = require('../models/Room');
const { pushNewRoom } = require('./pushNewRoom');

exports.CreateRoom = (room) => {
    Room.create(room)
    .then((room)=>{
        room.participants.forEach(participant => {
            pushNewRoom(participant, room._id);
          })
    })
}