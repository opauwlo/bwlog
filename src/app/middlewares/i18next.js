const i18next = require("i18next");
const Backend = require("i18next-fs-backend");
const middleware = require("i18next-http-middleware");
const HandlebarsI18n = require("handlebars-i18n");
const express = require("express");
const app = express();
const moment = require("moment");

async function setLanguege(req, res, next) {
  var cookieLang = req.cookies.i18next || "en";
  i18next
    .use(Backend)
    .use(middleware.LanguageDetector)
    .init({
      detection: {
        order: ["cookie"],
        lookupCookie: "lang",
        caches: false,
      },
      fallbackLng: cookieLang,
      returnObjects: true,
      backend: {
        loadPath: "./src/locales/{{lng}}/translation.json",
      },
    });
    moment.locale(cookieLang);
    HandlebarsI18n.init();
    app.use(middleware.handle(i18next));
  next();
}

module.exports = setLanguege;