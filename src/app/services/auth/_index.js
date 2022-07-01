const { login } = require("./login");
const { renderLogin } = require("./render.login");
const { logout } = require("./logout");
module.exports = {
  authController: {
    login: login.index,
    logout: logout.index,
    //render login
    renderLogin: renderLogin.index,
  },
};
