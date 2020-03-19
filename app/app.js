const createError = require("http-errors");
const express = require("express");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const logger = require("morgan");
const flash = require("connect-flash");
const dotenv = require("dotenv");
dotenv.config();


const {noAuth,needAuth} = require("./middleware/canMiddleware");

const indexRouter = require("./routes/indexRoutes");
const userRouter = require("./routes/userRoutes");
const stocksRouter = require("./routes/stocksRoutes");

const app = express();

const csrf = require("csurf");
let csrfProtection;
if (app.get('env') === "test")
  csrfProtection = csrf({ ignoreMethods: ["GET", "POST"] });
else csrfProtection = csrf({ cookie: true });

// view engine setup for pug
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

var uri = "mongodb://127.0.0.1:27017/stock-data?socketTimeoutMS=100000";

if ("production" != app.get("env")) {
  console.log("you are running in dev mode");
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  app.locals.pretty = true;
} else if ("production") {
  console.log("you are running in production");
  uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/stock-data?socketTimeoutMS=100000";  
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}

app.use(
  session({
    store: new MongoStore({ url: uri }),
    name: "session",
    resave: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
  })
);
app.use(flash());

// this programmatically loops through all models
// in the models folder and requires them
fs.readdirSync(__dirname + "/models").forEach(filename => {
  if (~filename.indexOf(".js")) require(__dirname + "/models/" + filename);
});

app.use(function varsForPug(req, res, next) {
  res.locals._flashMessage = req.flash("message");
  res.locals._flashError = req.flash("error");
  next();
});

app.get("/robots.txt", function(req,  res.type("text/plain")=>;
  res.send("\nDisallow:*");
});
// POST Logout goes here to avoid middleware
app.post("/users/logout", csrfProtection, (req, res, next) => {
  delete req.session.user;
  res.redirect("/");
});

app.use("/", csrfProtection, indexRouter);
app.use("/users", csrfProtection, noAuth, userRouter);
app.use("/stocks", csrfProtection, needAuth, stocksRouter);

// catch 404 and forward to error handler
app.use((req, res, next) =>{
  next(createError(404, "This page does not exist!"));
});

// error handler
app.use((err, req, res, next) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 3000;

app.listen(port);

module.exports = app;
