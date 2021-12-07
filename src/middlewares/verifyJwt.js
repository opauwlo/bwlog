const jwt = require('jsonwebtoken');

require('dotenv').config();

module.exports = function verifyJwt(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.user = data.id;
    req.user_name = data.nickname;

    next();

  } catch {
    return res.sendStatus(403);
  }
}