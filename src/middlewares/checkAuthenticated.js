//function to auth
require('dotenv').config();

// Google
const CLIENT_ID = process.env.CLIENT_ID;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

function checkAuthenticated(req, res, next) {
    let token = req.cookies['session-token'];
  
    let user = {};
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
      user.name = payload.name;
      user.sub = payload.sub;
      user.email = payload.email;
      user.picture = payload.picture;
    }
    verify()
      .then(() => {
        req.user = user;
      
        next();
      })
      .catch((err) => {
        res.redirect(`/login`)
      });
  }
module.exports = checkAuthenticated