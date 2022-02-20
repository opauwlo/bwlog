const jwt = require('jsonwebtoken');

require('dotenv').config();

function getUserImg(req, res, next) {
  const token = req.cookies.access_token;
  if(token) {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.profile = data.profile
    req.user_name = data.nickname
    req.id = data.id
    req.isLoggedIn = true
    next();

  } else {
    req.profile = '../../img/not_login.png';
    req.user_name = 'Faça Login'
    req.id = 'undfeined'
    req.isLoggedIn = false
    next();
  }

}

module.exports = getUserImg;