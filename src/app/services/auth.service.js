const { Users } = require('../repositories/users.repository');

const jwt = require('jsonwebtoken');

const cloudinary = require('../utils/cloudinary');

require('dotenv').config();
// Google
const CLIENT_ID = process.env.CLIENT_ID;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

module.exports = {
  auth: {
    renderLogin: async (req, res) => { 
      await res.render('pages/auth/login');
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
          message: e
        });
      }
    },
    logout: async (req, res) => {
      try {
        await res.clearCookie('session-token');
        await res.clearCookie('access_token');
        await res.clearCookie('connect.sid');
        await res.clearCookie('G_AUTHUSER_H');
        await res.clearCookie('G_ENABLED_IDPS');
  
        await res.redirect('/login'); 
      } 
      catch (e) {
      }
     
    },
    findOrCreate: async (req, res) => { 
      let info = req.user;
      // get result from cloudinary 
      let resultProfile = await cloudinary.uploader.upload(info.picture);
      let profile =  resultProfile.secure_url;
      let profile_id = resultProfile.public_id;

      let resultBanner = await cloudinary.uploader.upload('https://i.ibb.co/PtVc2fH/edxwm3uchch1e2sltrce-1.jpg');
      let banner =  resultBanner.secure_url;
      let banner_id = resultBanner.public_id;

      try {
        const create = await Users.findOrCreateUser(info, profile, profile_id, banner, banner_id);
        let user = create[1];
        const token = jwt.sign(
          {
            id: user.id,
            nickname: user.user_name,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: 86400,
          },
        );
        await res.cookie('access_token', token, {
          overwrite: true
        });

        if (create[0]) {
          req.flash("success_msg", "bem-vinda(o), agora você pode editar o seu perfil");
          return res.redirect("/perfil");
          
        } else {
          
          cloudinary.uploader.destroy(profile_id);
          cloudinary.uploader.destroy(banner_id);
          req.flash("success_msg", "olá, novamente");
          res.redirect(`/perfil`);
        }

      } catch (e) {
      }
    }
  }
};