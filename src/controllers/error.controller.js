const { error } = require("../services/error.service");

module.exports = {
  errorController: {
    erro404: error.index,
  },
};