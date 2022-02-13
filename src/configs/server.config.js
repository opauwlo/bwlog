const express = require('express');
const {create} = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');
const flash = require('connect-flash');
const moment = require('moment');
const path = require('path');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const paginateHelper = require('../app/utils/pagination');

require('../database');

const app = express();

// default options
app.use(fileUpload({
  useTempFiles : true,
}));
// urlencoded
app.use(
  express.urlencoded({
    extended: false,
  }),
);
//Session
app.use(
  session({
    name: 'session',
    secret: '88442211pV#',
    saveUninitialized: false,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);
app.use(flash());

//Middleware
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

//static
app.use(express.static(path.join(process.cwd() + '/src/public')));
// Template

hbs = create({
  defaultLayout: 'main',
  helpers: {
    formatDate: (createdAt) => {
      return moment(createdAt).format('DD/MM/YYYY');
    },
    paginateHelper: paginateHelper.createPagination,
  },
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join('src/views'));


app.use(express.json());
app.use(cookieParser());

// routes
const routes = require('../routes/routes');

app.use(routes);

module.exports = app;