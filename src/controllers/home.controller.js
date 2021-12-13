const { home } = require('../services/home.service');

module.exports = { 
    homeController: {
      get: home.index,
    },
  };