const { auth } = require('../services/auth.service');

module.exports = {
  authController: {
    login: auth.renderLogin,
    loginPost: auth.loginPost,
    logout: auth.logout,
    findOrCreate: auth.findOrCreate,
  },
};