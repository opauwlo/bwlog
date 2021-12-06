const { Users } = require('../repositories/users.repository');
//function to auth
require('dotenv').config();

// Google
const CLIENT_ID = process.env.CLIENT_ID;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

module.exports = {
  auth: {
    login: async (req, res) => { 
      await res.render("login");
    },
    loginPost: async (req, res) => {
      try {
        let token = req.body.token;
        async function verify() {
          const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
          });
          const payload = ticket.getPayload();
          const userid = payload['sub'];
        }
        verify()
          .then(() => {
            res.cookie('session-token', token, {
              overwrite: true
            });
            res.send('success');
          })
          .catch(console.error);      
      }

      catch (e) {
        res.status(500).json({
          message: e.message
        });
      }
    },
    logout: async (req, res) => {
      try {
        await res.clearCookie('session-token');
        await res.clearCookie('connect.sid');
        await res.clearCookie('G_AUTHUSER_H');
        await res.clearCookie('G_ENABLED_IDPS');
  
        await res.redirect('/login'); 
      } 
      catch (e) {
        console.log(e);
      }
     
    },
    findOrCreate: async (req, res) => {
      let info = req.user;
      try {
        const create = await Users.findOrCreateUser(info);

        if (create) {
          req.flash("success_msg", "bem-vinda(o), agora você pode editar o seu perfil");
          res.redirect("/perfil");

        } else {
          req.flash("success_msg", "olá, novamente");
          res.redirect(`/perfil`);
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};