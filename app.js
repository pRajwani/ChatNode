var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var indexRouter = require("./routes/login");
var usersRouter = require("./routes/users");
var messsageRouter = require("./routes/message");
var signupRouter = require("./routes/signup");
var roomRouter = require("./routes/room");

var db = require("./db");
var fblogin = require("./fblogin");

var fs = require("fs");
var key = fs.readFileSync(__dirname + "/bin/65623539_localhost3443.key");
var cert = fs.readFileSync(__dirname + "/bin/65623539_localhost3443.cert");
var https = require("https");

var Message = require("./models/Messages");
const User = require("./models/User");
const { findUserByUsername } = require("./services/findUser");
const { CreateRoom } = require('./services/createRoom');
const { pushNewRoom } = require("./services/pushNewRoom");

var app = express();
var corsOptions = {
  origin: 'http://localhost:4200',
  credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

var server = https.createServer({ key: key, cert: cert }, app);
server.listen(3443, () => {
  console.log("connected");
});
/*app.all('*', (req, res, next) => {
  if(req.secure) {
    return next();
  }
  else {
    res.redirect(307, "https://" + req.hostname + ":" + app.get("secPort") + req.url);
  }
})*/
//app.options('*',cors())
const io = require("socket.io").listen(server);

io.on("connection", (socket) => {
  var newUser = "New User Connected";
  socket.broadcast.emit("notification", newUser);

  socket.on('Rooms', (userId) => {
    socket.join(userId);
  })

  socket.on('newChatRoom', (room) => {
    console.log(room);
    findUserByUsername(room);
    
    // createdRoom.participants.forEach(participant => {
    //   socket.broadcast.to(participant).emit('newRoomAddition', room);
    // });
  })

  socket.on("new-msg", (message) => {
    Message.create(message).then(() => {
      socket.broadcast.to(message.roomId).emit("new-msg", message);
    });
  });

  socket.on("joinRoom", (rooms) => {
    rooms.forEach((room) => {
      socket.join(room._id);
    });
  });
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/message", messsageRouter);
app.use("/signup", signupRouter);
app.use("/room", roomRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
