const { auth } = require('../services/auth.service');

module.exports = {
  authController: {
    login: auth.login,
    loginPost: auth.loginPost,
    logout: auth.logout,
    findOrCreate: auth.findOrCreate,
  },
};