const jwt = require('jsonwebtoken');

require('dotenv').config();

async function verifyJwt(req, res, next) {
  const token = req.cookies.access_token;
  if (!token || token === 'undefined' || token === 'null' || token === '') {
    return res.redirect('/login');
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        console.log('asdadadd');
      }
      req.id = data.id;
      req.user_name = data.nickname;
      req.is_admin = data.admin;
      next();
    });

  } catch (e){
    return res.redirect('/logout')
  }
}

module.exports = verifyJwt;