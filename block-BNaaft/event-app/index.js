/** @format */

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var mongoose = require(`mongoose`);
var moment = require(`moment`);
var eventRouter = require(`./routes/events`);
var remarkRouter = require(`./routes/remarks`);
// connect mongodb

mongoose.connect(`mongodb://localhost/event-app`, err => {
  console.log(err ? err : `database connected`);
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(
//   sassMiddleware({
//     src: path.join(__dirname, "public"),
//     dest: path.join(__dirname, "public"),
//     indentedSyntax: false, // true = .sass and false = .scss
//     sourceMap: true,
//   })
// );
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use(`/events`, eventRouter);
app.use(`/remarks`, remarkRouter);

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
