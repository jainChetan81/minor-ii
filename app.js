const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  session = require("express-session"),
  passport = require("passport"),
  app = express(),
  createError = require("http-errors"),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  key = require("./key");

/* REQUIRING OUR ROUTE FILES: */
const baseRoutes = require("./Controller/Routes/base.routes"),
  // localRoutes = require("./Controller/Routes/local.routes"),
  indexRouter = require("./routes/index"),
  usersRouter = require("./routes/users");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

/* SETTING UP OUR APP WITH REQ.BODY AND REQ.SESSION/PASSPORT AND OUR VIEW ENGINE = EJS AND SETTING OUR PUBLIC (CSS,JS AND IMGS TO GO TO THE 'PUBLIC' FOLDER): */
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(session({ secret: key.secret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* CONNECTING TO MONGOOSE: */
mongoose.connect(db);

//Routes
// app.use("/", indexRouter);
// app.use("/users", usersRouter);

app.use("/", baseRoutes);
// app.use("/auth/local", localRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
