const express = require("express");
const { create } = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const flash = require("connect-flash");
const fileUpload = require("express-fileupload");
const path = require("path");
const hbsConfig = require("./hbs.config");
require("dotenv").config();
require("../database");

const app = express();
app.use(express.static(path.join(process.cwd() + "/src/public")));
app.use(cookieParser());
app.use(flash());
app.use(express.json());
hbs = create(hbsConfig);
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join("src/views"));

app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(
  session({
    name: "session",
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use((req, res, next) => {
  res.locals.succses_msg = req.flash("succses_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.welcome_msg = req.flash("welcome_msg");
  res.locals.hello_again_msg = req.flash("hello_again_msg");
  next();
});

// routes
const routes = require("../routes/routes");
app.use(routes);
module.exports = app;
