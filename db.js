const config = require('./config')
const mongoose = require('mongoose')
const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then((db) => {
  console.log("Connect to the server correctly");
}, (err) => { console.log(err); }); 