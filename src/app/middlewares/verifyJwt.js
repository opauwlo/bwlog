const jwt = require('jsonwebtoken');

require('dotenv').config();

function verifyJwt(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) {
    res.redirect('/login')
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.id = data.id;
    req.user_name = data.nickname;

    next();

  } catch {
    res.redirect('/logout')
  }
}

module.exports = verifyJwt;