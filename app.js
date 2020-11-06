var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
var indexRouter = require("./routes/login");
var usersRouter = require("./routes/users");
var messsageRouter = require("./routes/message");
var db = require("./db");
var fblogin = require("./fblogin");
var fs = require("fs");
var key = fs.readFileSync(__dirname + "/bin/65623539_localhost3443.key");
var cert = fs.readFileSync(__dirname + "/bin/65623539_localhost3443.cert");
var https = require("https");
var bodyParser = require("body-parser");
var Message = require("./models/Messages");

var app = express();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Header", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST,GET,DELETE,PUT,OPTIONS,PATCH"
  );
  next();
});
app.use(express.json());

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
  console.log("user connected");
  var newUser = "New User Connected";
  socket.broadcast.emit("notification", newUser);

  socket.on("new-msg", (message) => {
    console.log(message);
    Message.create({ sender: message.sender, message: message.message }).then(
      () => {
        socket.broadcast.emit("new-msg", message);
      }
    );
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
