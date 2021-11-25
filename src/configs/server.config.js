const express = require('express');
const handlebars = require("express-handlebars");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const moment = require("moment");
const path = require('path')
require("dotenv").config();

require('./db.config');

const app = express();

// urlencoded
app.use(
  express.urlencoded({
    extended: false,
  }),
);

// use json
app.use(express.json());

//Session
app.use(
  session({
    secret: "88442211pV#",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

//Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");  
  next();
});

//static
app.use(express.static(process.cwd() + 'src/public'));

// Template
app.engine(
  "handlebars",
  handlebars({
    defaultLayout: "main",
    helpers: {
      formatDate: (createdAt) => {
        return moment(createdAt).format("DD/MM/YYYY");
      },
    },
  })
);
app.set('views', path.join('src/views'));
app.set("view engine", "handlebars");
app.use(express.json());
app.use(cookieParser());

// routes
const routes = require('../routes/routes');

app.use(routes);

module.exports = app;