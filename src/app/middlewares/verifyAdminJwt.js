const jwt = require('jsonwebtoken');

require('dotenv').config();

async function verifyAdminJwt(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) {
    return res.redirect('/login');
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    if (data.admin !== true) {
      return res.redirect('/404');
    } else {
      return next();
    }
  } catch {
    res.redirect('/logout')
  }
}

module.exports = verifyAdminJwt;